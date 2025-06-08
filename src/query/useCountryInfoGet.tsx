import { useQuery } from '@tanstack/react-query';
import { CountryBasicInfo, CountryInfoGetType } from '@type/queryReturnType';
import convertXmlStringToObject from '@utils/convertXmlStringToObject';
import * as convert from 'simple-xml-to-json';

type XmlElement = {
  [key: string]: { content: string };
};

// type ParsedData = { [key: string]: string | null | Record<string, any> };

const useCountryInfoGet = (country: string) => {
  const countryInfoGet = useQuery<CountryInfoGetType, Error>({
    queryKey: ['countryInfo', country],
    queryFn: async () => {
      if (!process.env.NEXT_PUBLIC_COUNTRY_API_KEY) {
        throw new Error('Missing Country API Key');
      }

      const countryBaseUrl = `http://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList?countryName=${country}&ServiceKey=${process.env.NEXT_PUBLIC_COUNTRY_API_KEY}`;

      const response = await fetch(countryBaseUrl);
      const xmlText = await response.text();

      if (!response.ok) {
        throw new Error('Failed to fetch country data');
      }

      const xmlData = convert.convertXML(xmlText);

      const itemChildren =
        xmlData?.response?.children?.[1]?.body?.children?.[0]?.items?.children?.[0]?.item
          ?.children;

      if (!Array.isArray(itemChildren)) {
        throw new Error('Country item structure is not valid');
      }

      const dataParsing = (itemChildren as XmlElement[]).reduce<
        Partial<CountryInfoGetType>
      >((acc, curr) => {
        const key = Object.keys(curr)[0] as keyof CountryInfoGetType;
        const value = curr[key];
        return { ...acc, [key]: value?.content ?? null };
      }, {}) as CountryInfoGetType;

      if (typeof dataParsing.basic === 'string') {
        try {
          const basicObject = convertXmlStringToObject(
            dataParsing.basic,
          ) as CountryBasicInfo;
          dataParsing.basic = basicObject;
        } catch (error) {
          console.warn('Failed to convert basic XML string:', error);
        }
      }

      return dataParsing;
    },
    retry: 0,
    enabled: !!country,
  });

  return {
    countryInfoData: countryInfoGet.data,
    countryInfoIsLoading: countryInfoGet.isLoading,
    countryInfoIsSuccess: countryInfoGet.isSuccess,
    countryInfoIsError: countryInfoGet.isError,
    countryInfoError: countryInfoGet.error,
    countryInfoRefetch: countryInfoGet.refetch,
  };
};

export default useCountryInfoGet;
