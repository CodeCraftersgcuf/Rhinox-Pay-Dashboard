export const formatNumber = (value: number | string | null | undefined): string => {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return '0';
  return num.toLocaleString('en-US');
};

export const formatCurrency = (
  value: number | string | null | undefined,
  currency = 'USD',
  symbol?: string
): string => {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return `${symbol || '$'}0`;
  if (symbol) return `${symbol}${formatNumber(num)}`;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `$${formatNumber(num)}`;
  }
};

export const formatDateTime = (value: string | Date | null | undefined): string => {
  if (!value) return '-';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatGrowth = (value: number | string | null | undefined): string => {
  const num = Number(value || 0);
  if (num >= 1000) return `+${Math.round(num / 1000)}K`;
  if (num > 0) return `+${num}`;
  return String(num);
};

const COUNTRY_CODE_MAP: Record<string, string> = {
  Nigeria: 'NG',
  Ghana: 'GH',
  Kenya: 'KE',
  'South Africa': 'ZA',
  Botswana: 'BW',
  Tanzania: 'TZ',
  Uganda: 'UG',
};

const COUNTRY_NAME_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_CODE_MAP).map(([name, code]) => [code, name])
);

export const mapCountryCode = (country: string): string | undefined => {
  if (country === 'Country' || country === 'All Countries' || country === 'All') return undefined;
  return COUNTRY_CODE_MAP[country] || country.slice(0, 2).toUpperCase();
};

export const mapCountryName = (code: string | null | undefined): string => {
  if (!code) return '-';
  return COUNTRY_NAME_MAP[code.toUpperCase()] || code;
};

export const formatRegions = (regions: unknown): string => {
  if (!regions) return '-';
  if (Array.isArray(regions)) {
    return regions.map((region) => mapCountryName(String(region))).join(' ,');
  }
  return String(regions);
};

export const mapApiUser = (user: Record<string, any> | null | undefined) => {
  if (!user) return null;
  const name =
    user.name ||
    [user.firstName, user.lastName].filter(Boolean).join(' ').trim() ||
    user.email ||
    '';
  return {
    id: user.id,
    username: user.rhinoxPayId || user.username,
    name,
    email: user.email || '',
    phone: user.phone || '',
    kycStatus: user.kyc?.status || user.kycStatus || 'unverified',
    country: user.country?.name || user.country?.code || user.country || null,
    isActive: user.isActive,
    createdAt: user.createdAt,
    lastLogin: user.lastLoginAt || user.lastLogin,
  };
};

export const mapStatusFilter = (status: string): string | undefined => {
  if (!status || status === 'All Status' || status === 'All') return undefined;
  const map: Record<string, string> = {
    Successful: 'completed',
    Pending: 'pending',
    Failed: 'failed',
    Active: 'active',
    Inactive: 'inactive',
    Resolved: 'resolved',
    'In session': 'in_session',
  };
  return map[status] || status.toLowerCase().replace(/\s+/g, '_');
};
