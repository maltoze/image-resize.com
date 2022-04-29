import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';

const messages = defineMessages({
  'faq-question-0': {
    id: 'faq-question-0',
    defaultMessage: 'Is this free?',
  },
  'faq-question-1': {
    id: 'faq-question-1',
    defaultMessage: 'Can I use it on my phone?',
  },
  'faq-question-2': {
    id: 'faq-question-2',
    defaultMessage: 'Do you keep my images?',
  },
  'faq-question-3': {
    id: 'faq-question-3',
    defaultMessage: 'How to resize images?',
  },
  'faq-question-4': {
    id: 'faq-question-4',
    defaultMessage: 'Can I resize images in bulk?',
  },
  'faq-answer-0': {
    id: 'faq-answer-0',
    defaultMessage: 'Yes, absolutely. No hidden fees or subscriptions.',
  },
  'faq-answer-1': {
    id: 'faq-answer-1',
    defaultMessage: 'Yes, you can. We support all modern browsers.',
  },
  'faq-answer-2': {
    id: 'faq-answer-2',
    defaultMessage:
      "No, we don't. We don't store your images. We don't even know where they are.",
  },
  'faq-answer-3': {
    id: 'faq-answer-3',
    defaultMessage: `That's easy. Just follow the steps below.
    <br></br>
    - Select images from your device.
    <br></br>
    - Choose the size you want to resize them to.
    <br></br>
    - Click the "Save" button to download the resized images.
    `,
  },
  'faq-answer-4': {
    id: 'faq-answer-4',
    defaultMessage:
      'Yes, you can. Just select multiple images and click the button.',
  },
});

const faqs = 5;

const FaqSection = () => {
  const { formatMessage } = useIntl();

  return (
    <section className="py-5 md:py-10">
      <h1 className="mb-6 text-center text-3xl">
        {formatMessage({ defaultMessage: 'Frequently asked questions' })}
      </h1>
      <div className="space-y-4 pt-4">
        {[...Array(faqs).keys()].map((_, index) => (
          <Disclosure
            as="div"
            key={index}
            className="rounded-md border dark:border-slate-800"
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  as="div"
                  className="flex cursor-pointer justify-between p-4 md:p-5"
                >
                  <h1>
                    <FormattedMessage
                      {...messages[
                        `faq-question-${index}` as keyof typeof messages
                      ]}
                    />
                  </h1>
                  <ChevronDownIcon
                    className={classNames('h-4 w-4 transition-transform', {
                      'rotate-180': open,
                    })}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="-mt-1 px-4 pb-4 text-slate-500 md:px-5 md:pb-5">
                    <p className="leading-relaxed md:leading-loose">
                      <FormattedMessage
                        {...messages[
                          `faq-answer-${index}` as keyof typeof messages
                        ]}
                        values={{
                          br: () => <br />,
                        }}
                      />
                    </p>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
      <div className="py-4 text-center">
        <h1 className="py-5 text-2xl">
          {formatMessage({ defaultMessage: 'Still have a Question?' })}
        </h1>
        <p className="text-sm leading-normal text-slate-500">
          {formatMessage({
            defaultMessage:
              "If you can't find answer to your question in our FAQ, just contact us at",
          })}{' '}
          <span className="break-all bg-gradient-to-tr from-primary-700 to-sky-600 bg-clip-text text-transparent">
            help@image-resize.com
          </span>
        </p>
      </div>
    </section>
  );
};

export default FaqSection;
