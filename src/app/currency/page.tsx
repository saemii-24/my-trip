'use client';
import useCurrencyGet from '@query/useCurrencyGet';

export default function Page() {
  const { currencyRateData } = useCurrencyGet('JPY');
  console.log(currencyRateData);

  return <div></div>;
}
