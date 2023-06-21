import Head from 'next/head';
import CSSBaseLine from '@mui/material/CssBaseline';
import theme from '@/utils/theme';
import createEmotionCache from '@/utils/createEmotionCache';
import RootLayout from '@/components/RootLayout';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CacheProvider, EmotionCache } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Instant Tasks</title>
        <meta name='viewport' content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CSSBaseLine />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
