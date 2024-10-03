import { create } from 'zustand';

export interface UserInformation {
  userNick?: string;
  userEmail?: string;
}

export const userStore = create<{
  userInfo: UserInformation;
  setUserInfo: (userInfo: UserInformation) => void;
  resetUserInfo: () => void;
}>((set) => ({
  userInfo: {
    userNick: JSON.parse(JSON.stringify(sessionStorage.getItem('userInfo'))).userNick ?? undefined,
    userEmail:
      JSON.parse(JSON.stringify(sessionStorage.getItem('userInfo'))).userEmail ?? undefined,
  },
  setUserInfo: (userInfo: UserInformation) => set({ userInfo }),
  resetUserInfo: () => set({ userInfo: { userEmail: undefined, userNick: undefined } }),
}));
