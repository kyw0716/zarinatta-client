'use client';

import { useModalStore } from '@/hooks/use-modal-store';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export default function ModalProvider({ children }: PropsWithChildren) {
  const modalContent = useModalStore((state) => state.content);

  return (
    <>
      {children}
      {modalContent !== null && createPortal(modalContent, document.body)}
    </>
  );
}
