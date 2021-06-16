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
    const token = Cookies.get('@chatpi:token');
    const user = Cookies.get('@chatpi:user');
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    Cookies.set('@chatpi:token', String(token));
    Cookies.set('@chatpi:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    router.push('/');

    Cookies.remove('@chatpi:token');
    Cookies.remove('@chatpi:user');
  }, [router]);

  const updateUser = useCallback(
    (user: User) => {
      Cookies.set('@chatpi:user', JSON.stringify(user));
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

  return context;
}

export { AuthProvider, useAuth };
