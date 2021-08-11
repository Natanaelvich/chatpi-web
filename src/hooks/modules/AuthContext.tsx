import Router from 'next/router';
import React, { createContext, useCallback, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import api from '../../services/api';

interface SingnCredencials {
  email: string;
  password: string;
}
interface AuthState {
  user: User;
}
interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

interface AuthContextData {
  user: User;
  signIn(crendencial: SingnCredencials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function signOut() {
  Router.push('/');

  Cookies.remove('chatpitoken');
  Cookies.remove('chatpiuser');
}

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = Cookies.get('chatpiuser');
    if (user) {
      return { user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user, refresh_token } = response.data;

    Cookies.set('chatpirefreshtoken', String(refresh_token));
    Cookies.set('chatpitoken', String(token));
    Cookies.set('chatpiuser', JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;
    setData({ user });
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      Cookies.set('chatpiuser', JSON.stringify(user));
      setData({
        user,
      });
    },
    [setData],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
