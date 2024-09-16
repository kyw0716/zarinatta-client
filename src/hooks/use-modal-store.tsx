import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalInterface {
  content: ReactNode;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalInterface>((set) => ({
  content: null,
  openModal: (content: ReactNode) => set(() => ({ content })),
  closeModal: () => set(() => ({ content: null })),
}));
