import { useQuery } from '@tanstack/react-query';

export type ExchangeRateItem = {
  result: number;
  cur_unit: string;
  cur_nm: string;
  deal_bas_r: string;
  ttb: string;
  tts: string;
  bkpr: string;
};

const API_URL = 'https://oapi.koreaexim.go.kr/site/program/financial/exchangeJSON';

const useExchangeRateGet = (dateStr = '') => {
  const exchangeRateGet = useQuery<ExchangeRateItem[], Error>({
    queryKey: ['exchange-rate', dateStr],
    queryFn: async () => {
      const searchDate = dateStr || getTodayStr();
      const url = `${API_URL}?authkey=${process.env.NEXT_PUBLIC_EXCHANGE_API_KEY}&searchdate=${searchDate}&data=AP01`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`API 호출 실패: ${res.status}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error('잘못된 응답 형식');
      }

      // result: 1 인 항목만 필터
      return data.filter((item) => item.result === 1);
    },
    retry: 0,
  });

  return {
    exchangeRateData: exchangeRateGet.data,
    exchangeRateIsLoading: exchangeRateGet.isLoading,
    exchangeRateIsSuccess: exchangeRateGet.isSuccess,
    exchangeRateIsError: exchangeRateGet.isError,
    exchangeRateError: exchangeRateGet.error,
    exchangeRateRefetch: exchangeRateGet.refetch,
  };
};

const getTodayStr = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
};

export default useExchangeRateGet;
