import { ZarinattaAxios } from '@/utils/axios/ZarinattaInstance';
import { useMutation } from '@tanstack/react-query';

export const useFillMockData = () =>
  useMutation({
    mutationFn: () => ZarinattaAxios.securedApiInstance.post('/v1/ticket/mock'),
  });
