import { useQuery } from '@tanstack/react-query';
import { CountryFlagGetType } from '@type/queryReturnType';

const useCountryFlagGet = (country: string) => {
  const countryFlagGet = useQuery<CountryFlagGetType, Error>({
    queryKey: ['countryFlag', country],
    queryFn: async () => {
      if (!process.env.NEXT_PUBLIC_GOV_API_KEY) {
        throw new Error('Missing Country API Key');
      }

      const countryBaseUrl = `http://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=${process.env.NEXT_PUBLIC_GOV_API}&cond[country_nm::EQ]=${country}`;

      const response = await fetch(countryBaseUrl);
      const responseJson = await response.json();
      const data = responseJson.response.body.items.item[0];

      if (!response.ok) {
        throw new Error('Failed to fetch country flag Image data');
      }

      if (!data) {
        throw new Error('Country item structure is not valid');
      }

      console.log();
      return data;
    },
    retry: 0,
    enabled: !!country,
  });

  return {
    countryFlagData: countryFlagGet.data,
    countryFlagIsLoading: countryFlagGet.isLoading,
    countryFlagIsSuccess: countryFlagGet.isSuccess,
    countryFlagIsError: countryFlagGet.isError,
    countryFlagError: countryFlagGet.error,
    countryFlagRefetch: countryFlagGet.refetch,
  };
};

export default useCountryFlagGet;
