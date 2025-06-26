'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ArrowRight from '@components/icon/ArrowRight';
import { isKorean } from './CountryAutoComplete';
import { cn } from '@utils/cn';
import { useKeyboardNavigation } from './useKeyboardNavigation';

export default function CityAutoComplete({
  country,
}: {
  country: {
    cities: string[];
    citiesKR: string[];
    flag: string;
  };
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredCities = (() => {
    const lowerQuery = query.toLowerCase();

    if (!query) return country.citiesKR;

    return isKorean(query)
      ? country.citiesKR.filter((kw) => kw.toLowerCase().includes(lowerQuery))
      : country.cities.filter((kw) => kw.toLowerCase().includes(lowerQuery));
  })();

  const handleSelect = (city: string) => {
    setSelected(city);
    setQuery(city);
    setIsOpen(false);
  };

  const { focusedIndex, handleKeyDown, resetFocus } = useKeyboardNavigation({
    items: filteredCities,
    onSelect: handleSelect,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    resetFocus();
  }, [query, isOpen]);

  return (
    <div ref={wrapperRef} className='relative w-full h-20'>
      <input
        type='text'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder='도시명을 입력하세요'
        className='placeholder:font-light placeholder:text-gray-100 w-full py-2 text-6xl font-semibold h-full border-b border-gray-800 focus:outline-none'
      />

      {isOpen && filteredCities.length > 0 && (
        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-sm max-h-[200px] overflow-auto'>
          {filteredCities.map((city, index) => {
            const isFocused = index === focusedIndex;
            return (
              <div
                key={index}
                onClick={() => handleSelect(city)}
                className={cn(
                  'px-4 py-2 cursor-pointer flex items-center gap-2',
                  isFocused ? 'bg-lime-200' : 'hover:bg-lime-100',
                )}
              >
                <Image src={country.flag} alt='국기' width={36} height={36} />
                <span>{city}</span>
              </div>
            );
          })}
        </div>
      )}

      {isOpen && filteredCities.length === 0 && (
        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-gray-500'>
          일치하는 도시가 없습니다.
        </div>
      )}

      <button
        type='button'
        className='size-10 rounded-full center-flex bg-lime-400 absolute right-0 bottom-2 hover:bg-lime-500 transition'
      >
        <ArrowRight className='text-white size-5' />
      </button>
    </div>
  );
}
