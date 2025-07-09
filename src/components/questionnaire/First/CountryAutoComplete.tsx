'use client';
import Image from 'next/image';
import ArrowRight from '@components/icon/ArrowRight';
import { countryObjList } from '@utils/randomImageKeyword';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@utils/cn';
import { useKeyboardNavigation } from './useKeyboardNavigation';

export const isKorean = (text: string) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);

export default function CountryAutoComplete({
  onSelectCountry,
}: {
  onSelectCountry: (country: (typeof countryObjList)[0]) => void;
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countryObjList.filter((item) => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();

    if (isKorean(query)) {
      return item.searchKeywordsKR.some((kw) => kw.toLowerCase().includes(lowerQuery));
    } else {
      return item.searchKeywords.some((kw) => kw.toLowerCase().includes(lowerQuery));
    }
  });

  const getDisplayName = (item: (typeof countryObjList)[0]) => {
    if (!query) return item.countryKR;
    return isKorean(query) ? item.countryKR : item.country;
  };

  const displayNameList = filteredCountries.map(getDisplayName);

  const handleSelect = (displayName: string) => {
    const selected = filteredCountries.find(
      (item) => item.country === displayName || item.countryKR === displayName,
    );
    if (selected) {
      setSelected(displayName);
      setQuery(displayName);
      setIsOpen(false);
      onSelectCountry(selected);
    }
  };

  const { focusedIndex, handleKeyDown, resetFocus } = useKeyboardNavigation({
    items: displayNameList,
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
        placeholder='국가명을 입력하세요'
        className='placeholder:font-light placeholder:text-gray-100 w-full py-2 text-6xl font-semibold h-full border-b border-gray-800 focus:outline-none'
      />

      {isOpen && filteredCountries.length > 0 && (
        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-sm max-h-[200px] overflow-auto'>
          {filteredCountries.map((item, index) => {
            const isFocused = index === focusedIndex;
            return (
              <div
                key={item.country}
                onClick={() => handleSelect(getDisplayName(item))}
                className={cn(
                  'px-4 py-2 cursor-pointer flex items-center gap-2',
                  isFocused ? 'bg-lime-200' : 'hover:bg-lime-100',
                )}
              >
                <Image
                  src={item.flag}
                  alt={`${item.citiesKR} 국기`}
                  width={36}
                  height={36}
                />
                <span>{getDisplayName(item)}</span>
              </div>
            );
          })}
        </div>
      )}

      {isOpen && filteredCountries.length === 0 && (
        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-gray-500'>
          일치하는 국가가 없습니다.
        </div>
      )}

      <button
        type='button'
        className='size-10 rounded-full flex-center bg-lime-400 absolute right-0 bottom-2 hover:bg-lime-500 transition'
      >
        <ArrowRight className='text-white size-5' />
      </button>
    </div>
  );
}
