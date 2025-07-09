'use client';
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addDays } from 'date-fns';
import { ko } from 'date-fns/locale';

import ChevronLeft from '@components/icon/ChevronLeft';
import ChevronRight from '@components/icon/ChevronRight';

import { cn } from '@utils/cn';

import 'react-datepicker/dist/react-datepicker.css';

export default function Page() {
  return (
    <div className='flex-center h-screen w-screen'>
      <Calendar />
    </div>
  );
}

// 한국어 로케일 등록
registerLocale('ko', ko);

type mode = 'single' | 'range';

interface CalendarProps {
  mode?: mode;
  start?: Date;
  end?: Date;
  limit?: boolean;
  onChange?: (start: Date | undefined, end: Date | undefined) => void;
  isDisabled?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  mode = 'range',
  start,
  end,
  limit = false,
  onChange,
  isDisabled = false,
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(start);
  const [endDate, setEndDate] = useState<Date | undefined>(end);

  // 여행일정 옵션들 (박수 기준)
  const stayOptions = [
    { label: '1박 2일', nights: 1 },
    { label: '2박 3일', nights: 2 },
    { label: '3박 4일', nights: 3 },
    { label: '4박 5일', nights: 4 },
    { label: '6박 7일', nights: 6 },
    { label: '10박 11일', nights: 10 },
  ];

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start ?? undefined);
    setEndDate(end ?? undefined);

    if (onChange) {
      onChange(start ?? undefined, end ?? undefined);
    }
  };

  useEffect(() => {
    setStartDate(start);
    setEndDate(end);
  }, [start, end]);

  function isMoreThanAMonth(date1: Date, date2: Date) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return daysDiff > 31;
  }

  useEffect(() => {
    if (startDate && endDate) {
      const isOverAMonth = isMoreThanAMonth(startDate, endDate);
      if (isOverAMonth && limit) {
        alert('검색 기간을 1개월 내로 선택해주세요.');

        const newEndDate = new Date(startDate);
        newEndDate.setMonth(newEndDate.getMonth() + 1);
        setEndDate(newEndDate);

        if (onChange) {
          onChange(startDate, newEndDate);
        }
      }
    }
  }, [endDate, startDate, limit, onChange]);

  // 좌측 여행일정 선택시 endDate 자동 세팅
  const handleStayOptionClick = (nights: number) => {
    if (!startDate) return; // startDate 없으면 무시
    const newEndDate = addDays(startDate, nights);
    setEndDate(newEndDate);
    if (onChange) onChange(startDate, newEndDate);
  };

  // 오늘 날짜
  const today = new Date();

  return (
    <div
      className={cn(
        'flex flex-col items-start gap-4',
        isDisabled && 'pointer-events-none opacity-50',
      )}
    >
      {/* 전체 캘린더 wrapper */}

      <div className='flex gap-2'>
        <div className='flex gap-4'>
          <div>
            <h4>일정 간편 선택</h4>
            <ul className='flex flex-col gap-2'>
              {stayOptions.map(({ label, nights }) => (
                <li
                  key={label}
                  onClick={() => handleStayOptionClick(nights)}
                  className={cn(
                    'rounded cursor-pointer select-none  px-3 py-1 text-sm',
                    !startDate ? 'cursor-default opacity-50' : 'hover:bg-blue-200',
                  )}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className='flex h-20 rounded-t-xl bg-red'>
            <div className='h-full w-1/2'>월, 6월 18일</div>
            <div className='h-full w-1/2'>월, 6월 18일</div>
          </div>
          <DatePicker
            inline
            locale={ko}
            selected={startDate}
            onChange={handleDateChange}
            disabled={isDisabled}
            startDate={startDate}
            endDate={endDate}
            minDate={today} // 오늘부터 선택 가능, 과거 날짜 불가
            monthsShown={2}
            selectsRange
            dateFormat='yyyy.MM.dd'
            placeholderText='날짜를 선택해주세요'
            disabledKeyboardNavigation
            renderCustomHeader={({
              monthDate,
              customHeaderCount,
              decreaseMonth,
              increaseMonth,
            }) => (
              <div>
                <button
                  type='button'
                  aria-label='Previous Month'
                  className={cn('align-middle')}
                  style={customHeaderCount === 1 ? { visibility: 'hidden' } : {}}
                  onClick={decreaseMonth}
                >
                  <ChevronLeft />
                </button>
                <span className={cn('react-datepicker__current-month')}>
                  {monthDate.toLocaleString('ko', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
                <button
                  type='button'
                  aria-label='Next Month'
                  className={cn('align-middle')}
                  style={customHeaderCount === 0 ? { visibility: 'hidden' } : {}}
                  onClick={increaseMonth}
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          />
        </div>
      </div>
      <div className='flex h-20 w-full items-center justify-between bg-lime'>
        <div>
          <span>총 일정</span>
          <span>10일</span>
        </div>
        <div>
          <button>취소</button>
          <button>확인</button>
        </div>
      </div>
    </div>
  );
};
