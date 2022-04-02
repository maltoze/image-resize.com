import { WrapPageElementBrowserArgs } from 'gatsby';
import React from 'react';
import { IntlProvider } from 'react-intl';
import Layout from './components/Layout';
import locales from './i18n';
import { isBrowser } from './utils/common';

export default function wrapPageElement({
  element,
  props,
}: WrapPageElementBrowserArgs) {
  let lang: string;
  const locale = props.pageContext.locale as string;
  if (isBrowser) {
    lang = locale ?? navigator.language;
    if (!(lang in locales)) {
      lang = navigator.language.split(/[-_]/)[0];
    }
    if (!(lang in locales)) {
      lang = 'en';
    }
  } else {
    lang = locale ?? 'en';
  }

  return (
    <IntlProvider locale={lang} messages={locales[lang].messages}>
      <Layout {...props}>{element}</Layout>
    </IntlProvider>
  );
}
