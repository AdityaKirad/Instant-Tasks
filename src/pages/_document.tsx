import React from 'react';
import Document, {Html,Head,Main,NextScript,DocumentProps,DocumentContext,} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { AppType } from 'next/app';
import theme, { open_sans } from '@/utils/theme';
import createEmotionCache from '@/utils/createEmotionCache';
import { MyAppProps } from './_app';

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="en" className={open_sans.className}>
      <Head>
        <meta name ="title" content ="Instant Tasks"/>
        <meta name="description" content="Organize your tasks" />
        <meta name ="copyright" content ="Aditya Kirad"/>
        <meta property ="og:type" content ="website"/>
        <meta property ="og:url" content ="https://instant-tasks.netlify.app/"/>
        <meta property ="og:title" content ="Instant Tasks"/>
        <meta property ="og:description" content ="Day to Day Task Manager Built With NextJs, Zustand, MUI and more..."/>
        <meta property ="og:image" content ="http://res.cloudinary.com/dpu5ywrox/image/upload/v1687361204/twe3kr9fo7uqjyffm4ea.png"/>
        <meta property ="twitter:card" content ="summary_large_image"/>
        <meta property ="twitter:url" content ="https://instant-tasks.netlify.app/"/>
        <meta property ="twitter:title" content ="Instant Tasks"/>
        <meta property ="twitter:description" content ="Day to Day Task Manager Built With NextJs, Zustand, MUI and more..."/>
        <meta property ="twitter:image" content ="http://res.cloudinary.com/dpu5ywrox/image/upload/v1687361204/twe3kr9fo7uqjyffm4ea.png"/>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};