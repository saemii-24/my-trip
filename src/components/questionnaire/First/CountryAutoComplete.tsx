import Image from 'next/image';
import { useEffect, useRef, useCallback, useState } from 'react';
import { cn } from '@utils/cn';
import { countryObjList } from '@utils/randomImageKeyword';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldValues,
  Path,
  UseFormSetError,
  UseFormClearErrors,
} from 'react-hook-form';
import { useKeyboardNavigation } from './useKeyboardNavigation';

type Props<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  onSelectCountry: (country: (typeof countryObjList)[0]) => void;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
};

export const isKorean = (text: string) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);

export default function CountryAutoComplete<T extends FieldValues>({
  name,
  register,
  watch,
  setValue,
  onSelectCountry,
  setError,
  clearErrors,
}: Props<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const value = watch(name) as string;
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = countryObjList.filter((item) => {
    if (!value) return true;
    const lower = value.toLowerCase();
    return isKorean(value)
      ? item.searchKeywordsKR.some((kw) => kw.includes(lower))
      : item.searchKeywords.some((kw) => kw.toLowerCase().includes(lower));
  });

  const handleSelect = useCallback(
    (displayName: string) => {
      const selected = countryObjList.find(
        (item) => item.country === displayName || item.countryKR === displayName,
      );
      if (selected) {
        const result = isKorean(value) ? selected.countryKR : selected.country;
        setValue(name, result as any);
        onSelectCountry(selected);
        setIsOpen(false); // 선택 후 닫기
      }
    },
    [value, name, setValue, onSelectCountry],
  );

  const { focusedIndex, handleKeyDown, resetFocus } = useKeyboardNavigation({
    items: filteredCountries.map((item) =>
      isKorean(value) ? item.countryKR : item.country,
    ),
    onSelect: handleSelect,
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        if (!value) return; // 아무것도 입력 안 했으면 무시

        if (filteredCountries.length === 1) {
          const onlyOne = filteredCountries[0];
          const autoValue = isKorean(value) ? onlyOne.countryKR : onlyOne.country;
          setValue(name, autoValue as any);
          clearErrors(name); // 에러 클리어
          onSelectCountry(onlyOne);
        } else if (filteredCountries.length === 0) {
          setError(name, {
            type: 'manual',
            message: '일치하는 국가가 없습니다.',
          });
        } else {
          setError(name, {
            type: 'manual',
            message: '정확한 국가명을 선택해주세요.',
          });
        }

        resetFocus();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, filteredCountries, name, setValue, setError, resetFocus]);

  useEffect(() => {
    resetFocus();
  }, [value]);

  return (
    <div ref={wrapperRef} className='relative w-full h-20'>
      <input
        {...register(name)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder='국가명을 입력하세요'
        className='placeholder:font-light placeholder:text-gray-100 w-full py-2 text-6xl font-semibold h-full border-b border-gray-800 focus:outline-none'
      />

      {isOpen && filteredCountries.length > 0 && (
        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-sm max-h-[200px] overflow-auto'>
          {filteredCountries.map((item, index) => {
            const isFocused = index === focusedIndex;
            const display = isKorean(value) ? item.countryKR : item.country;
            return (
              <div
                key={item.country}
                onClick={() => handleSelect(display)}
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
                <span>{display}</span>
              </div>
            );
          })}
        </div>
      )}

      {isOpen && filteredCountries.length === 0 && value && (
        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-gray-500'>
          일치하는 국가가 없습니다.
        </div>
      )}
    </div>
  );
}
