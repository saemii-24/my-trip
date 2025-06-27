'use client';
import { useState } from 'react';
import CountryAutoComplete from './CountryAutoComplete';

import { countryObjList } from '@utils/randomImageKeyword';
import CityAutoComplete from './CityAutoComplete';

export default function CountryCitySelector() {
  const [selectedCountry, setSelectedCountry] = useState<
    (typeof countryObjList)[0] | null
  >(null);

  return (
    <div className='space-y-6'>
      <CountryAutoComplete onSelectCountry={setSelectedCountry} />
      {selectedCountry && <CityAutoComplete country={selectedCountry} />}
    </div>
  );
}
