import { ZarinattaAxios } from '@/utils/axios/ZarinattaInstance';
import { useMutation } from '@tanstack/react-query';

export const usePhoneNumberInput = () =>
  useMutation({
    mutationFn: (phoneNumber: string) =>
      ZarinattaAxios.securedApiInstance.post('/v1/users/phone', {
        countryCode: '+82',
        content: phoneNumber,
      }),
    onSuccess: (response) => {
      console.log(response);
    },
  });
