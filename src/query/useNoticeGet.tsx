import { useQuery } from '@tanstack/react-query';

const useNoticeGet = (page = 1, numOfRows = 10) => {
  const noticeQuery = useQuery({
    queryKey: ['notice', page, numOfRows],

    queryFn: async () => {
      const url = `/api/notice?pageNo=${page}?numOfRows=${numOfRows}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch notice');
      }

      const json = await response.json();
      const body = json?.response?.body;

      if (!body || !body.items || !body.items.item) {
        throw new Error('No notice data available');
      }

      return {
        items: body.items,
        totalCount: body.totalCount,
      };
    },
    retry: 0,
  });

  return {
    noticeTotalCount: noticeQuery.data?.totalCount,
    noticeData: noticeQuery.data?.items?.item,
    noticeIsLoading: noticeQuery.isLoading,
    noticeIsSuccess: noticeQuery.isSuccess,
    noticeIsError: noticeQuery.isError,
    noticeError: noticeQuery.error,
    noticeRefetch: noticeQuery.refetch,
  };
};

export default useNoticeGet;
