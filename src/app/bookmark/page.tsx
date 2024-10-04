'use client';

import Margin from '@/components/design-system/Margin';
import Text from '@/components/design-system/Text';
import { useBookmarkQuery, useDeleteBookmarkMutation } from '@/hooks/query/use-bookmark-query';
import { useQueryClient } from '@tanstack/react-query';
import { Flex } from 'antd';
import { useState } from 'react';

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
      {bookmarkList?.responseList.map(
        ({
          ticketId,
          ticketType,
          departDate,
          departTime,
          arriveTime,
          departStation,
          arriveStation,
          bookmarkId,
        }) => (
          <Flex gap={15} key={ticketId}>
            <span>{ticketType}</span>
            <span>{departDate}</span>
            <span>{departTime}</span>
            <span>{arriveTime}</span>
            <span>{departStation}</span>
            <span>{arriveStation}</span>
            <button
              onClick={() => {
                deleteBookmark(bookmarkId);
              }}
            >
              즐겨찾기 제거
            </button>
          </Flex>
        )
      )}
    </Flex>
  );
}
