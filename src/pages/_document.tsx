import Seo from '@/components/Seo';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Redressed&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <title>Chat PI</title>
          <meta name="title" content="Chat PI" />
          <meta
            name="description"
            content="Projeto integrador ADS 4º período Unifacema 2020."
          />

          {/* my config */}
          <meta
            name="image"
            content="https://mundotech.s3.amazonaws.com/seo.png"
          />
          <meta name="robots" content="noindex" />
          <link rel="canonical" href="https://pi-unifacema.vercel.app/" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
          <meta name="MobileOptimized" content="320" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="theme-color" content="#ff008e" />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="msapplication-TileColor" content="#ff008e" />
          <meta name="google" content="notranslate" />

          <meta property="og:url" content="https://pi-unifacema.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Natanael da silva lima | DoWhile 2020"
          />
          <meta
            property="og:description"
            content="Junte-se a Natanael da silva lima no DoWhile, um evento online que vêm com a missão de reunir todo o ecossistema de programação em busca de um mesmo propósito: o aprendizado contínuo."
          />
          <meta property="og:locale" content="pt_BR" />
          <meta
            property="og:site_name"
            content="Natanael da silva lima | DoWhile 2020"
          />
          <meta
            property="og:image"
            content="https://mundotech.s3.amazonaws.com/seo.png"
          />
          <meta
            property="og:image:secure_url"
            content="https://mundotech.s3.amazonaws.com/seo.png"
          />
          <meta property="og:image:alt" content="Boost yourself" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Natanael da silva lima | DoWhile 2020"
          />
          <meta name="twitter:site" content="@rocketseat" />
          <meta name="twitter:creator" content="@rocketseat" />
          <meta
            name="twitter:image"
            content="https://mundotech.s3.amazonaws.com/seo.png"
          />
          <meta
            name="twitter:image:src"
            content="https://mundotech.s3.amazonaws.com/seo.png"
          />
          <meta name="twitter:image:alt" content="Boost yourself" />
          <meta name="twitter:image:width" content="1200" />
          <meta name="twitter:image:height" content="630" />

          {/* my config */}

          {/* <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
          <meta name="MobileOptimized" content="320" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="theme-color" content="#121214" />
          <meta name="msapplication-TileColor" content="#121214" />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="google" content="notranslate" />

          <meta property="og:title" content="Chat PI" />
          <meta
            property="og:description"
            content="Projeto integrador ADS 4º período Unifacema 2020."
          />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Chat PI" />
          <meta
            property="og:image"
            content="https://mundotech.s3.amazonaws.com/seo.png"
          />
          <meta
            property="og:image:secure_url"
            content="https://mundotech.s3.amazonaws.com/seo.png"
          />
          <meta property="og:image:alt" content="Thumbnail" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta property="og:url" content="https://pi-unifacema.vercel.app/" />

          <meta name="twitter:title" content="Chat PI" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@natanaelvich" />
          <meta name="twitter:creator" content="@natanaelvich" />
          <meta
            name="twitter:image"
            content="https://mundotech.s3.amazonaws.com/seo.png"
          />
          <meta
            name="twitter:image:src"
            content="https://mundotech.s3.amazonaws.com/seo.png"
          />
          <meta name="twitter:image:alt" content="Thumbnail" />
          <meta name="twitter:image:width" content="1200" />
          <meta name="twitter:image:height" content="620" /> */}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
