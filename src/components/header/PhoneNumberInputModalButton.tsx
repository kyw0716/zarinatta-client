'use client';

import { useModalStore } from '@/hooks/use-modal-store';
import PhoneNumberInputModal from '../modal/PhoneNumberInputModal';
import { useQueryClient } from '@tanstack/react-query';

export default function PhoneNumberInputModalButton() {
  const queryClient = useQueryClient();
  const loginData = queryClient.getQueryData(['loginQuery']);

  const { openModal } = useModalStore();

  if (loginData === undefined) return <></>;

  return (
    <span
      style={{ cursor: 'pointer' }}
      onClick={(e) => {
        openModal(<PhoneNumberInputModal />);
        e.stopPropagation();
      }}
    >
      전화번호 입력
    </span>
  );
}
