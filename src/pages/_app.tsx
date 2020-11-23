import AppProvider from '@/hooks';
import Globalstyles from '@/styles/Globalstyles';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Globalstyles />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
