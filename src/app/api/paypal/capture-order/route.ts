import { NextRequest, NextResponse } from 'next/server';
import { capturePaypalOrder } from '@/features/checkout/application/use-cases/capturePaypalOrder';
import { logger } from '@/shared/observability/logger';

const statusByError = {
  unauthorized: 401,
  invalid_input: 400,
  not_found: 404,
  forbidden: 403,
  paypal_failed: 502,
  internal: 500,
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const result = await capturePaypalOrder(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: statusByError[result.error] });
    }

    return NextResponse.json({ status: result.status }, { status: 200 });
  } catch (error) {
    logger.error('[api.paypal.capture-order]', { error });
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
