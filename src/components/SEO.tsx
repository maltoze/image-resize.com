import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

const SEO = () => {
  const { formatMessage, locale } = useIntl();

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>
        {formatMessage({
          defaultMessage: 'Resize Images Online',
        })}
        {' | image-resize.com'}
      </title>
      <meta
        name="description"
        content={formatMessage({
          defaultMessage:
            'Resize images online - Support JPG, PNG, GIF, BMP, SVG etc. - Reduce image size - Simply and safely.',
        })}
      />
      <meta
        property="og:title"
        content={formatMessage({ defaultMessage: 'Resize Images Online' })}
      />
      <meta
        property="og:description"
        content={formatMessage({
          defaultMessage:
            'Resize images online - Support JPG, PNG, GIF, BMP, SVG etc. - Reduce image size - Simply and safely.',
        })}
      />
      <meta property="og:site_name" content="image-resize.com" />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9027498975434534"
        crossOrigin="anonymous"
      ></script>
    </Helmet>
  );
};

export default SEO;
