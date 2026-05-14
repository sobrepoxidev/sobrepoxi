import { NextRequest, NextResponse } from 'next/server';
import { createPaypalOrder } from '@/features/checkout/application/use-cases/createPaypalOrder';
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
    const result = await createPaypalOrder(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: statusByError[result.error] });
    }

    return NextResponse.json({ paypalOrderId: result.paypalOrderId }, { status: 200 });
  } catch (error) {
    logger.error('[api.paypal.create-order]', { error });
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
