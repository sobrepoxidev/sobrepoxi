'use client';

import { useState, useTransition } from 'react';
import { Loader2, RefreshCcw, ArrowLeft } from 'lucide-react';
import { useLocale } from 'next-intl';
import { type ConversionResult, type Currency } from '@/features/currency';

type Props = {
  amount: number;
  defaultCurrency?: string;
};

type ConvertApiResponse = ConversionResult | { error: string };

export default function CurrencyConverterRow({
  amount,
  defaultCurrency = 'CRC',
}: Props) {
  const locale = useLocale();
  const [currency, setCurrency] = useState<Currency>(defaultCurrency.toUpperCase() as Currency);

  const [result, setResult] = useState<ConversionResult | null>(null);
  const [last, setLast] = useState<{ amt: number; cur: Currency } | null>(null);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const disabled: boolean =
    pending || (!!last && last.amt === amount && last.cur === currency);

  const onConvert = async () => {
    if (disabled) return;
    setError(null);
    start(async () => {
      const res = await fetch(`/api/convert?amount=${amount}&to=${currency}`);
      const data = (await res.json()) as ConvertApiResponse;
      if (!res.ok || 'error' in data) {
        setError('error' in data ? data.error : 'Conversion error');
        setResult(null);
      } else {
        setResult(data);
        setLast({ amt: amount, cur: currency });
      }
    });
  };

  return (
    <div className="inline-flex flex-nowrap items-center gap-1 text-sm rounded-md border border-[#303030] bg-gray-200  px-0 py-0.5 shadow-xs">
      <select
        className="border-none bg-transparent px-1 py-0.5 focus:outline-none focus:ring-0 text-black font-semibold"
        value={currency}
        onChange={e => {
          setCurrency(e.target.value as Currency);
          setResult(null);
        }}
      >
        <option value="CRC">CRC</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="GBP">GBP</option>
        <option value="CNY">CNY</option>
        <option value="AUD">AUD</option>
        <option value="CAD">CAD</option>
        <option value="CHF">CHF</option>
        <option value="HKD">HKD</option>
        <option value="SEK">SEK</option>
        <option value="MXN">MXN</option>
      </select>

      <button
        onClick={onConvert}
        disabled={disabled}
        title={locale === 'es' ? 'Convertir' : 'Convert'}
        className="px-6 py-1 rounded border border-transparent bg-black hover:border-[#303030] hover:bg-[#303030] hover:text-white transition-colors disabled:opacity-50"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin  font-extrabold text-white" />
        ) : (
          <RefreshCcw className="h-4 w-4 font-extrabold text-white" />
        )}
      </button>

      <div className="min-w-[8rem] font-semibold text-black text-xs">
        {error ? (
          <span className="text-red-500">{locale === 'es' ? 'Error en conversión' : 'Conversion error'}</span>
        ) : result ? (
          new Intl.NumberFormat('es-CR', {
            style: 'currency',
            currency: result.to,
          }).format(result.amount * result.rate)
        ) : (
          <span className="flex items-center gap-1 text-gray-600"><ArrowLeft className="h-3 w-3 font-extrabold text-black" />{locale === 'es' ? 'click para convertir' : 'Click to convert'}</span>
        )}
      </div>
    </div>
  );
}
