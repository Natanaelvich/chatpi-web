import { useRouter } from 'next/router';
import React, { ElementType, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function withAuth(WrappedComponent: ElementType) {
  const Wrapper = (props: unknown) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('GoBarbertoken');

      if (!token) {
        router.replace('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
