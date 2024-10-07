'use client';

import Image from 'next/image';
import { Flex, Select } from 'antd';
import DatePicker, { Month } from '@/components/date-picker/DatePicker';
import { CSSProperties, useState } from 'react';
import dayjs from 'dayjs';
import Margin from '@/components/design-system/Margin';
import Text from '@/components/design-system/Text';
import { color } from '@/components/design-system/Color';
import { useSearchParams } from 'next/navigation';
import {
  coreSearchParamKeys,
  getSearchParamsObject,
  getSearchURLFromObject,
} from '@/utils/search-params';
import { useSearchRouter } from '@/hooks/use-search-router';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/hooks/use-modal-store';
import StationSearchModal from '@/components/modal/StationSearchModal';

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

export default function SearchPage() {
  const router = useRouter();
  const searchParams = getSearchParamsObject(useSearchParams());
  const month = Number(searchParams['departDate']?.slice(4, 6));
  const date = Number(searchParams['departDate']?.slice(6));
  const isAllRequiredFieldSelected = coreSearchParamKeys.every((key) =>
    Object.keys(searchParams).includes(key)
  );

  const { routeSearchPageWithParams, routeSearchPageWithoutParams } = useSearchRouter();

  const [currentMonthSelectedDate, setCurrentMonthSelectedDate] = useState<number>(
    month === dayjs().month() + 1 ? date : -1
  );
  const [nextMonthSelectedDate, setNextMonthSelectedDate] = useState<number>(
    month === dayjs().month() + 2 ? date : -1
  );

  const currentMonth = dayjs().month() + 1;
  const nextMonth = currentMonth + 1 > 12 ? 1 : currentMonth + 1;

  const openModal = useModalStore(({ openModal }) => openModal);

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
              if (date === -1) {
                routeSearchPageWithoutParams('departDate');
                return;
              }
              routeSearchPageWithParams({ departDate: dayjs().date(date).format('YYYYMMDD') });
            }}
            startMonth={currentMonth as Month}
          />
          <DatePicker
            year={currentMonth === 12 ? dayjs().year() + 1 : dayjs().year()}
            selectedDate={nextMonthSelectedDate}
            setSelectedDate={(date) => {
              onSelectDate(nextMonth, date);
              if (date === -1) {
                routeSearchPageWithoutParams('departDate');
                return;
              }
              routeSearchPageWithParams({
                departDate: dayjs()
                  .month(nextMonth - 1)
                  .date(date)
                  .format('YYYYMMDD'),
              });
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
            selectComponent={
              <Flex
                align="center"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal(<StationSearchModal departOrArrive="depart" />);
                }}
                style={{
                  height: 30,
                  borderBottom: `2px solid ${color['gray300']}`,
                  padding: '0 11px',
                }}
              >
                {searchParams['departStation'] ?? <Text colorType={'gray300'}>역 검색</Text>}
              </Flex>
            }
          />
          <SearchMenu
            icon="end-station"
            title="도착하시는 역을 선택해주세요."
            selectComponent={
              <Flex
                align="center"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal(<StationSearchModal departOrArrive="arrive" />);
                }}
                style={{
                  height: 30,
                  borderBottom: `2px solid ${color['gray300']}`,
                  padding: '0 11px',
                }}
              >
                {searchParams['arriveStation'] ?? <Text colorType={'gray300'}>역 검색</Text>}
              </Flex>
            }
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
                onSelect={(value) => routeSearchPageWithParams({ trainType: value })}
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
                onSelect={(value) => routeSearchPageWithParams({ departTime: value })}
                style={{ borderBottom: `2px solid ${color['gray300']}` }}
              />
            }
          />
        </Flex>
        <Margin vertical size={60} />
      </Flex>
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
          cursor: 'pointer',
        }}
        onClick={() => router.push(`/search/result?${getSearchURLFromObject(searchParams)}`)}
      >
        <Text type="semiBold-20" colorType={isAllRequiredFieldSelected ? 'white' : 'primary200'}>
          열차 조회하기
        </Text>
      </Flex>
      <Margin vertical size={197} />
    </Flex>
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
  style?: CSSProperties;
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
        cursor: 'pointer',
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
