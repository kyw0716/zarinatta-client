import { API_END_POINT } from '@/static/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
  axios.get(`${API_END_POINT}/v1/station/search?keyword=${searchKeyword ?? ''}`);

export const searchFrequentStation = () => axios.get(`${API_END_POINT}/v1/station/frequent`);
