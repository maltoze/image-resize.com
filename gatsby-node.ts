import { CreatePageArgs, CreateWebpackConfigArgs } from 'gatsby';
import locales from './src/i18n';
import { removeTrailingSlash } from './src/utils/common';

export function onCreatePage({ page, actions }: CreatePageArgs) {
  const { createPage } = actions;
  Object.keys(locales).forEach((lang) => {
    const localizedPath = `${locales[lang].path}${page.path}`;
    createPage({
      ...page,
      path: removeTrailingSlash(localizedPath),
      context: {
        ...page.context,
        locale: lang,
      },
    });
  });
}

export function onCreateWebpackConfig({ actions }: CreateWebpackConfigArgs) {
  actions.setWebpackConfig({
    // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
    resolve: {
      alias: {
        '@formatjs/icu-messageformat-parser':
          '@formatjs/icu-messageformat-parser/no-parser',
      },
    },
  });
}
