// app/api/paypal/paypalHelpers.ts

export async function getPaypalAccessToken(): Promise<string> {
    const CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
    const CLIENT_SECRET = process.env.PAYPAL_SECRET!;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("PayPal credentials not found");
    } 

    console.log("PayPal credentials found 1:", { CLIENT_ID, CLIENT_SECRET } );

    // Use sandbox URLs for development
    const API_URL = process.env.NODE_ENV === "production" ? "https://api.paypal.com" : "https://api-m.sandbox.paypal.com";
  
    const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  
    const res = await fetch(`${API_URL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    });
  
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Failed to get PayPal access token. Status: ${res.status}, Error: ${JSON.stringify(errorData)}`);
    }
  
    const data = await res.json();
    console.log("Successfully got PayPal access token");
    return data.access_token;
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
    const res = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toString()
            }
          }
        ]
      })
    });
  
    if (!res.ok) {
      console.error("PayPal create order error:", await res.text());
      return null;
    }
    return res.json(); // { id: "PAYPAL_ORDER_ID", etc. }
  }
  
  export async function capturePaypalOrder({
    accessToken,
    paypalOrderId
  }: {
    accessToken: string;
    paypalOrderId: string;
  }) {
    const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypalOrderId}/capture`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!res.ok) {
      console.error("PayPal capture order error:", await res.text());
      throw new Error("Capture request failed");
    }
    return res.json(); // { status: "COMPLETED", etc. }
  }
  