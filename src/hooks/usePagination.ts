import { useCallback, useMemo, useState } from 'react';

export const usePagination = (initialPage = 1, initialLimit = 20) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const resetPage = useCallback(() => setPage(1), []);

  const paginationParams = useMemo(() => ({ page, limit }), [page, limit]);

  const getTotalPages = useCallback(
    (total: number) => Math.max(1, Math.ceil(total / limit)),
    [limit]
  );

  const getDisplayRange = useCallback(
    (total: number) => {
      if (total === 0) return { start: 0, end: 0 };
      return {
        start: (page - 1) * limit + 1,
        end: Math.min(page * limit, total),
      };
    },
    [page, limit]
  );

  return {
    page,
    limit,
    setPage,
    setLimit,
    resetPage,
    paginationParams,
    getTotalPages,
    getDisplayRange,
  };
};
