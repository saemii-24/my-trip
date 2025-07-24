import { useQuery } from '@tanstack/react-query';
import { UnsplashResponseType } from '../type/unsplashResponseType';

const useUnsplashGet = (country: string) => {
  const unsplashGet = useQuery<UnsplashResponseType, Error>({
    queryKey: ['unsplash', country],
    queryFn: async () => {
      console.log('실행여부');
      console.log(process.env.NEXT_PUBLIC_UNSPLASH_API);
      if (!process.env.NEXT_PUBLIC_UNSPLASH_API) {
        throw new Error('Missing Unsplash API Key');
      }

      const unsplashBaseUrl = 'https://api.unsplash.com/photos/random';
      const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_UNSPLASH_API,
        query: country,
        count: '1',
        orientation: 'landscape',
      });

      const response = await fetch(`${unsplashBaseUrl}?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.errors?.[0] || 'Failed to fetch Unsplash image');
      }

      console.log(data);

      return data[0]; // 배열 중 첫 번째 이미지
    },
    retry: 0,
  });

  return {
    unsplashData: unsplashGet.data,
    unsplashIsLoading: unsplashGet.isLoading,
    unsplashIsSuccess: unsplashGet.isSuccess,
    unsplashIsError: unsplashGet.isError,
    unsplashError: unsplashGet.error,
    unsplashRefetch: unsplashGet.refetch,
  };
};

export default useUnsplashGet;
