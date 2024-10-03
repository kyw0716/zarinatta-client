import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserInformation {
  userNick?: string;
  userEmail?: string;
}

export const userStore = create<{
  userInfo: UserInformation;
  setUserInfo: (userInfo: UserInformation) => void;
  resetUserInfo: () => void;
}>()(
  persist(
    (set, get) => ({
      userInfo: {
        userNick: get().userInfo.userNick ?? undefined,
        userEmail: get().userInfo.userEmail ?? undefined,
      },
      setUserInfo: (userInfo: UserInformation) => set({ userInfo }),
      resetUserInfo: () => set({ userInfo: { userEmail: undefined, userNick: undefined } }),
    }),
    { name: 'userInfo' }
  )
);
