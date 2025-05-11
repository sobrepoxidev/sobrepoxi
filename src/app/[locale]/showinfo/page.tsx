// testEnv.tsx
'use client'
export default function TestEnv() {
  console.log("PayPal client ID: ", process.env.NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID);
  return <p>PayPal ID: {process.env.NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID}</p>;
}
