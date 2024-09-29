import { create } from 'zustand';

export interface UserInformation {
  userNick?: string;
  userEmail?: string;
}

export const userStore = create<{
  userInfo: UserInformation;
  setUserInfo: (userInfo: UserInformation) => void;
}>((set) => ({
  userInfo: {
    userNick: undefined,
    userEmail: undefined,
  },
  setUserInfo: (userInfo: UserInformation) => set({ userInfo }),
}));
