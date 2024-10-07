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
import Image from 'next/image';
import Text from '../design-system/Text';
import { color } from '../design-system/Color';

interface StationSearchModalProps {
  departOrArrive: 'depart' | 'arrive';
}

export default function StationSearchModal({ departOrArrive }: StationSearchModalProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hoveredStation, setHoveredStation] = useState('');
  const [clickedStation, setClickedStation] = useState('');
  const { data: stations, isError: isStationSearchError } =
    useSearchAllStationListQuery(searchKeyword);
  const { data: allStations } = useSearchAllStationListQuery('');
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
    <>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#00000066',
        }}
      />
      <Flex
        style={{
          position: 'fixed',
          width: '800px',
          height: '700px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          zIndex: 999,
          overflowY: 'scroll',
          padding: '41px 0',
          borderRadius: 8,
        }}
        vertical
        align="center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image alt="위치 이모지" src={'/location.svg'} width={43} height={52.5} />
        <Margin vertical size={24} />
        <Flex style={{ position: 'relative' }}>
          <Input
            placeholder="기차역을 검색해주세요."
            style={{ width: 650, height: 52, backgroundColor: '#F7F7F7' }}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Image
            style={{ position: 'absolute', top: 15.5, right: 15.5, cursor: 'pointer' }}
            src={'/magnifyingGlass.svg'}
            alt="돋보기 아이콘"
            width={21}
            height={21}
          />
        </Flex>
        <Margin vertical size={28} />
        {searchKeyword === '' ? (
          <Flex vertical style={{ width: 650 }}>
            <Text
              type="semiBold-16"
              colorType="gray950"
              style={{
                borderBottom: `2px solid ${color['primary500']}`,
                lineHeight: '24px',
                width: 133,
              }}
            >
              많이 이용하는 기차역
            </Text>
            <Margin vertical size={16} />
            <Flex gap={8} wrap>
              {frequentStation?.stations.map(({ name }) => (
                <Flex
                  style={{
                    width: 95,
                    height: 26,
                    borderRadius: 4,
                    backgroundColor: color['gray50'],
                    cursor: 'pointer',
                  }}
                  align="center"
                  justify="center"
                  onClick={() => {
                    routeSearchPageWithParams({ [`${departOrArrive}Station`]: name });
                    closeModal();
                  }}
                >
                  <Text type="medium-13" colorType="gray950">
                    {name}
                  </Text>
                </Flex>
              ))}
            </Flex>
            <Margin vertical size={24} />
            <Text
              type="semiBold-16"
              colorType="gray950"
              style={{
                borderBottom: `2px solid ${color['primary500']}`,
                lineHeight: '24px',
                width: 76,
              }}
            >
              모든 정차역
            </Text>
            <Margin vertical size={12} />
            <Flex gap={12} wrap>
              {allStations?.map((station, i) => (
                <Flex
                  onMouseEnter={() => {
                    setHoveredStation(station);
                  }}
                  onMouseLeave={() => {
                    setHoveredStation('');
                    setClickedStation('');
                  }}
                  onMouseDown={() => {
                    setHoveredStation('');
                    setClickedStation(station);
                  }}
                >
                  <Text
                    key={`${station}-${i}`}
                    style={{
                      width: 120,
                      height: 37,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      backgroundColor: hoveredStation === station ? color['gray50'] : '',
                      borderRadius: 8,
                    }}
                    type="regular-14"
                    colorType={clickedStation === station ? 'primary500' : 'gray950'}
                    onClick={() => {
                      routeSearchPageWithParams({ [`${departOrArrive}Station`]: station });
                      closeModal();
                    }}
                  >
                    {station}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        ) : (
          <Flex vertical>
            {stations?.map((station, i) => (
              <Flex
                style={{
                  width: 650,
                  height: 43,
                  padding: 8,
                  cursor: 'pointer',
                }}
                gap={16}
                align="center"
                onClick={() => {
                  routeSearchPageWithParams({ [`${departOrArrive}Station`]: station });
                  closeModal();
                }}
              >
                <Image src={'/subway.svg'} alt="열차 이모지" width={24} height={27} />
                <Text type="regular-16" colorType="gray900">
                  {station}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </>
  );
}
