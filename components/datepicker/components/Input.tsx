import dayjs from 'dayjs';
import { useCallback, useContext, useEffect, useRef, type ChangeEvent, type FC } from 'react';

import { DatepickerContext } from '@/components/datepicker/const';
import { type InputProps } from '@/components/datepicker/type';
import { dateIsValid, parseFormattedDate } from '@/components/datepicker/utils';

const Input: FC<InputProps> = () => {
  const {
    period,
    dayHover,
    changeDayHover,
    calendarContainer,
    arrowContainer,
    inputText,
    changeInputText,
    changeDatepickerValue,
    asSingle,
    disabled,
    popoverDirection,
  } = useContext(DatepickerContext);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      const dates = [];

      if (asSingle) {
        const date = parseFormattedDate(inputValue);
        if (dateIsValid(date.toDate())) {
          dates.push(date.format('YYYY-MM-DD'));
        }
      }
      if (dates[0]) {
        changeDatepickerValue(
          {
            startDate: dates[0],
            endDate: dates[1] || dates[0],
          },
          e.target,
        );
        if (dates[1]) changeDayHover(dayjs(dates[1]).add(-1, 'day').format('YYYY-MM-DD'));
        else changeDayHover(dates[0]);
      }
      changeInputText(e.target.value);
    },
    [asSingle, changeDatepickerValue, changeDayHover, changeInputText],
  );

  useEffect(() => {
    const focusInput = (e: Event) => {
      e.stopPropagation();
      const input = inputRef.current;
      if (input) {
        input.focus();
        if (inputText) {
          changeInputText('');
          if (dayHover) {
            changeDayHover(null);
          }
          if (period.start && period.end) {
            changeDatepickerValue(
              {
                startDate: null,
                endDate: null,
              },
              input,
            );
          }
        }
      }
    };

    if (buttonRef?.current) {
      buttonRef?.current.addEventListener('click', focusInput);
    }

    return () => {
      if (buttonRef?.current) {
        buttonRef?.current.removeEventListener('click', focusInput);
      }
    };
  }, [changeDatepickerValue, changeDayHover, changeInputText, dayHover, inputText, period.end, period.start, inputRef]);

  useEffect(() => {
    const div = calendarContainer?.current;
    const input = inputRef.current;
    const arrow = arrowContainer?.current;

    const showCalendarContainer = () => {
      if (arrow && div && div.classList.contains('hidden')) {
        div.classList.remove('hidden');
        div.classList.add('block');
        requestAnimationFrame(() => {
          div.classList.remove('translate-y-4', 'opacity-0');
          div.classList.add('translate-y-0', 'opacity-1');
        });
      }
    };
    if (div && input) {
      input.addEventListener('focus', showCalendarContainer);
    }
    return () => {
      if (input) {
        input.removeEventListener('focus', showCalendarContainer);
      }
    };
  }, [calendarContainer, arrowContainer, popoverDirection]);

  return (
    <>
      <input
        className="w-60 border-2 p-2 rounded-md"
        ref={inputRef}
        type="text"
        disabled={disabled}
        placeholder="DD-MM-YYYY ~ DD-MM-YYYY"
        value={inputText}
        onChange={handleInputChange}
      />
    </>
  );
};

export default Input;