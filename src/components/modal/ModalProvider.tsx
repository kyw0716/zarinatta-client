'use client';

import { useModalStore } from '@/hooks/use-modal-store';
import { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ModalProvider({ children }: PropsWithChildren) {
  const modalContent = useModalStore((state) => state.content);
  const closeModal = useModalStore((state) => state.closeModal);

  useEffect(() => {
    if (modalContent !== null) {
      window.addEventListener('click', closeModal);
    } else {
      window.removeEventListener('click', closeModal);
    }
  }, [modalContent]);

  return (
    <>
      {children}
      {modalContent !== null && (
        <>
          <div
            style={{
              width: '100vw',
              height: '100vh',
              position: 'fixed',
              top: 0,
              left: 0,
              backgroundColor: '#00000066',
              zIndex: 99,
            }}
          />
          {createPortal(modalContent, document.body)}
        </>
      )}
    </>
  );
}
