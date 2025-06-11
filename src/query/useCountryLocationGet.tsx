import { useQuery } from '@tanstack/react-query';

const useCountryLocationGet = (country: string) => {
  const countryLocationGet = useQuery({
    queryKey: ['countryLocation', country],
    queryFn: async () => {
      const countryBaseUrl = `https://restcountries.com/v3.1/name/${country}`;

      const response = await fetch(countryBaseUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch country location data');
      }

      const data = await response.json();
      console.log(data);

      return data;
    },
    retry: 0,
    enabled: !!country,
  });

  return {
    countryLocationData: countryLocationGet?.data,
    countryLocationIsLoading: countryLocationGet.isLoading,
    countryLocationIsSuccess: countryLocationGet.isSuccess,
    countryLocationIsError: countryLocationGet.isError,
    countryLocationError: countryLocationGet.error,
    countryLocationRefetch: countryLocationGet.refetch,
  };
};

export default useCountryLocationGet;
