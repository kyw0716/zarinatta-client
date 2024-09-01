import { ReadonlyURLSearchParams } from 'next/navigation';

export const coreSearchParamKeys = [
  'departStation',
  'arriveStation',
  'departTime',
  'departDate',
  'trainType',
];
const searchParamKeys = [...coreSearchParamKeys, 'searchKeyword', 'isModalOpen', 'page', 'size'];

export const getSearchParamsObject = (searchParams: ReadonlyURLSearchParams) => {
  const searchParamsObject: Record<(typeof searchParamKeys)[number], string> = {};

  searchParamKeys.forEach((key) => {
    const value = searchParams.get(key);

    if (value !== null) {
      searchParamsObject[key] = value;
    }
  });

  return searchParamsObject;
};

export const getSearchURLFromObject = (object?: Record<string, string | number>) => {
  if (object === undefined) return '';

  const queryParams: string[] = [];

  Object.entries(object).forEach(([key, value]) => {
    queryParams.push(`${key}=${encodeURIComponent(value)}`);
  });

  return queryParams.join('&');
};
