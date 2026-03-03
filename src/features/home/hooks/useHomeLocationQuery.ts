import { useQuery } from '@tanstack/react-query';
import { fetchLocations } from '../data/locationData';

export default function useHomeLocationQuery(keyword: string) {
  return useQuery({
    queryKey: ['home-locations', keyword],
    queryFn: () => fetchLocations(keyword),
    staleTime: 60_000,
  });
}
