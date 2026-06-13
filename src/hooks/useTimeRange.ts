export const mapTimeRangeToApi = (range: string) => {
  switch (range) {
    case '7 Days':
      return '7d';
    case '1 month':
      return '30d';
    case '1 Year':
      return '365d';
    case 'Custom':
      return 'custom';
    default:
      return 'all';
  }
};

export const useTimeRangeParams = (selectedTimeRange: string, customFrom?: string, customTo?: string) => {
  const range = mapTimeRangeToApi(selectedTimeRange);
  const params: Record<string, string> = { range };
  if (range === 'custom' && customFrom && customTo) {
    params.from = customFrom;
    params.to = customTo;
  }
  return params;
};
