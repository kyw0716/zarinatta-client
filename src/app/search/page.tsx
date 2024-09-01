'use client';

import Image from 'next/image';
import { Flex, Select } from 'antd';
import DatePicker, { Month } from '@/components/date-picker/DatePicker';
import { Suspense, useState } from 'react';
import dayjs from 'dayjs';
import Margin from '@/components/design-system/Margin';
import Text from '@/components/design-system/Text';
import { color } from '@/components/design-system/Color';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';

type Stations = 'KTX' | 'SRT' | 'ITX';

const stationSearchOptions: Record<'label' | 'value', Stations>[] = [
  {
    label: 'KTX',
    value: 'KTX',
  },
  {
    label: 'SRT',
    value: 'SRT',
  },
  {
    label: 'ITX',
    value: 'ITX',
  },
];

const departTimeValues = Array.from({ length: 24 }).map(
  (_, i) => `${String(i).padStart(2, '0')}00`
);
const departTimeLabels = Array.from({ length: 24 }).map(
  (_, i) => `${String(i).padStart(2, '0')}:00시 이후`
);

const departTimeSearchOptions: Record<
  'label' | 'value',
  (typeof departTimeLabels)[number] | (typeof departTimeValues)[number]
>[] = departTimeLabels.map((label, index) => ({
  label,
  value: departTimeValues[index],
}));

const getSearchURLFromObject = (object?: Record<string, string | number>) => {
  if (object === undefined) return '';

  const queryParams: string[] = [];

  Object.entries(object).forEach(([key, value]) => {
    queryParams.push(`${key}=${encodeURIComponent(value)}`);
  });

  return queryParams.join('&');
};

const coreSearchParamKeys = [
  'departStation',
  'arriveStation',
  'departTime',
  'departDate',
  'trainType',
];
const searchParamKeys = [...coreSearchParamKeys, 'searchKeyword', 'isModalOpen', 'page', 'size'];

const getSearchParamsObject = (searchParams: ReadonlyURLSearchParams) => {
  const searchParamsObject: Record<(typeof searchParamKeys)[number], string> = {};

  searchParamKeys.forEach((key) => {
    const value = searchParams.get(key);

    if (value !== null) {
      searchParamsObject[key] = value;
    }
  });

  return searchParamsObject;
};

export default function SearchPage() {
  const searchParams = getSearchParamsObject(useSearchParams());
  const router = useRouter();
  const [currentMonthSelectedDate, setCurrentMonthSelectedDate] = useState<number>(
    Number(searchParams['departDate'] ?? dayjs().date())
  );
  const [nextMonthSelectedDate, setNextMonthSelectedDate] = useState<number>(-1);

  const isAllRequiredFieldSelected = coreSearchParamKeys.every((key) =>
    Object.keys(searchParams).includes(key)
  );
  const currentMonth = dayjs().month() + 1;
  const nextMonth = currentMonth + 1;

  const isCurrentMonthSelected = currentMonthSelectedDate !== -1;
  // 추후 API 호출에 사용될 값
  const selectedMonth = isCurrentMonthSelected ? currentMonthSelectedDate : nextMonthSelectedDate;
  const selectedDate = isCurrentMonthSelected ? currentMonthSelectedDate : nextMonthSelectedDate;

  const onSelectDate = (month: number, date: number) => {
    if (month === currentMonth) {
      setCurrentMonthSelectedDate(date);
      setNextMonthSelectedDate(-1);
      return;
    }
    setNextMonthSelectedDate(date);
    setCurrentMonthSelectedDate(-1);
  };

  return (
    <Suspense>
      <Flex vertical align="center">
        <Flex justify="center" style={{ width: '100vw', backgroundColor: 'white' }}>
          <Image src="/banner.svg" alt="자리나따 배너 이미지" width={1280} height={387} />
        </Flex>
        <Margin vertical size={25} />
        <Flex vertical justify="center" style={{ width: 1024 }}>
          <Flex
            justify="space-between"
            style={{ padding: '32px 62px', backgroundColor: 'white', borderRadius: 20 }}
          >
            <DatePicker
              year={dayjs().year()}
              selectedDate={currentMonthSelectedDate}
              setSelectedDate={(date) => {
                onSelectDate(currentMonth, date);
                // TODO: 날짜 입력값 변경시 searchParams에 반영되도록 하기
                // TODO: 날짜 입력값 선택 해제시 searchParams에도 제거되도록 하기
                router.push(
                  `/search?${getSearchURLFromObject({ ...searchParams, departDate: date })}`,
                  { scroll: false }
                );
              }}
              startMonth={currentMonth as Month}
            />
            <DatePicker
              year={2024}
              selectedDate={nextMonthSelectedDate}
              setSelectedDate={(date) => {
                onSelectDate(nextMonth, date);
                // TODO: 날짜 입력값 변경시 searchParams에 반영되도록 하기
                // TODO: 날짜 입력값 선택 해제시 searchParams에도 제거되도록 하기
                router.push(
                  `/search?${getSearchURLFromObject({ ...searchParams, departDate: date })}`,
                  { scroll: false }
                );
              }}
              startMonth={nextMonth as Month}
            />
          </Flex>
          <Margin vertical size={20} />
          {/* TODO: selectComponent 각각 만들기 */}
          <Flex justify="space-between">
            <SearchMenu
              icon="start-station"
              title="출발하시는 역을 선택해주세요."
              selectComponent={<></>}
            />
            <SearchMenu
              icon="end-station"
              title="도착하시는 역을 선택해주세요."
              selectComponent={<></>}
            />
          </Flex>
          <Margin vertical size={20} />
          <Flex justify="space-between" style={{ width: 1024 }}>
            <SearchMenu
              icon="train"
              title="기차 종류를 선택해주세요."
              selectComponent={
                <Select
                  variant="borderless"
                  defaultValue={searchParams['trainType']}
                  options={stationSearchOptions}
                  onSelect={(value) =>
                    router.push(
                      `/search?${getSearchURLFromObject({ ...searchParams, trainType: value })}`,
                      { scroll: false }
                    )
                  }
                  style={{ borderBottom: `2px solid ${color['gray300']}` }}
                />
              }
            />
            <SearchMenu
              icon="clock"
              title="출발 시간을 선택해주세요."
              selectComponent={
                <Select
                  variant="borderless"
                  defaultValue={searchParams['departTime']}
                  options={departTimeSearchOptions}
                  onSelect={(value) =>
                    router.push(
                      `/search?${getSearchURLFromObject({ ...searchParams, departTime: value })}`,
                      { scroll: false }
                    )
                  }
                  style={{ borderBottom: `2px solid ${color['gray300']}` }}
                />
              }
            />
          </Flex>
          <Margin vertical size={60} />
        </Flex>
        {/* TODO: 버튼 비활성화 조건 설정 및 색상 분기 처리 */}
        <Flex
          justify="center"
          align="center"
          component={'button'}
          style={{
            width: 608,
            height: 54,
            borderRadius: 8,
            backgroundColor: color[isAllRequiredFieldSelected ? 'primary500' : 'primary100'],
            border: 'none',
          }}
          onClick={() => alert('열차조회하기 눌렀음')}
        >
          <Text type="semiBold-20" colorType={isAllRequiredFieldSelected ? 'white' : 'primary200'}>
            열차 조회하기
          </Text>
        </Flex>
        <Margin vertical size={197} />
      </Flex>
    </Suspense>
  );
}

const SearchMenu = ({
  icon,
  title,
  selectComponent,
}: {
  icon: 'start-station' | 'end-station' | 'clock' | 'train';
  title: string;
  selectComponent: JSX.Element;
}) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        width: 502,
        height: 182,
        padding: '28px 20px',
        backgroundColor: 'white',
        borderRadius: 20,
      }}
    >
      <Image src={`/${icon}.svg`} alt="검색 메뉴 아이콘" width={106} height={106} />
      <Flex vertical justify="space-between" style={{ width: 335, height: 88 }}>
        <Text type="semiBold-20">{title}</Text>
        {selectComponent}
      </Flex>
    </Flex>
  );
};
