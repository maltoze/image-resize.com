import React from 'react';
import { Helmet } from 'react-helmet';

type SEOProps = {
  [key: string]: string;
};

const SEO = ({ lang, title, description }: Partial<SEOProps>) => {
  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title || 'Resize images online'}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SEO;
