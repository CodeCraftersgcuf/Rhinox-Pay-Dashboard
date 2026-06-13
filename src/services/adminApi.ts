import apiConfig, { ADMIN_ROUTES } from '../api/apiConfig';
import { getAdminToken, clearAdminAuth } from '../services/authService';

const buildUrl = (endpoint: string, params?: Record<string, unknown>) => {
  const url = new URL(`${apiConfig.baseURL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'All' && value !== 'All Time' && value !== 'All Status' && value !== 'Country') {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
};

const authHeaders = (): Record<string, string> => {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminApiGet = async (endpoint: string, params?: Record<string, unknown>) => {
  const response = await fetch(buildUrl(endpoint, params), {
    headers: { ...apiConfig.headers, ...authHeaders() },
  });
  const json = await response.json();
  if (response.status === 401) {
    clearAdminAuth();
    window.location.href = '/';
    throw new Error(json.message || 'Unauthorized');
  }
  if (!response.ok) throw new Error(json.message || 'Request failed');
  return json.data;
};

export const adminApiSend = async (
  endpoint: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  data?: unknown,
  isFormData = false
) => {
  const headers: Record<string, string> = { ...authHeaders() };
  if (!isFormData) headers['Content-Type'] = 'application/json';

  const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
    method,
    headers,
    body: isFormData ? (data as BodyInit) : data ? JSON.stringify(data) : undefined,
  });
  const json = await response.json();
  if (response.status === 401) {
    clearAdminAuth();
    window.location.href = '/';
    throw new Error(json.message || 'Unauthorized');
  }
  if (!response.ok) throw new Error(json.message || 'Request failed');
  return json.data;
};

export { ADMIN_ROUTES };
