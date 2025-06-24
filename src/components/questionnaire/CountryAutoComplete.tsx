'use client';
import Image from 'next/image';
import ArrowRight from '@components/icon/ArrowRight';
import { countryObjList } from '@utils/randomImageKeyword';
import { useEffect, useRef, useState } from 'react';

// 한글 포함 여부 체크
export const isKorean = (text: string) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);

export default function CountryAutoComplete({
  onSelectCountry,
}: {
  onSelectCountry: (country: (typeof countryObjList)[0]) => void;
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // 선택된 국가는 영어명/한글명 구분없이 문자열로 저장
  // TODO: react hook form으로 관리해야됨
  const [selected, setSelected] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  //사용자 검색 필터링
  const filteredCountries = countryObjList.filter((item) => {
    if (!query) return countryObjList;
    const lowerQuery = query.toLowerCase();

    if (isKorean(query)) {
      // 한글 검색어 -> 한글 키워드 배열 중 하나라도 포함되면 true
      return item.searchKeywordsKR.some((kw) => kw.toLowerCase().includes(lowerQuery));
    } else {
      // 영어 검색어 -> 영어 키워드 배열 중 하나라도 포함되면 true
      return item.searchKeywords.some((kw) => kw.toLowerCase().includes(lowerQuery));
    }
  });

  const handleSelect = (displayName: string) => {
    const selected = filteredCountries.find(
      (item) => item.country === displayName || item.countryKR === displayName,
    );
    if (selected) {
      setSelected(displayName);
      setQuery(displayName);
      setIsOpen(false);
      onSelectCountry(selected); // 👈 상위로 전달
    }
  };

  //바깥 눌러서 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 드롭다운에 보여줄 이름은 현재 query가 한글인지 영어인지에 따라 다름
  const getDisplayName = (item: (typeof countryObjList)[0]) => {
    if (!query) return item.countryKR; //최초 dropdown은 한국어로 보여줌
    return isKorean(query) ? item.countryKR : item.country;
  };

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
        placeholder='국가명을 입력하세요'
        className='placeholder:font-light placeholder:text-gray-100 w-full  py-2 text-6xl font-semibold h-full border-b border-gray-800 focus:outline-none '
      />

      {isOpen && filteredCountries.length > 0 && (
        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-sm max-h-[200px] overflow-auto'>
          {filteredCountries.map((item) => (
            <div
              key={item.country}
              onClick={() => handleSelect(getDisplayName(item))}
              className='px-4 py-2 hover:bg-lime-100 cursor-pointer flex items-center gap-2'
            >
              {/* TODO: 국가 이모지 링크 추가 예정 */}
              <Image
                src={item.flag}
                alt={item.citiesKR + '국기'}
                width={36}
                height={36}
              />
              <span>{getDisplayName(item)}</span>
            </div>
          ))}
        </div>
      )}

      {isOpen && filteredCountries.length === 0 && (
        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-gray-500'>
          일치하는 국가가 없습니다.
        </div>
      )}
      <button className='size-10 rounded-full center-flex bg-lime-400 absolute right-0 bottom-2 hover:bg-lime-500 transition'>
        <ArrowRight className='text-white size-5' />
      </button>
    </div>
  );
}
