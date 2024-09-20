'use client';

import { searchFrequentStation, searchStation } from '@/hooks/query/use-station-search-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const queryClient = new QueryClient();

export const prefetchStations = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['stationSearchQuery', ''],
    queryFn: async () => (await searchStation()).data.stations,
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
