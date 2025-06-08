'use client';

import Image from 'next/image';
import useCountryFlagGet from '@query/useCountryFlagGet';
import useCountryInfoGet from '@query/useCountryInfoGet';

export default function Test() {
  const { countryInfoData } = useCountryInfoGet('프랑스');
  const { countryFlagData } = useCountryFlagGet('프랑스');

  console.log(countryFlagData);

  return (
    <div>
      <div>{countryInfoData?.countryName}</div>
      {countryFlagData?.download_url && (
        <Image
          width={30}
          height={30}
          src={countryFlagData?.download_url}
          alt={countryFlagData?.origin_file_nm}
        />
      )}
    </div>
  );
}
