import { useIntl } from 'react-intl';

const Heading = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="mb-10 text-center">
      <h1 className="text-3xl leading-normal">
        {formatMessage({ defaultMessage: 'Resize image(s)' })}
        {/* <br /> */}
        {/* <span>{formatMessage({ defaultMessage: 'simply and safely' })}</span> */}
      </h1>
    </div>
  );
};

export default Heading;
