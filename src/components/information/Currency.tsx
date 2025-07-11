import CurrencyChart from '@components/CurrencyChart';
import { ChevronRight, CircleDollarSign } from 'lucide-react';
import RightSection from '../../app/(layout)/information/_components/RightSection';
import useCurrencyGet from '@query/useCurrencyGet';
import { cn } from '@utils/cn';
import Container from '@components/public/Container';
import { SectionTitle } from '@components/public/SectionTitle';

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
    <Container className=''>
      <SectionTitle icon={<CircleDollarSign />}>환율 정보</SectionTitle>
      <div className='bg-white py-[100px] px-20 rounded-60'>
        <CurrencyChart
          currencyRateData={currencyRateData || undefined}
          showAxisLabels={false}
          showAxisLines={false}
          className=' w-full '
        />
      </div>
    </Container>
  );
}
