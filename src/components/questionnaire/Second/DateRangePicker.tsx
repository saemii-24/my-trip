'use client';
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addDays } from 'date-fns';
import { ko } from 'date-fns/locale';

import ChevronLeft from '@components/icon/ChevronLeft';
import ChevronRight from '@components/icon/ChevronRight';

import { cn } from '@utils/cn';

import 'react-datepicker/dist/react-datepicker.css';
import './dateRangePicker.css';

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

const DateRangePicker: React.FC<CalendarProps> = ({
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

  const getDurationDays = (start?: Date, end?: Date) => {
    if (!start || !end) return null;
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const totalDays = getDurationDays(startDate, endDate);

  // 취소 버튼 핸들러
  // 취소 버튼 핸들러
  const handleCancel = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    if (onChange) onChange(undefined, undefined);
  };

  return (
    <div
      className={cn(
        'flex flex-col items-start gap-4 bg-white shadow-sm border border-slate-200 w-fit  rounded-2xl overflow-hidden',
        isDisabled && 'pointer-events-none opacity-50',
      )}
    >
      {/* 전체 캘린더 wrapper */}
      <div className='flex '>
        {/* 좌측 일정 선택 */}
        <div className='flex gap-4 bg-white w-[200px] border-r border-slate-200'>
          <div className='w-full'>
            <h4 className='mt-8 ml-8 text-lg font-bold mb-3'>일정 간편 선택</h4>
            <ul className='flex flex-col gap-1 w-full'>
              {stayOptions.map(({ label, nights }) => (
                <li
                  key={label}
                  onClick={() => handleStayOptionClick(nights)}
                  className={cn(
                    'rounded cursor-pointer select-none text-base px-8 py-2 w-full',
                    !startDate ? 'cursor-default opacity-50' : 'hover:bg-lime-100',
                  )}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* 우측 달력 선택 */}
        <div className=''>
          <div className='px-10 py-6'>
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
                <div className='w-full flex mb-2'>
                  <button
                    type='button'
                    aria-label='Previous Month'
                    className={cn(
                      'align-middle border border-slate-200 rounded-md p-1 mr-auto justify-center',
                    )}
                    style={customHeaderCount === 1 ? { visibility: 'hidden' } : {}}
                    onClick={decreaseMonth}
                  >
                    <ChevronLeft className='size-6' />
                  </button>
                  <span
                    className={cn('react-datepicker__current-month center-flex mb-1')}
                  >
                    {monthDate.toLocaleString('ko', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                  <button
                    type='button'
                    aria-label='Next Month'
                    className={cn(
                      'align-middle border border-slate-200 rounded-md p-1 ml-auto',
                    )}
                    style={customHeaderCount === 0 ? { visibility: 'hidden' } : {}}
                    onClick={increaseMonth}
                  >
                    <ChevronRight className='size-6' />
                  </button>
                </div>
              )}
            />
          </div>
          <div className='py-5 px-10 flex w-full border-t border-slate-200 items-center justify-between bg-lime'>
            <div className='font-semibold'>
              <span className=''>총 일정: </span>
              <span>{totalDays ? `${totalDays}일` : '0일'}</span>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={handleCancel}
                className='rounded-full bg-lime-100 h-10 px-4 text-lime-700 font-semibold min-w-[100px]'
              >
                취소
              </button>
              <button className='rounded-full bg-lime-500 font-semibold h-10 px-4 text-white min-w-[100px]'>
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
