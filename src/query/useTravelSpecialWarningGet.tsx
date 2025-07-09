import { useQuery } from '@tanstack/react-query';

const useTravelSpecialWarningGet = (page = 1, numOfRows = 10) => {
  const travelWarningQuery = useQuery({
    queryKey: ['travelSpecialWarning', page],

    queryFn: async () => {
      const url = `/api/travelSpecialWarning?pageNo=${page}?numOfRows=${numOfRows}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch travel special warning');
      }

      const json = await response.json();
      const body = json?.response?.body;

      if (!body || !body.items || !body.items.item) {
        throw new Error('No travel special warning data available');
      }

      return {
        items: body.items,
        totalCount: body.totalCount,
      };
    },
    retry: 0,
  });

  return {
    travelWarningTotalCount: travelWarningQuery.data?.totalCount,
    travelWarningData: travelWarningQuery.data?.items?.item,
    travelWarningIsLoading: travelWarningQuery.isLoading,
    travelWarningIsSuccess: travelWarningQuery.isSuccess,
    travelWarningIsError: travelWarningQuery.isError,
    travelWarningError: travelWarningQuery.error,
    travelWarningRefetch: travelWarningQuery.refetch,
  };
};

export default useTravelSpecialWarningGet;
