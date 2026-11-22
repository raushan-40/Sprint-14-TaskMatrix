import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const TOKEN_STORAGE_KEY = 'token';
const USER_STORAGE_KEY = 'taskmatrix_user';

function readStoredToken() {
  try {
    const value = localStorage.getItem(TOKEN_STORAGE_KEY);
    return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null;
  } catch {
    return null;
  }
}

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;

    const safeUser = {
      id: typeof parsed.id === 'string' ? parsed.id : '',
      name: typeof parsed.name === 'string' ? parsed.name : '',
      email: typeof parsed.email === 'string' ? parsed.email : '',
    };

    return safeUser.id || safeUser.email || safeUser.name ? safeUser : null;
  } catch {
    return null;
  }
}

function writeSession(token, user) {
  if (typeof token !== 'string' || token.trim().length === 0) {
    throw new Error('Authentication succeeded, but no valid token was returned.');
  }

  localStorage.setItem(TOKEN_STORAGE_KEY, token.trim());

  if (user && typeof user === 'object') {
    const safeUser = {
      id: user.id ? String(user.id) : '',
      name: user.name ? String(user.name) : '',
      email: user.email ? String(user.email) : '',
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(safeUser));
    return safeUser;
  }

  localStorage.removeItem(USER_STORAGE_KEY);
  return null;
}

function clearSession() {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch {
    // Ignore storage access errors
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStoredToken());
  const [user, setUser] = useState(() => readStoredUser());

  const setAuthSession = useCallback((nextToken, nextUser) => {
    const sanitizedUser = writeSession(nextToken, nextUser);
    setToken(nextToken.trim());
    setUser(sanitizedUser);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      setAuthSession,
      logout,
    }),
    [token, user, setAuthSession, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}