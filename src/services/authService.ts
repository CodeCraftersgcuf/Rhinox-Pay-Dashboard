const ADMIN_TOKEN_KEY = 'adminAccessToken';

const ADMIN_USER_KEY = 'adminUser';



export const getAdminToken = (): string | null => localStorage.getItem(ADMIN_TOKEN_KEY);

export const setAdminToken = (token: string) => localStorage.setItem(ADMIN_TOKEN_KEY, token);

export const clearAdminAuth = () => {

  localStorage.removeItem(ADMIN_TOKEN_KEY);

  localStorage.removeItem(ADMIN_USER_KEY);

};



export const setAdminUser = (user: Record<string, unknown>) =>

  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));

export const getAdminUser = () => {

  const raw = localStorage.getItem(ADMIN_USER_KEY);

  return raw ? JSON.parse(raw) : null;

};



export const isAdminAuthenticated = () => !!getAdminToken();

