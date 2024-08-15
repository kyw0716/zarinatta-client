import Image from 'next/image';
import { PageProps } from '../../../.next/types/app/layout';

// TODO: startDate, endDate 얘네 특정한 포맷으로 받도록 타입 강제할지 고민해보기
// TODO: startTime 얘도
// TODO: isModalOpen 얘도
interface SearchPageSearchParams {
  // TODO: 열차 왕복 티켓도 지원하는지 확정되면 코드에 적용하기
  // isOneWay?: string;
  startDate?: string;
  endDate?: string;
  startLocation?: string;
  endLocation?: string;
  isModalOpen?: string;
  startTime?: string;
  searchKeyword?: string;
}

interface SearchPageParams extends PageProps {
  searchParams?: SearchPageSearchParams;
}

export default function SearchPage({ searchParams }: SearchPageParams) {
  return (
    <div>
      <Image src="/banner.svg" alt="자리나따 배너 이미지" width={1280} height={387} priority />
      열차조회 페이지
    </div>
  );
}
