'use client';

import { useStationSearchQuery } from '@/hooks/query/use-station-search-query';
import { useModalStore } from '@/hooks/use-modal-store';
import { useSearchRouter } from '@/hooks/use-search-router';
import { Flex, Input } from 'antd';
import { useState } from 'react';

interface StationSearchModalProps {
  departOrArrive: 'depart' | 'arrive';
}

export default function StationSearchModal({ departOrArrive }: StationSearchModalProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data: stations, isError } = useStationSearchQuery(searchKeyword);
  const closeModal = useModalStore(({ closeModal }) => closeModal);

  const { routeSearchPageWithParams } = useSearchRouter();

  if (isError) return <></>;

  return (
    <Flex
      gap={10}
      style={{
        position: 'fixed',
        width: '80vw',
        height: '80vh',
        top: '10vh',
        left: '10vw',
        backgroundColor: 'white',
        zIndex: 999,
      }}
      wrap
    >
      <Input value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
      {stations?.map((station, i) => (
        <div
          onClick={() => {
            routeSearchPageWithParams({ [`${departOrArrive}Station`]: station });
            closeModal();
          }}
          key={`${station}-${i}`}
        >
          {station}
        </div>
      ))}
      <span style={{ fontSize: 20, color: 'red' }} onClick={closeModal}>
        닫기
      </span>
    </Flex>
  );
}
