import desertlion from '../../../lib/index';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

desertlion.init({ appId: '123' });

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
