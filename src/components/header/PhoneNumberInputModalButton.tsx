'use client';

import { useModalStore } from '@/hooks/use-modal-store';
import PhoneNumberInputModal from '../modal/PhoneNumberInputModal';

export default function PhoneNumberInputModalButton() {
  const { openModal } = useModalStore();

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
