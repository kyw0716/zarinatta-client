import { API_END_POINT } from '@/static/api';
import { BookmarkRequestParams } from '@/type';
import { useMutation } from '@tanstack/react-query';

export const useCreateBookmarkMutation = () =>
  useMutation({
    mutationFn: (requestParams: BookmarkRequestParams) =>
      fetch(`${API_END_POINT}/v1/bookmark/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestParams),
        credentials: 'include',
      }),
  });
