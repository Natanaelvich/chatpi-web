import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import { useAuth } from '@/hooks/modules/AuthContext';

export const ProtectRoute: React.FC = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading || (!user && window.location.pathname !== '/')) {
    return <LoadingScreen />;
  }
  return <>{children}</>;
};
