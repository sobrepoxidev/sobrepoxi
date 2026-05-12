import { NextResponse } from 'next/server';
import { convertUsd, convertQuerySchema, type Currency } from '@/features/currency';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const amount = Number(searchParams.get('amount'));
  const to = (searchParams.get('to') || '').toUpperCase();

  const parsed = convertQuerySchema.safeParse({ amount, to });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }

  try {
    const data = await convertUsd(amount, to as Currency);
    return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=1800' } });
  } catch (err) {
    console.error('[api/convert] conversion error:', err);
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
}
