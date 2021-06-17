import { useRouter } from 'next/router';
import React, { ElementType, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LoadingPage from '@/components/LoadingPage';

export default function withAuth(WrappedComponent: ElementType) {
  const Wrapper = (props: unknown) => {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      const tokenCookien = Cookies.get('chatpitoken');

      setToken(tokenCookien);
      if (!tokenCookien) {
        router.replace('/');
      }
      setLoading(false);
    }, [router]);
    if (loading) {
      return <LoadingPage />;
    }

    if (!loading && token) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return Wrapper;
}
