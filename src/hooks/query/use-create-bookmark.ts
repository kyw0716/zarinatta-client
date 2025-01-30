import { BookmarkRequestParams } from '@/type';
import { ZarinattaAxios } from '@/utils/axios/ZarinattaInstance';
import { useMutation } from '@tanstack/react-query';

export const useCreateBookmarkMutation = (refetchIsBookmarkedList: () => void) =>
  useMutation({
    mutationFn: (requestParams: BookmarkRequestParams) =>
      ZarinattaAxios.securedApiInstance.post('/v1/bookmark/create', requestParams),
    onSuccess: refetchIsBookmarkedList,
  });
