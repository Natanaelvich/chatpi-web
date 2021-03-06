import { useRouter } from 'next/router';
import React, { createContext, useCallback, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import api from '../../services/api';

interface SingnCredencials {
  email: string;
  password: string;
}
interface AuthState {
  token: string;
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

const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();

  const [data, setData] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('GoBarbertoken');
      const user = Cookies.get('Gobarberuser');

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        return { token, user: JSON.parse(user) };
      }
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    Cookies.set('GoBarbertoken', String(token));
    Cookies.set('Gobarberuser', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    Cookies.remove('GoBarbertoken');
    Cookies.remove('Gobarberuser');

    setData({
      token: null,
      user: null,
    });

    router.push('/');
  }, [router]);

  const updateUser = useCallback(
    (user: User) => {
      Cookies.set('Gobarberuser', JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
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

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
