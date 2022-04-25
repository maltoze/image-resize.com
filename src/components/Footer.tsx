import { useIntl } from 'react-intl';

const Footer = () => {
  const { formatMessage } = useIntl();
  return (
    <footer className="mt-auto py-4 text-center text-sm leading-6 text-slate-500">
      <p>
        {formatMessage({
          defaultMessage: `This site won't upload your images.`,
        })}
      </p>
      <p>
        Copyright © {new Date().getFullYear()}- All rights reserved by
        image-resize.com
      </p>
    </footer>
  );
};

export default Footer;
