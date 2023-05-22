import Head from 'next/head';
import CSSBaseLine from '@mui/material/CssBaseline';
import theme from '@/utils/theme';
import createEmotionCache from '@/utils/createEmotionCache';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CacheProvider, EmotionCache } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.innerHeight * .01;
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    };

    updateViewportHeight();

    window.addEventListener('resize', updateViewportHeight);

    return () => window.removeEventListener('resize', updateViewportHeight)
  })
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>nTask</title>
        <meta name='viewport' content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CSSBaseLine />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
