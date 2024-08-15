'use client';

import { Flex } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PageNavigatorMenu() {
  const pathName = usePathname();

  const isSearchPage = pathName === '/search';
  const isBookmarkPage = pathName === '/bookmark';
  const isHelpPage = pathName === '/help';

  return (
    <Flex justify="space-between" style={{ width: 276 }}>
      <Link href={'/search'} style={{ color: isSearchPage ? '#3794FA' : '#A8A8A8' }}>
        열차조회
      </Link>
      <Link href={'/bookmark'} style={{ color: isBookmarkPage ? '#3794FA' : '#A8A8A8' }}>
        즐겨찾기
      </Link>
      <Link href={'/help'} style={{ color: isHelpPage ? '#3794FA' : '#A8A8A8' }}>
        고객센터
      </Link>
    </Flex>
  );
}
