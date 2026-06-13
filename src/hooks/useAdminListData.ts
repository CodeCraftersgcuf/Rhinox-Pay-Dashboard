import { useCallback, useEffect, useState } from 'react';
import { adminApiGet } from '../services/adminApi';

export interface AdminPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const useAdminListData = <T = unknown>(
  endpoint: string,
  params: Record<string, unknown> = {},
  enabled = true
) => {
  const [items, setItems] = useState<T[]>([]);
  const [pagination, setPagination] = useState<AdminPagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paramsKey = JSON.stringify(params);

  const refetch = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    try {
      const data = await adminApiGet(endpoint, params);
      setItems((data?.items || []) as T[]);
      setPagination(
        data?.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 }
      );
      setStats(data?.stats || null);
    } catch (err: unknown) {
      setItems([]);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [endpoint, paramsKey, enabled]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { items, pagination, stats, loading, error, refetch };
};

export const useAdminData = <T = unknown>(
  endpoint: string,
  params: Record<string, unknown> = {},
  enabled = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paramsKey = JSON.stringify(params);

  const refetch = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    try {
      const result = await adminApiGet(endpoint, params);
      setData(result as T);
    } catch (err: unknown) {
      setData(null);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [endpoint, paramsKey, enabled]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
};
