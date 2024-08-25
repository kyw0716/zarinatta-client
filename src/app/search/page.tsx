'use client';

import Image from 'next/image';
import { PageProps } from '../../../.next/types/app/layout';
import { Flex } from 'antd';
import DatePicker, { Month } from '@/components/date-picker/DatePicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import Margin from '@/components/design-system/Margin';
import Text from '@/components/design-system/Text';
import { color } from '@/components/design-system/Color';

// TODO: startDate, endDate 얘네 특정한 포맷으로 받도록 타입 강제할지 고민해보기
// TODO: startTime 얘도
// TODO: isModalOpen 얘도
interface SearchPageSearchParams {
  // TODO: 열차 왕복 티켓도 지원하는지 확정되면 코드에 적용하기
  // isOneWay?: string;
  startDate?: string;
  endDate?: string;
  startLocation?: string;
  endLocation?: string;
  isModalOpen?: string;
  startTime?: string;
  searchKeyword?: string;
}

interface SearchPageParams extends PageProps {
  searchParams?: SearchPageSearchParams;
}

export default function SearchPage({ searchParams }: SearchPageParams) {
  const [currentMonthSelectedDate, setCurrentMonthSelectedDate] = useState<number>(-1);
  const [nextMonthSelectedDate, setNextMonthSelectedDate] = useState<number>(-1);

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
            year={2024}
            selectedDate={currentMonthSelectedDate}
            setSelectedDate={(date) => onSelectDate(currentMonth, date)}
            startMonth={currentMonth as Month}
          />
          <DatePicker
            year={2024}
            selectedDate={nextMonthSelectedDate}
            setSelectedDate={(date) => onSelectDate(nextMonth, date)}
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
          <SearchMenu icon="train" title="기차 종류를 선택해주세요." selectComponent={<></>} />
          <SearchMenu icon="clock" title="출발 시간을 선택해주세요." selectComponent={<></>} />
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
          backgroundColor: color['primary100'],
          border: 'none',
        }}
        onClick={() => alert('열차조회하기 눌렀음')}
      >
        <Text type="semiBold-20" colorType="primary200">
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
