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

export const useStationSearchQuery = (searchKeyword?: string) =>
  useQuery<string[]>({
    queryKey: ['stationSearchQuery', searchKeyword],
    queryFn: async () => (await searchStation(searchKeyword)).data.stations,
  });

export const useFrequentStationSearchQuery = () =>
  useQuery<FrequentStationResponse>({
    queryKey: ['frequentStationQuery'],
    queryFn: async () => (await searchFrequentStation()).data,
  });

const searchStation = (searchKeyword?: string) =>
  axios.get(`${API_END_POINT}/v1/station/search?keyword=${searchKeyword ?? ''}`);

const searchFrequentStation = () => axios.get(`${API_END_POINT}/v1/station/frequent`);
