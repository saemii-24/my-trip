import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { addDays } from 'date-fns';

import { TiCalendar } from 'react-icons/ti';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

import cn from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';
import 'DatePicker.css';

// 로케일 등록
registerLocale('ko', ko);

interface CalendarProps {
  start?: Date;
  end?: Date;
  limit?: boolean;
  onChange?: (start: Date | undefined, end: Date | undefined) => void;
}

const Calendar: React.FC<CalendarProps> = ({ start, end, limit = false, onChange }) => {
  // date-picker 날짜 선택
  const [startDate, setStartDate] = useState<Date | undefined>(start);
  const [endDate, setEndDate] = useState<Date | undefined>(end);

  // date-picker를 사용하기 위한 함수
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start ?? undefined);
    setEndDate(end ?? undefined);
    if (onChange) {
      onChange(start ?? undefined, end ?? undefined); // onChange 콜백 호출
    }
  };

  function isMoreThanAMonth(date1: Date, date2: Date) {
    // 두 날짜를 밀리초로 변환
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());

    // 하루는 86400000 밀리초
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    // console.log(daysDiff);

    // 한 달을 31일로 기준으로 계산
    return daysDiff > 31;
  }

  //limit이 true 인경우 경고문구를 띄운다.
  useEffect(() => {
    if (startDate && endDate) {
      const isOverAMonth = isMoreThanAMonth(startDate, endDate);

      if (isOverAMonth && limit) {
        alert('검색 기간을 1개월 내로 선택해주세요.');

        //end 날짜를 강제로 한달 후 날짜로 고정 시킨다.
        const newEndDate = new Date(startDate);
        newEndDate.setMonth(newEndDate.getMonth() + 1);
        setEndDate(newEndDate);
        if (onChange) {
          onChange(startDate, newEndDate);
        }
      }
    }
  }, [endDate, startDate, limit, onChange]);

  return (
    <div className='flex h-10 w-[250px] shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#C7C7C7] text-[#747476] placeholder:text-[#C7C7C7] focus:outline-blue-200'>
      <DatePicker
        locale={ko}
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        maxDate={addDays(new Date(), 0)}
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
              aria-label='Previous Month'
              className={cn(
                'react-datepicker__navigation react-datepicker__navigation--previous',
              )}
              style={customHeaderCount === 1 ? { visibility: 'hidden' } : {}}
              onClick={decreaseMonth}
            >
              <IoIosArrowBack />
            </button>

            <span className={cn('react-datepicker__current-month')}>
              {monthDate.toLocaleString('ko', {
                year: 'numeric',
                month: 'long',
              })}
            </span>

            <button
              aria-label='Next Month'
              className={cn(
                'react-datepicker__navigation react-datepicker__navigation--next',
              )}
              style={customHeaderCount === 0 ? { visibility: 'hidden' } : {}}
              onClick={increaseMonth}
            >
              <IoIosArrowForward />
            </button>
          </div>
        )}
      />
      <TiCalendar className='pointer-events-none z-10' />
    </div>
  );
};

export default Calendar;
