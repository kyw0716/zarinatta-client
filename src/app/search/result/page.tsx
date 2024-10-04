'use client';

import { useSearchStationByDate } from '@/hooks/query/use-search-station-by-date-query';
import { getSearchParamsObject, getSearchURLFromObject } from '@/utils/search-params';
import { Flex } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useCreateBookmarkMutation } from '../../../hooks/query/use-create-bookmark';

export default function SearchResultPage() {
  const searchURL = getSearchURLFromObject(getSearchParamsObject(useSearchParams()));
  const { data, isLoading } = useSearchStationByDate(searchURL);
  const { mutate: createBookmark } = useCreateBookmarkMutation();

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div>
      {data?.responseList.map(
        ({ arriveStation, arriveTime, departStation, departTime, ticketId, ticketType }) => (
          <Flex key={ticketId} gap={30}>
            <span>{ticketType}</span>
            <span>{departTime}</span>
            <span>{arriveTime}</span>
            <span>{departStation}</span>
            <span>{arriveStation}</span>
            <button
              onClick={() =>
                createBookmark({
                  ticketId,
                  wantBabySeat: 'SEAT',
                  wantFirstClass: true,
                  wantNormalSeat: 'SEAT',
                  wantWaitingReservation: true,
                })
              }
            >
              즐겨찾기 버튼
            </button>
          </Flex>
        )
      )}
    </div>
  );
}
