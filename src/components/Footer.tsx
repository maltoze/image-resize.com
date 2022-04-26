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
        <span className="hidden md:inline">Copyright </span>©{' '}
        {new Date().getFullYear()}{' '}
        <span className="hidden md:inline">All rights reserved by </span>
        image-resize.com
      </p>
    </footer>
  );
};

export default Footer;
