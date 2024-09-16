import { API_END_POINT } from '@/static/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useStationSearchQuery = (searchKeyword?: string) =>
  useQuery<string[]>({
    queryKey: ['stationSearchQuery', searchKeyword],
    queryFn: async () => (await searchStation(searchKeyword)).data.stations,
  });

const searchStation = (searchKeyword?: string) =>
  axios.get(`${API_END_POINT}/v1/station/search?keyword=${searchKeyword ?? ''}`);
