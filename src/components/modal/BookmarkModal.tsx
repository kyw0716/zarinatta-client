import { BookmarkRequestParams, SeatVariation, TicketTableColumns } from '@/type';
import { Flex } from 'antd';
import { ReactNode, useState } from 'react';
import Text from '../design-system/Text';
import Margin from '../design-system/Margin';
import { color } from '../design-system/Color';
import { useModalStore } from '@/hooks/use-modal-store';
import { useCreateBookmarkMutation } from '@/hooks/query/use-create-bookmark';
import { getSearchParamsObject, getSearchURLFromObject } from '@/utils/search-params';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSearchStationByDate } from '@/hooks/query/use-search-station-by-date-query';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Image from 'next/image';
import { TrainTypeChip } from '../chip/TrainTypeChip';

interface BookmarkModalProps {
  ticket: TicketTableColumns;
  departDate: string;
}

export default function BookmarkModal({ ticket, departDate }: BookmarkModalProps) {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const searchURL = getSearchURLFromObject(getSearchParamsObject(searchParams));
  const { data: searchedStations } = useSearchStationByDate(searchURL);

  const { mutate: createBookmark, isPending } = useCreateBookmarkMutation(() => {
    goToNextStep();
    queryClient.invalidateQueries({
      queryKey: [
        'bookmarkedTicketListQuery',
        searchedStations?.responseList.map(({ ticketId }) => ticketId),
      ],
    });
  });

  const goToNextStep = () => {
    setStep((step) => step + 1);
  };

  return (
    <Flex
      style={{
        width: 600,
        height: 425,
        borderRadius: 20,
        backgroundColor: 'white',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        padding: 20,
        boxSizing: 'border-box',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {step === 1 && (
        <ConfirmTicketInformation
          ticket={ticket}
          departDate={departDate}
          goToNextStep={goToNextStep}
        />
      )}
      {step === 2 && (
        <SelectSeatType
          ticketId={ticket.ticketId}
          isLoading={isPending}
          createBookmark={createBookmark}
        />
      )}
      {step === 3 && <BookmarkSuccess />}
    </Flex>
  );
}

const ConfirmTicketInformation = ({
  ticket,
  departDate,
  goToNextStep,
}: BookmarkModalProps & { goToNextStep: () => void }) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <Flex style={{ width: '100%' }} vertical>
      <Flex style={{ width: '100%' }} justify="flex-end">
        <Text type="regular-13" colorType="gray600">
          1/2단계
        </Text>
      </Flex>
      <Margin vertical size={10} />
      <Flex style={{ width: '100%' }} justify="center">
        <Text type="semiBold-20" colorType="gray900">
          자리 정보를 확인해주세요
        </Text>
      </Flex>
      <Margin vertical size={41} />
      <Flex style={{ paddingLeft: 25 }} vertical>
        <TicketInformation
          label="출발 날짜"
          content={
            <Text
              type="regular-16"
              colorType="gray950"
            >{`${departDate.slice(0, 4)}-${departDate.slice(4, 6)}-${departDate.slice(6)}`}</Text>
          }
        />
        <Margin vertical size={32} />
        <TicketInformation
          label="열차 정보"
          content={
            <Flex gap={6}>
              <TrainTypeChip text={ticket.ticketType.split(' ')[0]} />
              <TrainTypeChip text={ticket.ticketType.split(' ')[1]} />
            </Flex>
          }
        />
        <Margin vertical size={32} />
        <TicketInformation
          label="출발 정보"
          content={
            <Flex>
              <Text type="regular-16" colorType="gray950">
                {ticket.departTime}
              </Text>
              <Margin horizontal size={40} />
              <Text type="regular-16" colorType="gray950">
                {ticket.departStation}
              </Text>
            </Flex>
          }
        />
        <Margin vertical size={32} />
        <TicketInformation
          label="도착 정보"
          content={
            <Flex>
              <Text type="regular-16" colorType="gray950">
                {ticket.arriveTime}
              </Text>
              <Margin horizontal size={40} />
              <Text type="regular-16" colorType="gray950">
                {ticket.arriveStation}
              </Text>
            </Flex>
          }
        />
      </Flex>
      <Margin vertical size={41} />
      <Flex style={{ width: '100%' }} justify="space-between">
        <Flex
          style={{
            width: 275,
            height: 48,
            borderRadius: 8,
            backgroundColor: color['gray100'],
            cursor: 'pointer',
          }}
          justify="center"
          align="center"
          onClick={() => closeModal()}
        >
          <Text type="semiBold-16" colorType="gray900">
            잘못 선택했어요
          </Text>
        </Flex>
        <Flex
          style={{
            width: 275,
            height: 48,
            borderRadius: 8,
            backgroundColor: color['primary500'],
            cursor: 'pointer',
          }}
          justify="center"
          align="center"
          onClick={() => goToNextStep()}
        >
          <Text type="semiBold-16" colorType="white">
            이 정보가 맞아요
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const TicketInformation = ({ label, content }: { label: string; content: ReactNode }) => {
  return (
    <Flex>
      <Text type="regular-16" colorType="gray600">
        {label}
      </Text>
      <Margin horizontal size={72} />
      {content}
    </Flex>
  );
};

interface SelectSeatTypeProps {
  ticketId: number;
  isLoading: boolean;
  createBookmark: UseMutateFunction<AxiosResponse<any, any>, Error, BookmarkRequestParams, unknown>;
}

const SelectSeatType = ({ ticketId, isLoading, createBookmark }: SelectSeatTypeProps) => {
  const [wantFirstClass, setWantFirstClass] = useState<boolean>(false);
  const [wantNormalSeat, setWantNormalSeat] = useState<SeatVariation>('NOTFOUND');
  const [wantBabySeat, setWantBabySeat] = useState<SeatVariation>('NOTFOUND');
  const [wantAllSeat, setWantAllSeat] = useState<boolean>(false);
  const [wantWaitingReservation, setWantWaitingReservation] = useState<boolean>(true);

  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  return (
    <Flex style={{ width: '100%' }} vertical>
      <Flex style={{ width: '100%' }} justify="flex-end">
        <Text type="regular-13" colorType="gray600">
          2/2단계
        </Text>
      </Flex>
      <Margin vertical size={10} />
      <Flex style={{ width: '100%' }} justify="center">
        <Text type="semiBold-20" colorType="gray900">
          알림을 받고 싶은 좌석을 선택해주세요
        </Text>
      </Flex>
      <Margin vertical size={32} />
      <Flex style={{ padding: '0 45px' }} wrap gap={16}>
        <SeatOption
          hoverIndex={0}
          text="특실"
          isHovered={hoveredOption === 0}
          setHoveredOption={setHoveredOption}
          handleClick={() => setWantFirstClass((current) => !current)}
          isSelected={wantFirstClass}
        />
        <SeatOption
          hoverIndex={1}
          text="일반실"
          isHovered={hoveredOption === 1}
          setHoveredOption={setHoveredOption}
          handleClick={() =>
            setWantNormalSeat((current) => (current === 'SEAT' ? 'NOTFOUND' : 'SEAT'))
          }
          isSelected={wantNormalSeat === 'SEAT'}
        />
        <SeatOption
          hoverIndex={2}
          text="유아"
          isHovered={hoveredOption === 2}
          setHoveredOption={setHoveredOption}
          handleClick={() =>
            setWantBabySeat((current) => (current === 'SEAT' ? 'NOTFOUND' : 'SEAT'))
          }
          isSelected={wantBabySeat === 'SEAT'}
        />
        <SeatOption
          hoverIndex={3}
          text="일반실 입좌석"
          isHovered={hoveredOption === 3}
          setHoveredOption={setHoveredOption}
          handleClick={() =>
            setWantNormalSeat((current) =>
              current === 'STANDING_SEAT' ? 'NOTFOUND' : 'STANDING_SEAT'
            )
          }
          isSelected={wantNormalSeat === 'STANDING_SEAT'}
        />
        <SeatOption
          hoverIndex={4}
          text="유아 입좌석"
          isHovered={hoveredOption === 4}
          setHoveredOption={setHoveredOption}
          handleClick={() =>
            setWantBabySeat((current) =>
              current === 'STANDING_SEAT' ? 'NOTFOUND' : 'STANDING_SEAT'
            )
          }
          isSelected={wantBabySeat === 'STANDING_SEAT'}
        />
        <SeatOption
          hoverIndex={5}
          text="모든 좌석"
          isHovered={hoveredOption === 5}
          setHoveredOption={setHoveredOption}
          handleClick={() => {
            setWantAllSeat((current) => !current);
            setWantFirstClass(wantAllSeat ? false : true);
            setWantBabySeat(wantAllSeat ? 'NOTFOUND' : 'SEAT');
            setWantNormalSeat(wantAllSeat ? 'NOTFOUND' : 'SEAT');
          }}
          isSelected={wantAllSeat}
        />
      </Flex>
      <Margin vertical size={32} />
      <Flex
        style={{ padding: '0 45px', cursor: 'pointer' }}
        onClick={() => setWantWaitingReservation((current) => !current)}
      >
        <input
          type="checkbox"
          checked={wantWaitingReservation}
          onChange={(e) => setWantWaitingReservation(e.target.checked)}
        />
        <Margin horizontal size={10} />
        <Text type="regular-16" colorType="gray950">
          예약대기가 생겼을 때도 알림을 보내주세요
        </Text>
      </Flex>
      <Margin vertical size={41} />
      <Flex
        style={{ padding: '0 5px', cursor: 'pointer' }}
        justify="flex-end"
        onClick={() => {
          createBookmark({
            ticketId,
            wantBabySeat,
            wantFirstClass,
            wantNormalSeat,
            wantWaitingReservation,
          });
        }}
      >
        <Text type="semiBold-16" colorType="primary500">
          {isLoading ? '즐겨찾기중...' : '다음으로'}
        </Text>
      </Flex>
    </Flex>
  );
};

interface SeatOptionProps {
  text: string;
  hoverIndex: number;
  isHovered: boolean;
  setHoveredOption: (hoveredOption: number | null) => void;
  isSelected: boolean;
  handleClick: () => void;
}

const SeatOption = ({
  text,
  hoverIndex,
  isHovered,
  setHoveredOption,
  isSelected,
  handleClick,
}: SeatOptionProps) => {
  return (
    <Flex
      onMouseEnter={() => setHoveredOption(hoverIndex)}
      onMouseLeave={() => setHoveredOption(null)}
      style={{
        cursor: 'pointer',
        width: 226,
        height: 45,
        borderRadius: 8,
        backgroundColor: isSelected ? color['primary500'] : isHovered ? color['gray50'] : 'white',
        color: isSelected ? 'white' : isHovered ? color['gray950'] : color['gray950'],
      }}
      align="center"
      justify="center"
      onClick={handleClick}
    >
      {text}
    </Flex>
  );
};

const BookmarkSuccess = () => {
  const router = useRouter();
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <Flex style={{ width: '100%' }} vertical>
      <Margin vertical size={60} />
      <Flex style={{ width: '100%' }} justify="center">
        <Image src={'/bookmark-success.svg'} width={70} height={70} alt="성공 이모지" />
      </Flex>
      <Margin vertical size={32} />
      <Flex style={{ width: '100%' }} vertical align="center" gap={16}>
        <Text type="semiBold-20" colorType="gray900">
          여석 알림 신청이 완료됐어요!
        </Text>
        <Text type="regular-16" colorType="gray500">
          즐겨찾기로 이동하시겠어요?
        </Text>
      </Flex>
      <Margin vertical size={105} />
      <Flex style={{ width: '100%' }} justify="space-between">
        <Flex
          style={{
            width: 275,
            height: 48,
            borderRadius: 8,
            backgroundColor: color['gray100'],
            cursor: 'pointer',
          }}
          justify="center"
          align="center"
          onClick={() => closeModal()}
        >
          <Text type="semiBold-16" colorType="gray900">
            아니요, 계속 구경할래요
          </Text>
        </Flex>
        <Flex
          style={{
            width: 275,
            height: 48,
            borderRadius: 8,
            backgroundColor: color['primary500'],
            cursor: 'pointer',
          }}
          justify="center"
          align="center"
          onClick={() => {
            closeModal();
            router.push('/bookmark');
          }}
        >
          <Text type="semiBold-16" colorType="white">
            네, 이동할래요
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
