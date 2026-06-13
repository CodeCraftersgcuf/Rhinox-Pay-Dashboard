import { ADMIN_ROUTES } from '../../api/apiConfig';
import { adminApiGet, adminApiSend } from '../adminApi';
import { mapTimeRangeToApi } from '../../hooks/useTimeRange';
import { mapCountryCode, mapStatusFilter } from '../../utils/adminFormatters';

export type AdminQueryParams = Record<string, unknown>;

export const buildAdminQuery = (
  params: AdminQueryParams & { range?: string; from?: string; to?: string }
): AdminQueryParams => {
  const query: AdminQueryParams = { ...params };
  if (params.range) {
    query.range = mapTimeRangeToApi(String(params.range));
  }
  if (query.range !== 'custom') {
    delete query.from;
    delete query.to;
  }
  Object.keys(query).forEach((key) => {
    const value = query[key];
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      value === 'All' ||
      value === 'All Time' ||
      value === 'All Status' ||
      value === 'Country' ||
      value === 'All Countries'
    ) {
      delete query[key];
    }
  });
  return query;
};

export const fetchDashboardStats = (range: string, from?: string, to?: string) =>
  adminApiGet(ADMIN_ROUTES.DASHBOARD.STATS, buildAdminQuery({ range, from, to }));

export const fetchDashboardCharts = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.DASHBOARD.CHARTS, buildAdminQuery(params));

export const fetchDashboardLatestUsers = (limit = 10) =>
  adminApiGet(ADMIN_ROUTES.DASHBOARD.LATEST_USERS, { limit });

export const fetchDashboardWallets = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.DASHBOARD.WALLETS, buildAdminQuery(params));

export const fetchUsers = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.USERS, buildAdminQuery(params));

export const fetchUserById = (id: number | string) =>
  adminApiGet(`${ADMIN_ROUTES.USERS}/${id}`);

export const createUser = (data: unknown) =>
  adminApiSend(ADMIN_ROUTES.USERS, 'POST', data);

export const updateUser = (id: number | string, data: unknown) =>
  adminApiSend(`${ADMIN_ROUTES.USERS}/${id}`, 'PATCH', data);

export const bulkUpdateUsers = (userIds: number[], action: 'activate' | 'deactivate') =>
  adminApiSend(`${ADMIN_ROUTES.USERS}/bulk`, 'POST', { userIds, action });

export const fetchUserActivities = (id: number | string, params: AdminQueryParams) =>
  adminApiGet(`${ADMIN_ROUTES.USERS}/${id}/activities`, buildAdminQuery(params));

export const fetchUserWallets = (id: number | string) =>
  adminApiGet(`${ADMIN_ROUTES.USERS}/${id}/wallets`);

export const fetchUserTransactions = (id: number | string, params: AdminQueryParams) =>
  adminApiGet(`${ADMIN_ROUTES.USERS}/${id}/transactions`, buildAdminQuery(params));

export const fetchUserKyc = (id: number | string) =>
  adminApiGet(`${ADMIN_ROUTES.USERS}/${id}/kyc`);

export const fetchUserP2P = (id: number | string) =>
  adminApiGet(`${ADMIN_ROUTES.USERS}/${id}/p2p`);

export const fetchTransactions = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.TRANSACTIONS, buildAdminQuery({
    ...params,
    assetType: params.assetType === 'Fiat' || params.assetType === 'Crypto' ? params.assetType : params.assetType,
    action: params.action && params.action !== 'All' ? params.action : undefined,
    country: params.country ? mapCountryCode(String(params.country)) : undefined,
    status: params.status ? mapStatusFilter(String(params.status)) : undefined,
  }));

export const fetchTransactionById = (id: number | string) =>
  adminApiGet(`${ADMIN_ROUTES.TRANSACTIONS}/${id}`);

export const fetchKycList = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.KYC, buildAdminQuery(params));

export const fetchKycByUserId = (userId: number | string) =>
  adminApiGet(`${ADMIN_ROUTES.KYC}/${userId}`);

export const approveKyc = (userId: number | string) =>
  adminApiSend(`${ADMIN_ROUTES.KYC}/${userId}/approve`, 'POST');

export const rejectKyc = (userId: number | string, reason?: string) =>
  adminApiSend(`${ADMIN_ROUTES.KYC}/${userId}/reject`, 'POST', { reason });

export const fetchWalletOverview = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.WALLETS.OVERVIEW, buildAdminQuery(params));

export const fetchWalletUsers = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.WALLETS.USERS, buildAdminQuery(params));

export const fetchExchangeRates = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.EXCHANGE.RATES, buildAdminQuery(params));

export const setExchangeRate = (data: unknown) =>
  adminApiSend(ADMIN_ROUTES.EXCHANGE.RATES, 'POST', data);

export const fetchFees = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.EXCHANGE.FEES, buildAdminQuery(params));

export const createFee = (data: unknown) =>
  adminApiSend(ADMIN_ROUTES.EXCHANGE.FEES, 'POST', data);

export const updateFee = (id: number | string, data: unknown) =>
  adminApiSend(`${ADMIN_ROUTES.EXCHANGE.FEES}/${id}`, 'PATCH', data);

export const fetchP2PStats = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.P2P.STATS, buildAdminQuery(params));

export const fetchP2PAds = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.P2P.ADS, buildAdminQuery(params));

export const fetchP2POrders = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.P2P.ORDERS, buildAdminQuery(params));

export const fetchP2PAppeals = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.P2P.APPEALS, buildAdminQuery(params));

export const resolveP2PAppeal = (orderId: number | string, data: unknown) =>
  adminApiSend(`${ADMIN_ROUTES.P2P.APPEALS}/${orderId}/resolve`, 'POST', data);

export const fetchP2PPaymentMethods = (userId: number | string) =>
  adminApiGet(`${ADMIN_ROUTES.P2P.PAYMENT_METHODS}/${userId}`);

export const updateP2PAdStatus = (id: number | string, status: string) =>
  adminApiSend(`${ADMIN_ROUTES.P2P.ADS}/${id}/status`, 'PATCH', { status });

export const updateP2POrderStatus = (id: number | string, status: string) =>
  adminApiSend(`${ADMIN_ROUTES.P2P.ORDERS}/${id}/status`, 'PATCH', { status });

export const fetchMasterWallets = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.MASTER_WALLETS, buildAdminQuery(params));

export const fetchMasterWalletActivity = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.MASTER_WALLET_ACTIVITY, buildAdminQuery(params));

export const fetchAnalyticsGeneral = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.ANALYTICS.GENERAL, buildAdminQuery(params));

export const fetchAnalyticsFraud = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.ANALYTICS.FRAUD, buildAdminQuery(params));

export const fetchRewardRules = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.REWARDS.RULES, buildAdminQuery(params));

export const createRewardRule = (data: unknown) =>
  adminApiSend(ADMIN_ROUTES.REWARDS.RULES, 'POST', data);

export const updateRewardRule = (id: number | string, data: unknown) =>
  adminApiSend(`${ADMIN_ROUTES.REWARDS.RULES}/${id}`, 'PATCH', data);

export const deleteRewardRule = (id: number | string) =>
  adminApiSend(`${ADMIN_ROUTES.REWARDS.RULES}/${id}`, 'DELETE');

export const fetchRewardClaims = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.REWARDS.CLAIMS, buildAdminQuery(params));

export const fetchSupportChats = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.SUPPORT.CHATS, buildAdminQuery({
    ...params,
    country: params.country ? mapCountryCode(String(params.country)) : undefined,
    status: params.status ? mapStatusFilter(String(params.status)) : undefined,
  }));

export const fetchSupportChat = (id: number | string) =>
  adminApiGet(`${ADMIN_ROUTES.SUPPORT.CHATS}/${id}`);

export const assignSupportChat = (id: number | string, agentId?: number) =>
  adminApiSend(`${ADMIN_ROUTES.SUPPORT.CHATS}/${id}/assign`, 'PATCH', agentId ? { agentId } : {});

export const updateSupportChatStatus = (id: number | string, status: string) =>
  adminApiSend(`${ADMIN_ROUTES.SUPPORT.CHATS}/${id}/status`, 'PATCH', { status });

export const sendSupportMessage = (id: number | string, message: string, imageUrl?: string) =>
  adminApiSend(`${ADMIN_ROUTES.SUPPORT.CHATS}/${id}/messages`, 'POST', { message, imageUrl });

export const fetchNotifications = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.NOTIFICATIONS, buildAdminQuery(params));

export const sendNotification = (data: unknown) =>
  adminApiSend(`${ADMIN_ROUTES.NOTIFICATIONS}/send`, 'POST', data);

export const fetchBanners = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.BANNERS, buildAdminQuery(params));

export const createBanner = (data: FormData) =>
  adminApiSend(ADMIN_ROUTES.BANNERS, 'POST', data, true);

export const updateBanner = (id: number | string, data: unknown) =>
  adminApiSend(`${ADMIN_ROUTES.BANNERS}/${id}`, 'PATCH', data);

export const deleteBanner = (id: number | string) =>
  adminApiSend(`${ADMIN_ROUTES.BANNERS}/${id}`, 'DELETE');

export const fetchStaff = (params: AdminQueryParams) =>
  adminApiGet(ADMIN_ROUTES.STAFF, buildAdminQuery({
    ...params,
    country: params.country ? mapCountryCode(String(params.country)) : undefined,
    status: params.status ? mapStatusFilter(String(params.status)) : undefined,
  }));

export const createStaff = (data: unknown) =>
  adminApiSend(ADMIN_ROUTES.STAFF, 'POST', data);

export const updateStaff = (id: number | string, data: unknown) =>
  adminApiSend(`${ADMIN_ROUTES.STAFF}/${id}`, 'PATCH', data);

export const deleteStaff = (id: number | string) =>
  adminApiSend(`${ADMIN_ROUTES.STAFF}/${id}`, 'DELETE');

export const fetchStaffActivity = (id: number | string, params: AdminQueryParams) =>
  adminApiGet(`${ADMIN_ROUTES.STAFF}/${id}/activity`, buildAdminQuery(params));
