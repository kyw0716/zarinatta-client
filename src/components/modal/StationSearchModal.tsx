'use client';

import {
  useSearchFrequentStationListQuery,
  useSearchAllStationListQuery,
} from '@/hooks/query/use-search-all-station-list-query';
import { useModalStore } from '@/hooks/use-modal-store';
import { useSearchRouter } from '@/hooks/use-search-router';
import { Flex, Input } from 'antd';
import { useEffect, useState } from 'react';
import Margin from '../design-system/Margin';

interface StationSearchModalProps {
  departOrArrive: 'depart' | 'arrive';
}

export default function StationSearchModal({ departOrArrive }: StationSearchModalProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data: stations, isError: isStationSearchError } =
    useSearchAllStationListQuery(searchKeyword);
  const { data: frequentStation, isError: isFrequentStationSearchError } =
    useSearchFrequentStationListQuery();
  const closeModal = useModalStore(({ closeModal }) => closeModal);

  const { routeSearchPageWithParams } = useSearchRouter();

  if (isStationSearchError || isFrequentStationSearchError) return <></>;

  useEffect(() => {
    window.addEventListener('click', closeModal);

    return () => {
      window.removeEventListener('click', closeModal);
    };
  }, []);

  return (
    <Flex
      style={{
        position: 'fixed',
        width: '80vw',
        height: '80vh',
        top: '10vh',
        left: '10vw',
        backgroundColor: 'white',
        zIndex: 999,
        overflowY: 'scroll',
      }}
      vertical
      onClick={(e) => e.stopPropagation()}
    >
      <Input value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
      <span style={{ fontSize: 20 }}>자주 찾는 역</span>
      <Margin vertical size={10} />
      <Flex gap={10} wrap>
        {frequentStation?.stations.map(({ name }) => (
          <div
            onClick={() => {
              routeSearchPageWithParams({ [`${departOrArrive}Station`]: name });
              closeModal();
            }}
          >
            {name}
          </div>
        ))}
      </Flex>
      <Margin vertical size={20} />
      <span style={{ fontSize: 20 }}>전체 역</span>
      <Margin vertical size={10} />
      <Flex gap={10} wrap>
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
      </Flex>
      <Margin vertical size={20} />
      <span style={{ fontSize: 20, color: 'red' }} onClick={closeModal}>
        닫기
      </span>
    </Flex>
  );
}
