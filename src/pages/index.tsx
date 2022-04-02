import React from 'react';
import SEO from '../components/SEO';
import locales from '../i18n';
import { useIntl } from 'react-intl';
import InformationCircleIcon from '@heroicons/react/outline/InformationCircleIcon';
import UploadIcon from '@heroicons/react/outline/UploadIcon';

const IndexPage = () => {
  const { formatMessage, locale } = useIntl();
  const localeConfig = locales[locale];

  return (
    <>
      <SEO title={localeConfig.title} lang={locale} />
      <div>
        <div className="text-center px-6 md:px-3 w-full max-w-3xl mx-auto">
          <div className="pt-20 pb-12">
            <h1 className="text-3xl">
              {formatMessage({ defaultMessage: 'Resize image(s) safely' })}
              <div className="tooltip" data-tip="We do not store your images.">
                <label className="btn btn-ghost btn-xs btn-circle align-top">
                  <InformationCircleIcon className="w-4 h-4" />
                </label>
              </div>
            </h1>
          </div>
          <div>
            <div className="shadow-[0_0_0px_rgba(0,0,0,0.1)] rounded-xl border-dashed border-primary cursor-pointer bg-base-200">
              <div className="py-12">
                <UploadIcon className="w-12 h-12 mx-auto mb-1" />
                <button className="btn btn-primary compact my-3">
                  {formatMessage({ defaultMessage: 'Select Image' })}
                </button>
                <div className="hidden md:block">
                  {formatMessage({ defaultMessage: 'or drop images here' })}
                </div>
              </div>
            </div>
            <div className="text-xs py-2 px-4 hidden md:block">
              Paste image using
              <kbd className="kbd kbd-sm ml-2">ctrl</kbd>+
              <kbd className="kbd kbd-sm">v</kbd>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
