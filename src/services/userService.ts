import { adminApiGet } from './adminApi';
import { ADMIN_ROUTES } from '../api/apiConfig';
import { mapTimeRangeToApi } from '../hooks/useTimeRange';

export interface User {
  id: string;
  username?: string;
  name: string;
  email: string;
  phone?: string;
  walletBalance?: number;
  walletCurrency?: string;
  kycStatus: string;
  country?: string | null;
  isActive?: boolean;
  createdAt?: string;
}

export const getUsers = async (
  params: {
    page?: number;
    limit?: number;
    search?: string;
    kycStatus?: string;
    range?: string;
  } = {}
): Promise<{ items: User[]; pagination: any; stats: any }> => {
  const apiParams: Record<string, unknown> = {
    page: params.page || 1,
    limit: params.limit || 20,
    search: params.search,
    range: params.range ? mapTimeRangeToApi(params.range) : 'all',
  };

  if (params.kycStatus && params.kycStatus !== 'All') {
    apiParams.kycStatus = params.kycStatus.toLowerCase();
  }

  return adminApiGet(ADMIN_ROUTES.USERS, apiParams);
};

export const getUserById = async (id: number) => adminApiGet(`${ADMIN_ROUTES.USERS}/${id}`);

export default getUsers;
