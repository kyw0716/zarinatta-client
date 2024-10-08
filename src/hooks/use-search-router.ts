import { getSearchParamsObject, getSearchURLFromObject } from '@/utils/search-params';
import { useRouter, useSearchParams } from 'next/navigation';
import { cloneDeep } from 'lodash-es';

export const useSearchRouter = () => {
  const router = useRouter();
  const searchParams = getSearchParamsObject(useSearchParams());

  const routeSearchPageWithParams = (params: Record<string, string | number>) => {
    router.push(`/search?${getSearchURLFromObject({ ...searchParams, ...params })}`, {
      scroll: false,
    });
  };
  const routeSearchPageWithoutParams = (params: string[] | string) => {
    const deleteKeys = Array.isArray(params) ? params : [params];
    const clonedSearchParams = cloneDeep(searchParams);

    deleteKeys.forEach((key) => delete clonedSearchParams[key]);

    router.push(`/search?${getSearchURLFromObject({ ...clonedSearchParams })}`, {
      scroll: false,
    });
  };
  const routeSearchResultPageWithParams = (params: Record<string, string | number>) => {
    router.push(`/search/result?${getSearchURLFromObject({ ...searchParams, ...params })}`, {
      scroll: false,
    });
  };
  const routeSearchResultPageWithoutParams = (params: string[] | string) => {
    const deleteKeys = Array.isArray(params) ? params : [params];
    const clonedSearchParams = cloneDeep(searchParams);

    deleteKeys.forEach((key) => delete clonedSearchParams[key]);

    router.push(`/search/result?${getSearchURLFromObject({ ...clonedSearchParams })}`, {
      scroll: false,
    });
  };

  return {
    routeSearchPageWithParams,
    routeSearchPageWithoutParams,
    routeSearchResultPageWithParams,
    routeSearchResultPageWithoutParams,
  };
};
