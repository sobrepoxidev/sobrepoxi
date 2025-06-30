import { NextResponse } from 'next/server';
import { convertUsd }   from '@/lib/convert-core'; // saca la lógica a /lib

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const amount = Number(searchParams.get('amount'));
  const to     = (searchParams.get('to') || '').toUpperCase();

  try {
    const data = await convertUsd(amount, to);
    return NextResponse.json(data, { headers:{ 'Cache-Control':'s-maxage=1800' }});
  } catch (err:unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 400 });
  }
}