import { useQuery } from '@tanstack/react-query';

type CurrencyRate = {
  [key: string]: string;
};

export interface CurrencyRateResponse {
  currencyCode: string;
  currencyRate: CurrencyRate[];
}

const useCurrencyGet = (currencyCode: string) => {
  const currencyRateGet = useQuery<CurrencyRateResponse, Error>({
    queryKey: ['currencyRate', currencyCode],
    queryFn: async () => {
      const currencyCallUrl = `/api/currency?currencyCode=${currencyCode}`;
      const response = await fetch(currencyCallUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate data');
      }

      const data = await response.json();
      return { currencyCode, currencyRate: data.reverse() };
    },
    retry: 0,
    enabled: !!currencyCode,
  });

  return {
    currencyRateData: currencyRateGet.data,
    currencyRateIsLoading: currencyRateGet.isLoading,
    currencyRateIsSuccess: currencyRateGet.isSuccess,
    currencyRateIsError: currencyRateGet.isError,
    currencyRateError: currencyRateGet.error,
    currencyRateRefetch: currencyRateGet.refetch,
  };
};

export default useCurrencyGet;
