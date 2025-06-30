const MEM_TTL = 30 * 60 * 1000;      // 30 min
const KEY     = process.env.EXRATE_KEY;

let cache: { at: number; data: unknown } | null = null;

export async function convertUsd(amount: number, to: string) {
  if (!amount || amount <= 0) throw new Error('Invalid amount');

  const now = Date.now();

  /* 1️⃣  hit en memoria */
  if (cache && now - cache.at < MEM_TTL) {
    const rate = (cache.data as { conversion_rates: Record<string, number> }).conversion_rates[to];
    if (!rate) throw new Error(`Unsupported currency ${to}`);
    return build(amount, to, rate, (cache.data as { time_last_update_utc: string }).time_last_update_utc);
  }

  /* 2️⃣  descarga /latest/USD */
  const url = KEY
    ? `https://v6.exchangerate-api.com/v6/${KEY}/latest/USD`
    : 'https://open.er-api.com/v6/latest/USD';

  const res  = await fetch(url, { next: { revalidate: MEM_TTL / 1000 } });
  const json = await res.json();

  if (json.result !== 'success')
    throw new Error(json['error-type'] || 'API error');

  cache = { at: now, data: json };

  const rate = (json as { conversion_rates: Record<string, number> }).conversion_rates[to];
  if (!rate) throw new Error(`Unsupported currency ${to}`);

  return build(amount, to, rate, (json as { time_last_update_utc: string }).time_last_update_utc);
}

function build(a: number, cur: string, r: number, ts: string) {
  return { amount: a, currency: cur, converted: a * r, rate: r, timestamp: ts };
}