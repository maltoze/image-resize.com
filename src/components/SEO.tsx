import { Helmet } from 'react-helmet';
import { defineMessage, useIntl } from 'react-intl';

const descriptionMessage = defineMessage({
  id: 'head.meta.description',
  defaultMessage:
    'Resize image files to any size you want. Support for almost all image formats, like JPEG, PNG, GIF, TIFF, BMP, ICO, SVG, etc. Resize images in bulk. Reduce image size.',
});

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
      <meta name="description" content={formatMessage(descriptionMessage)} />
      <meta
        property="og:title"
        content={formatMessage({ defaultMessage: 'Resize Images Online' })}
      />
      <meta
        property="og:description"
        content={formatMessage(descriptionMessage)}
      />
      <meta property="og:site_name" content="image-resize.com" />
    </Helmet>
  );
};

export default SEO;
