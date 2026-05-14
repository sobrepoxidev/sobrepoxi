import { logger } from '@/shared/observability/logger';

const isProduction = (): boolean => process.env.NODE_ENV === 'production';
const shouldUseMock = (): boolean => process.env.PAYPAL_USE_MOCK === '1';
const getPayPalApiUrl = (): string => isProduction() ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

const createMockPayPalOrder = (amount: number) => ({
  id: `MOCK_ORDER_${Date.now()}`,
  status: 'CREATED',
  links: [{ href: 'https://www.sandbox.paypal.com/checkoutnow?token=MOCK_TOKEN', rel: 'approve', method: 'GET' }],
  purchase_units: [{ amount: { currency_code: 'USD', value: amount.toString() } }],
});

export async function getPaypalAccessToken(): Promise<string> {
  const clientId = isProduction() ? process.env.PAYPAL_LIVE_CLIENT_ID : process.env.PAYPAL_CLIENT_ID;
  const clientSecret = isProduction() ? process.env.PAYPAL_LIVE_SECRET : process.env.PAYPAL_SECRET;

  if (shouldUseMock()) return 'PAYPAL_MOCK_TOKEN';
  if (!clientId || !clientSecret) throw new Error('PayPal credentials not configured');

  const auth = `${clientId}:${clientSecret}`;
  const res = await fetch(`${getPayPalApiUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(auth).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    logger.error('[checkout.paypal] access token failed', { status: res.status, errorData });
    throw new Error('PayPal access token failed');
  }

  const data = await res.json();
  return data.access_token;
}

export async function createProviderPaypalOrder({
  accessToken,
  amount,
  currency,
}: {
  accessToken: string;
  amount: number;
  currency: string;
}) {
  if (shouldUseMock() || accessToken === 'PAYPAL_MOCK_TOKEN') return createMockPayPalOrder(amount);

  const res = await fetch(`${getPayPalApiUrl()}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: currency, value: amount.toString() } }],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    logger.error('[checkout.paypal] create order failed', { status: res.status, errorText });
    throw new Error('PayPal create order failed');
  }

  return res.json();
}

export async function captureProviderPaypalOrder({
  accessToken,
  paypalOrderId,
}: {
  accessToken: string;
  paypalOrderId: string;
}) {
  if (shouldUseMock() || accessToken === 'PAYPAL_MOCK_TOKEN' || paypalOrderId.startsWith('MOCK_ORDER_')) {
    return {
      id: paypalOrderId,
      status: 'COMPLETED',
      purchase_units: [{ payments: { captures: [{ id: `MOCK_CAPTURE_${Date.now()}`, status: 'COMPLETED' }] } }],
    };
  }

  const res = await fetch(`${getPayPalApiUrl()}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    logger.error('[checkout.paypal] capture failed', { status: res.status, errorText });
    throw new Error('PayPal capture failed');
  }

  return res.json();
}
