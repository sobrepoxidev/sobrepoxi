# PayPal Integration Setup

## Development Mode

The PayPal integration has been updated to work in development mode even without credentials. It now uses a mock implementation that simulates PayPal API responses when credentials are missing.

## Setting Up Environment Variables

For proper testing with real PayPal sandbox accounts, add these variables to your `.env.local` file:

```
# PayPal Sandbox (Development) Credentials
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id_here
PAYPAL_CLIENT_ID=your_sandbox_client_id_here
PAYPAL_SECRET=your_sandbox_secret_here

# PayPal Live (Production) Credentials - Only needed in production
NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID=your_live_client_id_here
PAYPAL_LIVE_CLIENT_ID=your_live_client_id_here
PAYPAL_LIVE_SECRET=your_live_secret_here
```

## How It Works

1. The application automatically detects whether it's running in development or production mode
2. In development, it can use mock PayPal responses if credentials are missing
3. For proper testing, add your PayPal sandbox credentials
4. In production, it will use the live credentials

## Troubleshooting

If you see the error "Failed to load the PayPal JS SDK script":

1. Make sure your `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set correctly in `.env.local`
2. Check the browser console for more detailed error messages
3. Verify that your PayPal sandbox account is active and properly configured

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your PayPal credentials secure
- Use sandbox credentials for development and testing
