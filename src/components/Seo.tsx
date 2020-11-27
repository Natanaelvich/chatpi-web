import React from 'react';

const Seo: React.FC = () => {
  return (
    <>
      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
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
      <meta property="og:image" content="static/seo.png" />
      <meta property="og:image:secure_url" content="static/seo.png" />
      <meta property="og:image:alt" content="Thumbnail" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta property="og:url" content="https://pi-unifacema.vercel.app/" />

      <meta name="twitter:title" content="Chat PI" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@natanaelvich" />
      <meta name="twitter:creator" content="@natanaelvich" />
      <meta name="twitter:image" content="static/seo.png" />
      <meta name="twitter:image:src" content="static/seo.png" />
      <meta name="twitter:image:alt" content="Thumbnail" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="620" />
    </>
  );
};

export default Seo;
