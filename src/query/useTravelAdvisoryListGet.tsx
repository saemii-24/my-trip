import { useQuery } from '@tanstack/react-query';
import { TravelAdvisoryItemGetType } from '@type/queryReturnType';

type ApiResponseType = {
  items: {
    item: TravelAdvisoryItemGetType[];
  };
  totalCount: number;
};

const useTravelAdvisoryListGet = (country: string, page = 1) => {
  const travelAdvisoryQuery = useQuery<ApiResponseType, Error>({
    queryKey: ['travelAdvisoryList', country, page],
    queryFn: async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOV_API_KEY;
      if (!apiKey) {
        throw new Error('Missing Country API Key');
      }

      const baseUrl = `https://apis.data.go.kr/1262000/CountrySafetyService6/getCountrySafetyList6?serviceKey=${apiKey}&numOfRows=10&cond[country_nm::EQ]=${country}&pageNo=${page}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch travel advisory list');
      }

      const json = await response.json();
      const body = json?.response?.body;

      if (!body || !body.items || !body.items.item) {
        throw new Error('No travel advisory data available');
      }

      return {
        items: body.items,
        totalCount: body.totalCount,
      };
    },
    retry: 0,
    enabled: !!country,
  });

  return {
    travelAdvisoryTotalCount: travelAdvisoryQuery.data?.totalCount,
    travelAdvisoryData: travelAdvisoryQuery.data?.items?.item,
    travelAdvisoryIsLoading: travelAdvisoryQuery.isLoading,
    travelAdvisoryIsSuccess: travelAdvisoryQuery.isSuccess,
    travelAdvisoryIsError: travelAdvisoryQuery.isError,
    travelAdvisoryError: travelAdvisoryQuery.error,
    travelAdvisoryRefetch: travelAdvisoryQuery.refetch,
  };
};

export default useTravelAdvisoryListGet;
