import CurrencyChart from '@components/CurrencyChart';
import { ChevronRight } from 'lucide-react';
import RightSection from '../../app/(layout)/information/_components/RightSection';
import useCurrencyGet from '@query/useCurrencyGet';
import { cn } from '@utils/cn';

export default function Currency() {
  const callCurrencyCode = 'TWD';
  const { currencyRateData } = useCurrencyGet(callCurrencyCode);
  const currencyRate = currencyRateData?.currencyRate;

  if (!currencyRate) return;

  const todayRate = Number(Object.values(currencyRate[0])[0]);
  const yesterdayRate = Number(Object.values(currencyRate[1])[0]);
  const diff = Number((todayRate - yesterdayRate).toFixed(2));
  const isUp = diff > 0;

  return (
    <div className=''>
      <CurrencyChart
        currencyRateData={currencyRateData || undefined}
        showAxisLabels={false}
        showAxisLines={false}
        className='h-[200px] w-full '
      />
    </div>
  );
}
