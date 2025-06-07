'use client';

import useCountryInfoGet from '@query/useCountryInfoGet';

export default function Test() {
  const { countryData, countryIsLoading, countryError } = useCountryInfoGet('가나', 'GH');
  if (countryIsLoading) return <p>Loading...</p>;
  if (countryError) return <p>Error: {countryError.message}</p>;

  return (
    <div>
      <h2>{countryData?.country_nm}</h2>
    </div>
  );
}
