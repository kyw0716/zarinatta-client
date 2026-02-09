'use client';

import { useEffect } from 'react';
import { useModalStore } from '@/hooks/use-modal-store';
import PhoneNumberInputModal from '../modal/PhoneNumberInputModal';
import { useUserMeQuery } from '@/hooks/query/use-login';
import { useAuthStore } from '@/hooks/use-auth-store';

export default function PhoneNumberInputModalButton() {
    const { data: userData } = useUserMeQuery();
    const isLoggedOut = useAuthStore((s) => s.isLoggedOut);
    const setLoggedOut = useAuthStore((s) => s.setLoggedOut);
    const { openModal } = useModalStore();

    useEffect(() => {
        if (userData) setLoggedOut(false);
    }, [userData, setLoggedOut]);

    if (isLoggedOut || userData == null || userData.phoneNumber !== null) return <></>;

    return (
        <span
            style={{cursor: 'pointer'}}
            onClick={(e) => {
                openModal(<PhoneNumberInputModal/>);
                e.stopPropagation();
            }}
        >
      전화번호 입력
    </span>
    );
}
