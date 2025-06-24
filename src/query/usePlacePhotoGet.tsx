import { useQuery } from '@tanstack/react-query';

export type PlacePhotoResponse = {
  imageUrl: string | null;
};

const usePlacePhotoGet = (placeName: string) => {
  const placePhotoGet = useQuery<PlacePhotoResponse, Error>({
    queryKey: ['place-photo', placeName],
    enabled: !!placeName,
    queryFn: async () => {
      const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;
      if (!GOOGLE_API_KEY) throw new Error('Missing Google API Key');

      // 1. 장소 검색
      const searchUrl = `https://places.googleapis.com/v1/places:searchText?key=${GOOGLE_API_KEY}`;
      const searchResponse = await fetch(searchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-FieldMask': 'places.displayName,places.photos',
        },
        body: JSON.stringify({
          textQuery: placeName,
        }),
      });

      const searchData = await searchResponse.json();
      const photoName = searchData?.places?.[0]?.photos?.[0]?.name;
      if (!photoName) return { imageUrl: null };

      // 2. 사진 URI 가져오기
      const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=600&key=${GOOGLE_API_KEY}&skipHttpRedirect=true`;
      const photoRes = await fetch(photoUrl);
      const photoData = await photoRes.json();

      return { imageUrl: photoData.photoUri ?? null };
    },
    retry: 0,
  });

  return {
    placePhotoData: placePhotoGet.data,
    placePhotoIsLoading: placePhotoGet.isLoading,
    placePhotoIsSuccess: placePhotoGet.isSuccess,
    placePhotoIsError: placePhotoGet.isError,
    placePhotoError: placePhotoGet.error,
    placePhotoRefetch: placePhotoGet.refetch,
  };
};

export default usePlacePhotoGet;
