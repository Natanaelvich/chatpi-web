import React, { useEffect } from 'react';

const PrivateTest: React.FC = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@GoBarber:token');
      const user = localStorage.getItem('@Gobarber:user');

      if (!token || !user) {
        window.location.href = '/';
      }
      // api.defaults.headers.authorization = `Bearer ${token}`;
    }
  }, []);

  return <>{children}</>;
};

export default PrivateTest;
