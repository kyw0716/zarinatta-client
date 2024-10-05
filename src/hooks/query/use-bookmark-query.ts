import { API_END_POINT } from '@/static/api';
import { BookmarkResponse, BookmarkedTicket } from '@/type';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useBookmarkQuery = (expire: boolean) =>
  useQuery<BookmarkResponse>({
    queryKey: ['bookmarkQuery', expire],
    queryFn: async () =>
      (
        await axios.get(`${API_END_POINT}/v1/bookmark/list?expire=${expire}&page=0&size=10`, {
          withCredentials: true,
        })
      ).data,
    retry: false,
  });

export const useDeleteBookmarkMutation = (refetchBookmark: () => void) =>
  useMutation({
    mutationFn: (bookmarkId?: number) =>
      axios.delete(`${API_END_POINT}/v1/bookmark/delete/${bookmarkId}`, { withCredentials: true }),
    onSuccess: refetchBookmark,
  });

export const useBookmarkedTicketListQuery = (ticketIds?: number[]) =>
  useQuery<BookmarkedTicket[]>({
    queryKey: ['bookmarkedTicketListQuery', ticketIds],
    queryFn: async () => {
      if (ticketIds === undefined) return [];
      return (
        await axios.get(`${API_END_POINT}/v1/bookmark/search?ticketIds=${ticketIds.join(',')}`, {
          withCredentials: true,
        })
      ).data;
    },
  });
