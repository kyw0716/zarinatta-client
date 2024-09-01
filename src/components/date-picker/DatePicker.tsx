import { Flex } from 'antd';
import dayjs from 'dayjs';
import Text from '../design-system/Text';
import Margin from '../design-system/Margin';
import { useState } from 'react';
import { color } from '../design-system/Color';
import { useDatePicker } from '@/hooks/use-date-picker';

const DaysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

type Range<N extends number, Result extends Array<unknown> = []> = Result['length'] extends N
  ? Result[number] | N
  : Range<N, [...Result, Result['length']]>;

export type Date = Range<31> extends infer R ? Exclude<R, 0> : never;
export type Month = Range<12> extends infer R ? Exclude<R, 0> : never;

interface DatePickerCoreProps {
  year: number;
  startMonth?: Month;
  startDate?: Date;
  endMonth?: Month;
  endDate?: Date;
  multiple?: boolean;
}

interface SingleDatePickerProps extends DatePickerCoreProps {
  setSelectedDate: (selectedDate: number) => void;
  selectedDate: number;
  multiple?: false;
  maxCount?: undefined;
}

interface MultipleDatePickerProps extends DatePickerCoreProps {
  setSelectedDate: (selectedDate: number[]) => void;
  selectedDate: number[];
  multiple: true;
  maxCount?: number;
}

type DatePickerProps = SingleDatePickerProps | MultipleDatePickerProps;

export default function DatePicker({
  year = dayjs().year(),
  endMonth,
  startMonth = dayjs().month() as Month,
  startDate = dayjs().date() as Date,
  endDate,
  setSelectedDate,
  selectedDate,
  multiple,
  maxCount,
}: DatePickerProps) {
  // TODO: JSX에서 사용되는 값만 남기고 나머지 정리하기
  const { dateRows } = useDatePicker(year, startMonth, startDate);

  const selectDate = (date: number) => {
    if (multiple) {
      selectMultipleDate(date);
      return;
    }
    selectSingleDate(date);
  };

  const selectSingleDate = (date: number) => {
    if (multiple) return;

    if (selectedDate === date) {
      setSelectedDate(0);
      return;
    }
    setSelectedDate(date);
  };

  const selectMultipleDate = (date: number) => {
    if (!multiple) return;

    if (selectedDate.includes(date)) {
      setSelectedDate(selectedDate.filter((d) => d !== date));
      return;
    }

    // 최대 선택 가능 개수가 지정되면 더이상 날짜를 선택하지 않는다.
    if (maxCount !== undefined && maxCount <= selectedDate.length) return;

    setSelectedDate([...selectedDate, date]);
  };

  return (
    <Flex vertical>
      <Flex vertical>
        <Text type="bold-24">
          {year}년 {startMonth}월
        </Text>
        <Margin vertical size={24} />
        <Flex vertical>
          <Flex>
            {DaysOfWeek.map((date) => (
              <DateCell disabled blue={date === '일' || date === '토'} key={date}>
                {date}
              </DateCell>
            ))}
          </Flex>
          {dateRows.map((row, i) => (
            <Flex key={`date-picker-row-${i}`}>
              {row.map((col, j) => {
                return (
                  <DateCell
                    key={`date-picker-row-${i}-col-${j}`}
                    onClick={() => col !== 0 && selectDate(col)}
                    selected={
                      col === 0
                        ? false
                        : Array.isArray(selectedDate)
                          ? selectedDate.includes(col)
                          : selectedDate === col
                    }
                    disabled={col === 0}
                  >
                    {col === 0 ? '' : col}
                  </DateCell>
                );
              })}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

const DateCell = ({
  children,
  gray,
  blue,
  selected,
  disabled,
  onClick,
}: {
  children?: string | number;
  blue?: boolean;
  gray?: boolean;
  selected?: boolean;
  empty?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        width: 60,
        height: 60,
        borderRadius: selected ? 60 : 0,
        backgroundColor: selected ? color['primary500'] : 'white',
        cursor: disabled ? 'initial' : 'pointer',
      }}
      onMouseEnter={() => disabled || setHovered(true)}
      onMouseLeave={() => disabled || setHovered(false)}
      onClick={onClick}
    >
      <Text
        type="medium-20"
        colorType={
          blue
            ? 'primary500'
            : gray
              ? 'gray300'
              : selected
                ? 'white'
                : hovered
                  ? 'primary500'
                  : 'gray950'
        }
      >
        {children}
      </Text>
    </Flex>
  );
};
