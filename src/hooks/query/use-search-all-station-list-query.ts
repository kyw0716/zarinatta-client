import { ZarinattaAxios } from '@/utils/axios/ZarinattaInstance';
import { useQuery } from '@tanstack/react-query';

interface FrequentStationResponse {
  stations: {
    name: string;
    section: string;
  }[];
  sections: string[];
}

export const useSearchAllStationListQuery = (searchKeyword?: string) =>
  useQuery<string[]>({
    queryKey: ['stationSearchQuery', searchKeyword],
    queryFn: async () => (await searchStationList(searchKeyword)).data.stations,
  });

export const useSearchFrequentStationListQuery = () =>
  useQuery<FrequentStationResponse>({
    queryKey: ['frequentStationQuery'],
    queryFn: async () => (await searchFrequentStation()).data,
  });

export const searchStationList = (searchKeyword?: string) =>
  ZarinattaAxios.noneSecuredApiInstance.get(`/v1/station/search?keyword=${searchKeyword ?? ''}`);

export const searchFrequentStation = () =>
  ZarinattaAxios.noneSecuredApiInstance.get('/v1/station/frequent');
