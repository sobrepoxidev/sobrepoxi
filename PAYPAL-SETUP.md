# PayPal Integration Setup

## Environment Variables

To properly configure PayPal integration for both development and production environments, add the following variables to your `.env.local` file:

```
# PayPal Sandbox (Development) Credentials
PAYPAL_CLIENT_ID=your_sandbox_client_id_here
PAYPAL_SECRET=your_sandbox_secret_here
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id_here

# PayPal Live (Production) Credentials
PAYPAL_LIVE_CLIENT_ID=your_live_client_id_here
PAYPAL_LIVE_SECRET=your_live_secret_here
NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID=your_live_client_id_here
```

## How It Works

- The application automatically detects whether it's running in development or production mode.
- In development mode, it uses the sandbox credentials.
- In production mode, it uses the live credentials.
- The `NEXT_PUBLIC_` prefix makes the client ID available to the browser for the PayPal button.
- The server-side API routes use the non-public variables.

## Testing

1. For testing in development:
   - Use your PayPal Sandbox credentials
   - Create a sandbox account at https://developer.paypal.com
   - Test transactions will not charge real money

2. For production:
   - Replace with your live PayPal credentials
   - Real transactions will be processed

## Troubleshooting

If you encounter the error "null value in column 'user_id' of relation 'orders' violates not-null constraint":
- Make sure a user is logged in before checkout
- The application now uses a fallback 'guest-user' ID when no user is logged in

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your PayPal credentials secure
- The production credentials should only be used in the actual production environment
