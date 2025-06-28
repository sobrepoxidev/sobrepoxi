export const formatUSD = (value: number | string) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol', // prints “$” not “US$”
      minimumFractionDigits: 2,        // always two decimals
    }).format(Number(value));
  