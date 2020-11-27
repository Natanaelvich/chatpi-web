import { useRouter } from 'next/router';
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
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
  avatar_url: string;
}

interface AuthContextData {
  user: User;
  signIn(crendencial: SingnCredencials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@GoBarber:token');
      const user = localStorage.getItem('@Gobarber:user');

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

    if (typeof window !== 'undefined') {
      localStorage.setItem('@GoBarber:token', token);
      localStorage.setItem('@Gobarber:user', JSON.stringify(user));
    }
    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('@Gobarber:token');
      localStorage.removeItem('@Gobarber:user');
    }
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('@Gobarber:user', JSON.stringify(user));
      }

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
