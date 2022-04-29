import { useIntl } from 'react-intl';

const Heading = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="mb-4 text-center sm:mb-10">
      <h1 className="text-3xl leading-tight sm:text-4xl sm:leading-snug">
        {formatMessage({ defaultMessage: 'Resize Images' })}
        <br />
        {formatMessage({ defaultMessage: 'fast, simple, and' })}{' '}
        <span className="text-primary-700">
          {formatMessage({ defaultMessage: 'privacy' })}
        </span>
      </h1>
    </div>
  );
};

export default Heading;
