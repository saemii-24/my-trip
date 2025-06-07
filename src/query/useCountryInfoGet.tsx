import { useQuery } from '@tanstack/react-query';

const useCountryInfoGet = (country: string) => {
  const countryInfoGet = useQuery<any, Error>({
    queryKey: ['countryInfo', country],
    queryFn: async () => {
      if (!process.env.NEXT_PUBLIC_COUNTRY_API_KEY) {
        throw new Error('Missing Country API Key');
      }

      const countryBaseUrl = `http://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList?countryName=${country}&ServiceKey=${process.env.NEXT_PUBLIC_COUNTRY_API_KEY}`;

      const response = await fetch(countryBaseUrl);
      const data = await response.json(); //#TODO xml 형식이므로 이를 parsing 해야 됨

      if (!response.ok || !data?.response?.body?.items?.item?.length) {
        throw new Error('Failed to fetch country data');
      }

      return data.response.body.items.item[0];
    },
    retry: 0,
    enabled: !!country,
  });

  return {
    countryData: countryInfoGet.data,
    countryIsLoading: countryInfoGet.isLoading,
    countryIsSuccess: countryInfoGet.isSuccess,
    countryIsError: countryInfoGet.isError,
    countryError: countryInfoGet.error,
    countryRefetch: countryInfoGet.refetch,
  };
};

export default useCountryInfoGet;
