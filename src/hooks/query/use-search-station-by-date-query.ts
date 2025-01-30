import { SearchStationResponse } from '@/type';
import { ZarinattaAxios } from '@/utils/axios/ZarinattaInstance';
import { useQuery } from '@tanstack/react-query';

export const useSearchStationByDate = (searchParams: string) =>
  useQuery<SearchStationResponse>({
    queryKey: ['searchStationByDate', searchParams],
    queryFn: async () =>
      await (
        await ZarinattaAxios.noneSecuredApiInstance(
          `/v1/ticket/search?${searchParams}&size=50&page=0`
        )
      ).data,
  });
