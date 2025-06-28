'use client';
import useCountryFlagGet from '@query/useCountryFlagGet';
import useCountryInfoGet from '@query/useCountryInfoGet';
import { useGeminiGet } from '@query/useGeminiGet';
import { itineraryPromptFunc } from '../../prompt/itinerary';
import Container from '@components/public/Container';
import Header from '@components/public/Header';
import CountryLocationMap from '@components/CountryLocationMap';
import useCountryLocationGet from '@query/useCountryLocationGet';

export default function Test() {
  // const { countryInfoData } = useCountryInfoGet('프랑스');
  // const { countryFlagData } = useCountryFlagGet('프랑스');
  // const { geminiData } = useGeminiGet(itineraryPromptFunc('대한민국'));

  const { countryLocationData } = useCountryLocationGet('South Korea');

  return (
    <>
      {countryLocationData && (
        <>
          {' '}
          <Container>
            <Header />
          </Container>
          <CountryLocationMap
            lat={countryLocationData[0].latlng[0]}
            lng={countryLocationData[0].latlng[1]}
          />
        </>
      )}
    </>
  );
}
