import { createContext, ReactNode, useEffect, useState } from 'react';

import { user } from '@/models';

export interface AuthState {
  isAuthenticated: boolean;
  user?: user.User | null;
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return { isAuthenticated, user };
  });
  useEffect(() => {
    localStorage.setItem('isAuthenticated', String(authState.isAuthenticated));
    localStorage.setItem('user', JSON.stringify(authState.user));
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
