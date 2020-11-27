import PrivateRoute from '@/components/PrivateRouets';
import AppProvider from '@/hooks';
import Globalstyles from '@/styles/Globalstyles';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Globalstyles />
      <PrivateRoute>
        <Component {...pageProps} />
      </PrivateRoute>
    </AppProvider>
  );
}

export default MyApp;
