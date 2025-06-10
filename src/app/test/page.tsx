'use client';
import useCountryFlagGet from '@query/useCountryFlagGet';
import useCountryInfoGet from '@query/useCountryInfoGet';
import { useGeminiGet } from '@query/useGeminiPost';
import { itineraryPromptFunc } from '../../prompt/itinerary';
import Container from '@components/public/Container';
import Header from '@components/public/Header';
import CountryMap from '@components/CountryMap';

export default function Test() {
  // const { countryInfoData } = useCountryInfoGet('프랑스');
  // const { countryFlagData } = useCountryFlagGet('프랑스');
  // const { geminiData } = useGeminiGet(itineraryPromptFunc('대한민국'));

  return (
    <>
      <Container>
        <Header />
      </Container>
      <CountryMap country={'대한민국'} />
    </>
  );
}
