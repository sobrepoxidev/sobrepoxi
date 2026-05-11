// app/api/paypal/paypalHelpers.ts

const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

const shouldUseMock = (): boolean => {
  return process.env.PAYPAL_USE_MOCK === '1';
};

const getPayPalApiUrl = (): string => {
  return isProduction()
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
};

const createMockPayPalOrder = (amount: number) => {
  return {
    id: `MOCK_ORDER_${Date.now()}`,
    status: 'CREATED',
    links: [
      {
        href: 'https://www.sandbox.paypal.com/checkoutnow?token=MOCK_TOKEN',
        rel: 'approve',
        method: 'GET'
      }
    ],
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: amount.toString()
        }
      }
    ]
  };
};

export async function getPaypalAccessToken(): Promise<string> {
  const CLIENT_ID = isProduction()
    ? process.env.PAYPAL_LIVE_CLIENT_ID
    : process.env.PAYPAL_CLIENT_ID;

  const CLIENT_SECRET = isProduction()
    ? process.env.PAYPAL_LIVE_SECRET
    : process.env.PAYPAL_SECRET;

  if (shouldUseMock()) {
    return 'PAYPAL_MOCK_TOKEN';
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(`PayPal credentials not found for ${isProduction() ? 'production' : 'sandbox'} environment`);
  }

  const API_URL = getPayPalApiUrl();
  const auth = `${CLIENT_ID}:${CLIENT_SECRET}`;

  try {
    const res = await fetch(`${API_URL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Failed to get PayPal access token. Status: ${res.status}, Error: ${JSON.stringify(errorData)}`);
    }

    const data = await res.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw error;
  }
}

export async function createPaypalOrder({
  accessToken,
  amount,
  currency
}: {
  accessToken: string;
  amount: number;
  currency: string;
}) {
  if (shouldUseMock() || accessToken === 'PAYPAL_MOCK_TOKEN') {
    return createMockPayPalOrder(amount);
  }

  const API_URL = getPayPalApiUrl();
  const data = JSON.stringify({
    'intent': 'CAPTURE',
    'purchase_units': [{
      'amount': {
        'currency_code': currency,
        'value': amount.toString()
      }
    }]
  });

  try {
    const res = await fetch(`${API_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: data
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`PayPal create order error:`, errorText);
      throw new Error(`PayPal create order failed: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    throw error;
  }
}

export async function capturePaypalOrder({
  accessToken,
  paypalOrderId
}: {
  accessToken: string;
  paypalOrderId: string;
}) {
  if (shouldUseMock() || accessToken === 'PAYPAL_MOCK_TOKEN' || paypalOrderId.startsWith('MOCK_ORDER_')) {
    return {
      id: paypalOrderId,
      status: 'COMPLETED',
      purchase_units: [
        {
          payments: {
            captures: [
              {
                id: `MOCK_CAPTURE_${Date.now()}`,
                status: 'COMPLETED'
              }
            ]
          }
        }
      ]
    };
  }

  const API_URL = getPayPalApiUrl();
  const url = `${API_URL}/v2/checkout/orders/${paypalOrderId}/capture`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`PayPal capture order error:`, errorText);
      throw new Error(`PayPal capture order failed: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    throw error;
  }
}