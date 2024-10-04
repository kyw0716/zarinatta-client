import { API_END_POINT } from '@/static/api';
import { BookmarkRequestParams } from '@/type';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateBookmarkMutation = (refetchIsBookmarkedList: () => void) =>
  useMutation({
    mutationFn: (requestParams: BookmarkRequestParams) =>
      axios.post(`${API_END_POINT}/v1/bookmark/create`, requestParams, { withCredentials: true }),
    onSuccess: refetchIsBookmarkedList,
  });
