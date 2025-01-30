import { BookmarkResponse, BookmarkedTicket } from '@/type';
import { ZarinattaAxios } from '@/utils/axios/ZarinattaInstance';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useBookmarkQuery = (expire: boolean) =>
  useQuery<BookmarkResponse>({
    queryKey: ['bookmarkQuery', expire],
    queryFn: async () =>
      (
        await ZarinattaAxios.securedApiInstance.get(
          `/v1/bookmark/list?expire=${expire}&page=0&size=50`
        )
      ).data,
    retry: false,
  });

export const useDeleteBookmarkMutation = (refetchBookmark: () => void) =>
  useMutation({
    mutationFn: (bookmarkId?: number) =>
      ZarinattaAxios.securedApiInstance.delete(`/v1/bookmark/delete/${bookmarkId}`),
    onSuccess: refetchBookmark,
  });

export const useBookmarkedTicketListQuery = (ticketIds?: number[]) =>
  useQuery<BookmarkedTicket[]>({
    queryKey: ['bookmarkedTicketListQuery', ticketIds],
    queryFn: async () => {
      if (ticketIds === undefined) return [];
      return (
        await ZarinattaAxios.securedApiInstance.get(
          `/v1/bookmark/search?ticketIds=${ticketIds.join(',')}`
        )
      ).data;
    },
  });
