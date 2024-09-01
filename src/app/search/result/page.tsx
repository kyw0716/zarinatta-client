'use client';

import { getSearchParamsObject, getSearchURLFromObject } from '@/utils/search-params';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SearchResultPage() {
  const searchURL = getSearchURLFromObject(getSearchParamsObject(useSearchParams()));

  useEffect(() => {
    fetch(`https://api.catchy-tape.store/api/v1/ticket/search?${searchURL}`)
      .then((res) => res.json())
      .then((v) => console.log(v));
  }, []);
  return <div></div>;
}
