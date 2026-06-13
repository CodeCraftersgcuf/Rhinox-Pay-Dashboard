// Same default API host as Rhinox_Pay_App (utils/apiConfig.ts)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://rhinoxpay.hmstech.org/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const ADMIN_ROUTES = {
  AUTH: {
    LOGIN: '/admin/auth/login',
    ME: '/admin/auth/me',
    LOGOUT: '/admin/auth/logout',
  },
  DASHBOARD: {
    STATS: '/admin/dashboard/stats',
    CHARTS: '/admin/dashboard/charts',
    LATEST_USERS: '/admin/dashboard/latest-users',
    WALLETS: '/admin/dashboard/wallets',
  },
  USERS: '/admin/users',
  TRANSACTIONS: '/admin/transactions',
  KYC: '/admin/kyc',
  WALLETS: {
    OVERVIEW: '/admin/wallets/overview',
    USERS: '/admin/wallets/users',
  },
  EXCHANGE: {
    RATES: '/admin/exchange/rates',
    FEES: '/admin/fees',
  },
  P2P: {
    STATS: '/admin/p2p/stats',
    ADS: '/admin/p2p/ads',
    ORDERS: '/admin/p2p/orders',
    APPEALS: '/admin/p2p/appeals',
    PAYMENT_METHODS: '/admin/p2p/payment-methods',
  },
  MASTER_WALLETS: '/admin/master-wallets',
  MASTER_WALLET_ACTIVITY: '/admin/master-wallets/activity',
  ANALYTICS: {
    GENERAL: '/admin/analytics/general',
    FRAUD: '/admin/analytics/fraud',
  },
  REWARDS: {
    RULES: '/admin/rewards/rules',
    CLAIMS: '/admin/rewards/claims',
  },
  SUPPORT: {
    CHATS: '/admin/support/chats',
  },
  NOTIFICATIONS: '/admin/notifications',
  BANNERS: '/admin/banners',
  STAFF: '/admin/staff',
};

export default apiConfig;
