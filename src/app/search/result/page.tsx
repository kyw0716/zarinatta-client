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
import { BookmarkRequestParams, TicketTableColumns } from '@/type';
import Image from 'next/image';
import { AxiosResponse } from 'axios';

const getColumns = (
  createBookmark: UseMutateFunction<AxiosResponse<any, any>, Error, BookmarkRequestParams, unknown>,
  deleteBookmark: UseMutateFunction<AxiosResponse<any, any>, Error, number | undefined, unknown>
) => {
  const columns: TableProps<TicketTableColumns>['columns'] = [
    {
      title: '열차종류',
      dataIndex: 'ticketType',
      key: 'ticketType',
    },
    {
      title: '출발시간',
      dataIndex: 'departTime',
      key: 'departTime',
    },
    {
      title: '도착시간',
      dataIndex: 'arriveTime',
      key: 'arriveTime',
    },
    {
      title: '출발역',
      dataIndex: 'departStation',
      key: 'departStation',
    },
    {
      title: '도착역',
      dataIndex: 'arriveStation',
      key: 'arriveStation',
    },
    {
      dataIndex: 'bookmarkId',
      key: 'bookmarkId',
      render: (_, { bookmarkId, ticketId }) => {
        if (bookmarkId !== null)
          return (
            <Image
              src={'/filled-star.svg'}
              alt="이미 북마크 된 티켓 이모지"
              width={26}
              height={25}
              onClick={() => deleteBookmark(bookmarkId)}
              style={{ cursor: 'pointer' }}
            />
          );
        return (
          <Image
            src={'/empty-star.svg'}
            alt="아직 북마크 안된 티켓 이모지"
            width={26}
            height={25}
            onClick={() =>
              createBookmark({
                ticketId: ticketId,
                wantBabySeat: 'SEAT',
                wantFirstClass: true,
                wantNormalSeat: 'SEAT',
                wantWaitingReservation: true,
              })
            }
            style={{ cursor: 'pointer' }}
          />
        );
      },
    },
  ];

  return columns;
};

export default function SearchResultPage() {
  const searchURL = getSearchURLFromObject(getSearchParamsObject(useSearchParams()));
  const queryClient = useQueryClient();
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

  return (
    <Flex>
      <Table
        style={{ width: 1140 }}
        columns={getColumns(createBookmark, deleteBookmark)}
        dataSource={searchedStations?.responseList.map((station) => ({
          ...station,
          departTime: `${station.departTime.slice(8, 10)}:${station.departTime.slice(10, 12)}`,
          arriveTime: `${station.arriveTime.slice(8, 10)}:${station.arriveTime.slice(10, 12)}`,
          bookmarkId:
            bookmarkedTicketList?.find(({ ticketId }) => ticketId === station.ticketId)
              ?.bookmarkId ?? null,
        }))}
        pagination={{ position: ['none'] }}
      />
    </Flex>
  );
}
