'use client';

import {
  searchFrequentStation,
  searchStationList,
} from '@/hooks/query/use-search-all-station-list-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const queryClient = new QueryClient();

export const prefetchStations = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['stationSearchQuery', ''],
    queryFn: async () => (await searchStationList()).data.stations,
  });
};

export const prefetchFrequentStations = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['frequentStationQuery'],
    queryFn: (await searchFrequentStation()).data,
  });
};

export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
