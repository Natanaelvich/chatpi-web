import AppProvider from '@/hooks';
import Globalstyles from '@/styles/Globalstyles';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Globalstyles />
      <Component {...pageProps} />
      <NextNprogress
        color="#3f3a79"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
    </AppProvider>
  );
}

export default MyApp;
