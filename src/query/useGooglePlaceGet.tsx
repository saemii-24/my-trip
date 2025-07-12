import { useQuery } from '@tanstack/react-query';
import { GoogleGenAI } from '@google/genai';
import { recommendPromptFunc, recommendPromptParsing } from '../prompt/recommend';

type GeminiPlace = { name: string; description: string };

type EnrichedPlace = GeminiPlace & {
  address: string;
  rating: number | null;
  photoUrl: string | null;
  lat: number | null;
  lng: number | null;
};

type EnrichedRecommendation = {
  sightseeing: EnrichedPlace[];
  food: EnrichedPlace[];
  shopping: EnrichedPlace[];
};

const fetchGooglePlaceDetail = async (
  query: string,
  city: string,
): Promise<Partial<EnrichedPlace>> => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API!;
  const fields = [
    'places.googleMapsLinks',
    'places.displayName',
    'places.businessStatus',
    'places.formattedAddress',
    'places.shortFormattedAddress',
    'places.rating',
    'places.photos',
    'places.location',
  ].join(',');

  const res = await fetch(
    `https://places.googleapis.com/v1/places:searchText?key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': fields,
      },
      body: JSON.stringify({ textQuery: `${query} ${city}` }),
    },
  );

  const data = await res.json();
  const place = data?.places?.[0];
  if (!place) return {};

  const photoName = place.photos?.[0]?.name;
  let photoUrl = null;

  if (photoName) {
    const photoRes = await fetch(
      `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=600&key=${API_KEY}&skipHttpRedirect=true`,
    );
    const photoData = await photoRes.json();
    photoUrl = photoData?.photoUri || null;
  }

  return {
    address: place.formattedAddress || '',
    rating: place.rating ?? null,
    photoUrl,
    lat: place.location?.latitude ?? null,
    lng: place.location?.longitude ?? null,
  };
};

export const useGooglePlaceGet = (country: string, city: string) => {
  const queryResult = useQuery<EnrichedRecommendation, Error>({
    queryKey: ['tour-data', country, city],
    enabled: !!country && !!city,
    queryFn: async () => {
      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API!,
      });

      const prompt = recommendPromptFunc(country, city);
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const parsed = recommendPromptParsing(rawText);

      const addInfoToGemini = async (list: GeminiPlace[]): Promise<EnrichedPlace[]> =>
        await Promise.all(
          list.map(async (place) => {
            const extra = await fetchGooglePlaceDetail(place.name, city);
            return {
              name: place.name,
              description: place.description,
              address: extra.address ?? '',
              rating: extra.rating ?? null,
              photoUrl: extra.photoUrl ?? null,
              lat: extra.lat ?? null,
              lng: extra.lng ?? null,
            };
          }),
        );

      const [sightseeing, food, shopping] = await Promise.all([
        addInfoToGemini(parsed.sightseeing),
        addInfoToGemini(parsed.food),
        addInfoToGemini(parsed.shopping),
      ]);

      return { sightseeing, food, shopping };
    },
    retry: 0,
  });

  return {
    googlePlaceData: queryResult.data,
    googlePlaceIsLoading: queryResult.isLoading,
    googlePlaceIsSuccess: queryResult.isSuccess,
    googlePlaceIsError: queryResult.isError,
    googlePlaceError: queryResult.error,
    googlePlaceRefetch: queryResult.refetch,
  };
};
