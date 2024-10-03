import { API_END_POINT } from '@/static/api';
import { SearchStationResponse } from '@/type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useSearchStationByDate = (searchParams: string) =>
  useQuery<SearchStationResponse>({
    queryKey: ['searchStationByDate'],
    queryFn: async () =>
      (await axios.get(`${API_END_POINT}/v1/ticket/search?${searchParams}`)).data,
  });
