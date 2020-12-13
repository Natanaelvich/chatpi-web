import { useAuth } from '@/hooks/modules/AuthContext';
import React, { useEffect } from 'react';

const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.pathname = '/';
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
