import { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DEFAULT_SESSION_TIMEOUT } from '@/constants';
import { auth } from '@/models';

export interface AuthState {
  isAuthenticated: boolean;
  user?: auth.Auth | null;
}

type AuthContextType = {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
};

export const AuthContext = createContext<AuthContextType>({
  authState: {
    isAuthenticated: true,
    user: null
  },

  setAuthState: () => {
    throw new Error('setAuthState function must be overridden');
  }
});

const WHITELIST_PATH = ['/test'];
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState<AuthState>(() => {
    const timeout = localStorage.getItem('sessionTimeout');
    if (new Date().getTime() < Number(timeout)) {
      const isAuthenticated =
        localStorage.getItem('isAuthenticated') === 'true';
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      return { isAuthenticated, user };
    }

    return {
      isAuthenticated: false,
      user: null
    };
  });
  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem(
        'isAuthenticated',
        String(authState.isAuthenticated)
      );
      localStorage.setItem('user', JSON.stringify(authState.user));
      localStorage.setItem(
        'sessionTimeout',
        String(new Date().getTime() + DEFAULT_SESSION_TIMEOUT)
      );
    } else {
      localStorage.clear();
      console.log('location.pathname', location.pathname);
      if (
        location.pathname !== '/login' &&
        WHITELIST_PATH.includes(location.pathname)
      ) {
        navigate(location.pathname);
      } else navigate('/login');
    }
  }, [authState, location.pathname, navigate]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
