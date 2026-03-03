declare module '@tanstack/react-query' {
  import type { ReactNode } from 'react';

  export class QueryClient {}

  export function QueryClientProvider(props: {
    client: QueryClient;
    children: ReactNode;
  }): ReactNode;

  export function useQuery<TData = unknown>(options: {
    queryKey: unknown[];
    queryFn: () => Promise<TData>;
    staleTime?: number;
  }): {
    data: TData | undefined;
    isLoading: boolean;
    isFetching: boolean;
  };
}

declare module 'react-native-maps' {
  import type { ComponentType } from 'react';

  export type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };

  export const PROVIDER_GOOGLE: string;

  const MapView: ComponentType<any>;
  export const Marker: ComponentType<any>;
  export default MapView;
}

declare module 'lodash.debounce' {
  type DebouncedFunction<T extends (...args: any[]) => any> = ((...args: Parameters<T>) => void) & {
    cancel: () => void;
  };

  export default function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait?: number,
  ): DebouncedFunction<T>;
}
