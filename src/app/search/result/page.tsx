'use client';

import { useSearchStationByDate } from '@/hooks/query/use-search-station-by-date-query';
import { getSearchParamsObject, getSearchURLFromObject } from '@/utils/search-params';
import { Flex } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useCreateBookmarkMutation } from '../../../hooks/query/use-create-bookmark';
import {
  useDeleteBookmarkMutation,
  useBookmarkedTicketListQuery,
} from '@/hooks/query/use-bookmark-query';
import { useQueryClient } from '@tanstack/react-query';

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
    <div>
      {searchedStations?.responseList.map(
        ({ arriveStation, arriveTime, departStation, departTime, ticketId, ticketType }) => {
          const isBookmarked =
            bookmarkedTicketList?.find(({ ticketId: t }) => t === ticketId) !== undefined;
          return (
            <Flex key={ticketId} gap={30}>
              <span>{ticketType}</span>
              <span>{departTime}</span>
              <span>{arriveTime}</span>
              <span>{departStation}</span>
              <span>{arriveStation}</span>
              <button
                onClick={() =>
                  isBookmarked
                    ? deleteBookmark(
                        bookmarkedTicketList?.find(({ ticketId: t }) => t === ticketId)?.bookmarkId
                      )
                    : createBookmark({
                        ticketId,
                        wantBabySeat: 'SEAT',
                        wantFirstClass: true,
                        wantNormalSeat: 'SEAT',
                        wantWaitingReservation: true,
                      })
                }
              >
                {isBookmarked ? '즐겨찾기 삭제' : '즐겨찾기 버튼'}
              </button>
            </Flex>
          );
        }
      )}
    </div>
  );
}
