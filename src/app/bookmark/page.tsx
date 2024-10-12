'use client';

import { TrainTypeChip } from '@/components/chip/TrainTypeChip';
import { color } from '@/components/design-system/Color';
import Margin from '@/components/design-system/Margin';
import Text from '@/components/design-system/Text';
import { useBookmarkQuery, useDeleteBookmarkMutation } from '@/hooks/query/use-bookmark-query';
import { Bookmark } from '@/type';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { Flex, Table, TableProps } from 'antd';
import { AxiosResponse } from 'axios';
import { useState } from 'react';

const getColumns = (
  deleteBookmark: UseMutateFunction<AxiosResponse<any, any>, Error, number | undefined, unknown>
) => {
  const columns: TableProps<Bookmark>['columns'] = [
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
      title: '날짜',
      dataIndex: 'departDate',
      key: 'departDate',
      render: (_, { departDate }) => {
        return (
          <Text type="regular-16" colorType="gray700">
            {departDate}
          </Text>
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
      render: (_, bookmark) => {
        return (
          <Flex gap={12}>
            <Flex
              style={{
                padding: '4px 12px',
                backgroundColor: color['gray50'],
                color: color['primary500'],
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              성공
            </Flex>
            <Flex
              style={{
                padding: '4px 12px',
                backgroundColor: color['gray50'],
                color: '#FF9393',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              실패
            </Flex>
            <Flex
              style={{
                padding: '4px 12px',
                backgroundColor: color['gray50'],
                color: color['gray950'],
                borderRadius: 8,
                cursor: 'pointer',
              }}
              onClick={() => deleteBookmark(bookmark.bookmarkId)}
            >
              찜 해제
            </Flex>
          </Flex>
        );
      },
    },
  ];

  return columns;
};

export default function BookmarkPage() {
  const [expire, setExpired] = useState(false);
  const queryClient = useQueryClient();
  const { data: bookmarkList } = useBookmarkQuery(expire);
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation(() =>
    queryClient.invalidateQueries({ queryKey: ['bookmarkQuery', expire] })
  );

  return (
    <Flex vertical>
      <Flex>
        <Text
          type="semiBold-24"
          colorType={expire ? 'gray400' : 'gray950'}
          style={{ cursor: 'pointer' }}
          onClick={() => setExpired(false)}
        >
          찜한자리
        </Text>
        <Margin horizontal size={32} />
        <Text
          type="semiBold-24"
          colorType={expire ? 'gray950' : 'gray400'}
          style={{ cursor: 'pointer' }}
          onClick={() => setExpired(true)}
        >
          만료된 자리
        </Text>
      </Flex>
      <Margin vertical size={36} />
      <Table
        style={{ width: 1140 }}
        columns={getColumns(deleteBookmark)}
        dataSource={bookmarkList?.responseList.map((bookmark) => ({
          ...bookmark,
          departDate: `${bookmark.departDate.slice(0, 4)}-${bookmark.departDate.slice(4, 6)}-${bookmark.departDate.slice(6)}`,
          departTime: `${bookmark.departTime.slice(8, 10)}:${bookmark.departTime.slice(10, 12)}`,
          arriveTime: `${bookmark.arriveTime.slice(8, 10)}:${bookmark.arriveTime.slice(10, 12)}`,
        }))}
        pagination={{ position: ['none', 'bottomCenter'] }}
      />
    </Flex>
  );
}
