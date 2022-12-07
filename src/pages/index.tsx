import ImageSelector from '../components/ImageSelector';
import FaqSection from '../components/FaqSection';
import FeatureSection from '../components/FeatureSection';
import Hero from '../components/Hero';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';

const messages = defineMessages({
  copy: {
    id: 'copy',
    defaultMessage: `<span> image-resize.com </span> is a website designed specifically to meet your needs for resizing images. We offer a simple and easy-to-use batch processing function that allows you to easily resize multiple images at once.  In addition, we also offer a variety of different resizing options that support both percentage and specific values. For example, you can set the width and height of an image, or set the scaling ratio. In terms of security, we promise not to save your images to ensure the privacy of your data. Additionally, our service is completely free to use, so you don't have to pay anything to use it. Overall, <span> image-resize.com </span> is a very useful website for anyone who needs to resize images.`,
  },
});

const IndexPage = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="mt-10 space-y-10 divide-y dark:divide-slate-800 md:space-y-20">
      <section>
        <Hero />
        <ImageSelector />
      </section>
      <FeatureSection />
      <section>
        <article className="prose prose-slate pt-10 dark:prose-invert md:pt-20 lg:prose-xl">
          <h3>
            {formatMessage({
              defaultMessage: 'Resize image should be easy.',
            })}
          </h3>
          <p>
            <FormattedMessage
              {...messages.copy}
              values={{
                span: (...chunks: any) => (
                  <span className="border-b-2 border-b-primary-700">
                    {chunks}
                  </span>
                ),
              }}
            />
          </p>
        </article>
      </section>
      <FaqSection />
    </div>
  );
};

export default IndexPage;
