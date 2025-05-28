import { ZarinattaAxios } from '@/utils/axios/ZarinattaInstance';
import { useMutation } from '@tanstack/react-query';

export const usePhoneNumberInput = (onSuccess?: () => void) =>
  useMutation({
    mutationFn: (phoneNumber: string) =>
      ZarinattaAxios.securedApiInstance.post('/v1/users/phone', {
        countryCode: '+82',
        phoneNumber: phoneNumber,
      }),
    onSuccess: () => {
      alert('전화번호 등록이 완료되었습니다!');
      onSuccess?.();
    },
  });
