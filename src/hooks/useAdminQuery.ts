import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { adminApiGet } from '../services/adminApi';

export const useAdminList = (
  key: string[],
  endpoint: string,
  params: Record<string, unknown> = {},
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [...key, params],
    queryFn: () => adminApiGet(endpoint, params),
    ...options,
  });
};

export const useAdminDetail = (
  key: string[],
  endpoint: string,
  enabled = true
) => {
  return useQuery({
    queryKey: key,
    queryFn: () => adminApiGet(endpoint),
    enabled,
  });
};
