'use client';

import useCountryInfoGet from '@query/useCountryInfoGet';

export default function Test() {
  const { countryData, countryIsLoading, countryError } = useCountryInfoGet('프랑스');

  return <div>{countryData?.countryName}</div>;
}
