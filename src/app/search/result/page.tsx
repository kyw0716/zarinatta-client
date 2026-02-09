'use client';

import { useSearchStationByDate } from '@/hooks/query/use-search-station-by-date-query';
import { getSearchParamsObject, getSearchURLFromObject } from '@/utils/search-params';
import { Flex, Table, TableProps } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useCreateBookmarkMutation } from '../../../hooks/query/use-create-bookmark';
import {
  useDeleteBookmarkMutation,
  useBookmarkedTicketListQuery,
} from '@/hooks/query/use-bookmark-query';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { TicketTableColumns } from '@/type';
import Image from 'next/image';
import { AxiosResponse } from 'axios';
import Margin from '@/components/design-system/Margin';
import { color } from '@/components/design-system/Color';
import Text from '@/components/design-system/Text';
import { useSearchRouter } from '@/hooks/use-search-router';
import { useModalStore } from '@/hooks/use-modal-store';
import { ReactNode } from 'react';
import BookmarkModal from '@/components/modal/BookmarkModal';
import PhoneNumberInputModal from '@/components/modal/PhoneNumberInputModal';
import { TrainTypeChip } from '@/components/chip/TrainTypeChip';
import { useUserMeQuery, useLoginRedirectCodeQuery } from '@/hooks/query/use-login';
import { SessionStorage } from '@/utils/sessionStorage';
import { useRouter } from 'next/navigation';

const getColumns = (
  deleteBookmark: UseMutateFunction<AxiosResponse<any, any>, Error, number | undefined, unknown>,
  onEmptyBookmarkClick: (ticket: TicketTableColumns) => void,
  departDate: string
) => {
  const columns: TableProps<TicketTableColumns>['columns'] = [
    {
      title: '열차종류',
      dataIndex: 'ticketType',
      key: 'ticketType',
      width: 356,
      render: (_, { ticketType }) => {
        const [trainName, trainNumber] = ticketType.split(' ');

        return (
          <Flex gap={6}>
            <TrainTypeChip text={trainName} />
            <TrainTypeChip text={trainNumber} />
          </Flex>
        );
      },
    },
    {
      title: '출발시간',
      dataIndex: 'departTime',
      key: 'departTime',
      render: (_, { departTime }) => {
        return (
          <Text type="regular-20" colorType="gray950">
            {departTime}
          </Text>
        );
      },
    },
    {
      title: '도착시간',
      dataIndex: 'arriveTime',
      key: 'arriveTime',
      render: (_, { arriveTime }) => {
        return (
          <Text type="regular-20" colorType="gray950">
            {arriveTime}
          </Text>
        );
      },
    },
    {
      title: '출발역',
      dataIndex: 'departStation',
      key: 'departStation',
      render: (_, { departStation }) => {
        return (
          <Text type="regular-16" colorType="gray700">
            {departStation}
          </Text>
        );
      },
    },
    {
      title: '도착역',
      dataIndex: 'arriveStation',
      key: 'arriveStation',
      render: (_, { arriveStation }) => {
        return (
          <Text type="regular-16" colorType="gray700">
            {arriveStation}
          </Text>
        );
      },
    },
    {
      dataIndex: 'bookmarkId',
      key: 'bookmarkId',
      render: (_, ticket) => {
        if (ticket.bookmarkId !== null)
          return (
            <Image
              src={'/filled-star.svg'}
              alt="이미 북마크 된 티켓 이모지"
              width={26}
              height={25}
              onClick={() => {
                if (ticket.bookmarkId === null) return;
                deleteBookmark(ticket.bookmarkId);
              }}
              style={{ cursor: 'pointer' }}
            />
          );
        return (
          <Image
            src={'/empty-star.svg'}
            alt="아직 북마크 안된 티켓 이모지"
            width={26}
            height={25}
            onClick={(e) => {
              e.stopPropagation();
              onEmptyBookmarkClick(ticket);
            }}
            style={{ cursor: 'pointer' }}
          />
        );
      },
    },
  ];

  return columns;
};

interface TrainSearchButtonProps {
  isSelected: boolean;
  handleClick: () => void;
  content: string;
}

const TrainSearchButton = ({ isSelected, handleClick, content }: TrainSearchButtonProps) => {
  return (
    <Flex
      style={{
        width: 100,
        height: 40,
        borderRadius: 8,
        cursor: 'pointer',
        backgroundColor: isSelected ? color['primary500'] : 'white',
      }}
      justify="center"
      align="center"
      onClick={handleClick}
    >
      <Text type="semiBold-16" colorType={isSelected ? 'white' : 'gray900'}>
        {content}
      </Text>
    </Flex>
  );
};

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchURL = getSearchURLFromObject(getSearchParamsObject(searchParams));

  const queryClient = useQueryClient();
  const { data: userData } = useUserMeQuery();
  const { data: redirectUri } = useLoginRedirectCodeQuery();
  const { data: searchedStations } = useSearchStationByDate(searchURL);
  const { data: bookmarkedTicketList } = useBookmarkedTicketListQuery(
    searchedStations?.responseList.map(({ ticketId }) => ticketId)
  );
  const { mutate: createBookmark } = useCreateBookmarkMutation(() =>
    queryClient.invalidateQueries({
      queryKey: [
        'bookmarkedTicketListQuery',
        searchedStations?.responseList.map(({ ticketId }) => ticketId),
      ],
    })
  );
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation(() =>
    queryClient.invalidateQueries({
      queryKey: [
        'bookmarkedTicketListQuery',
        searchedStations?.responseList.map(({ ticketId }) => ticketId),
      ],
    })
  );

  const openModal = useModalStore((state) => state.openModal);
  const { routeSearchResultPageWithParams, routeSearchResultPageWithoutParams } = useSearchRouter();

  const handleEmptyBookmarkClick = (ticket: TicketTableColumns) => {
    if (userData === undefined) {
      if (redirectUri === undefined) return;
      SessionStorage.set('pathNameBeforeClickLoginButton', window.location.pathname + window.location.search);
      router.push(redirectUri);
      return;
    }
    if (userData.phoneNumber === null) {
      alert('전화번호 입력이 필요한 기능입니다.\n전화번호를 입력해주세요.');
      openModal(<PhoneNumberInputModal />);
      return;
    }
    openModal(<BookmarkModal ticket={ticket} departDate={searchParams.get('departDate') ?? ''} />);
  };

  return (
    <Flex vertical>
      <Margin vertical size={44} />
      <Flex gap={16}>
        <TrainSearchButton
          isSelected={searchParams.get('trainType') === null}
          handleClick={() => routeSearchResultPageWithoutParams('trainType')}
          content="전체 열차"
        />
        <TrainSearchButton
          isSelected={searchParams.get('trainType') === 'KTX'}
          handleClick={() => routeSearchResultPageWithParams({ trainType: 'KTX' })}
          content="KTX"
        />
        <TrainSearchButton
          isSelected={searchParams.get('trainType') === 'ITX'}
          handleClick={() => routeSearchResultPageWithParams({ trainType: 'ITX' })}
          content="ITX"
        />
        <TrainSearchButton
          isSelected={searchParams.get('trainType') === 'SRT'}
          handleClick={() => routeSearchResultPageWithParams({ trainType: 'SRT' })}
          content="SRT"
        />
      </Flex>
      <Margin vertical size={28} />
      <Table
        style={{ width: 1140 }}
        columns={getColumns(deleteBookmark, handleEmptyBookmarkClick, searchParams.get('departDate') ?? '')}
        dataSource={searchedStations?.responseList.map((station) => ({
          ...station,
          departTime: `${station.departTime.slice(8, 10)}:${station.departTime.slice(10, 12)}`,
          arriveTime: `${station.arriveTime.slice(8, 10)}:${station.arriveTime.slice(10, 12)}`,
          bookmarkId:
            bookmarkedTicketList?.find(({ ticketId }) => ticketId === station.ticketId)
              ?.bookmarkId ?? null,
        }))}
        pagination={{ position: ['none', 'bottomCenter'] }}
      />
    </Flex>
  );
}
