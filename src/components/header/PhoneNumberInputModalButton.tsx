'use client';

import {useModalStore} from '@/hooks/use-modal-store';
import PhoneNumberInputModal from '../modal/PhoneNumberInputModal';
import {useUserMeQuery} from '@/hooks/query/use-login';

export default function PhoneNumberInputModalButton() {
    const {data: userData} = useUserMeQuery();

    const {openModal} = useModalStore();

    if (userData === undefined) return <></>;

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
