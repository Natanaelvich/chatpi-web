import Head from 'next/head';

interface SEOprops {
  title: string;
  description?: string;
  image?: string;
  shouldExcludeTitleSuffix?: boolean;
  shouldIndexPage?: boolean;
}

export default function SEO({
  title,
  description,
  image,
  shouldExcludeTitleSuffix = false,
  shouldIndexPage = false,
}: SEOprops) {
  const pageTitle = `${title} ${!shouldExcludeTitleSuffix ? '| ChatPI' : ''}`;
  const pageImage = image
    ? `${process.env.NEXT_PUBLIC_WEB_URL}/${image}`
    : null;
  const pageImage2 = `${process.env.NEXT_PUBLIC_WEB_URL}Seo.png`;
  return (
    <Head>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      {image && <meta name="image" content={pageImage} />}
      {shouldIndexPage && <meta name="robots" content="noindex,no follow" />}

      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta name="MobileOptimized" content="320" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="theme-color" content="#121214" />
      <meta name="msapplication-TileColor" content="#121214" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="google" content="notranslate" />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={pageTitle} />

      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rocketseat" />
      <meta name="twitter:creator" content="@rocketseat" />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:src" content={pageImage} />
      <meta name="twitter:image:alt" content="Thumbnail" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="620" />

      <meta property="og:image" itemProp="image" content={pageImage2} />
      <meta property="og:type" content="website" />
      <meta property="og:updated_time" content="1440432930" />
    </Head>
  );
}
