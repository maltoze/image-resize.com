import messages_zh_cn from './translations/compiled/zh-CN.json';
import messages_zh_tw from './translations/compiled/zh-TW.json';
import messages_en from './translations/compiled/en.json';
import { MessageFormatElement } from 'react-intl';

export type SupportedLocale = 'en' | 'zh-CN' | 'zh-TW';

type LocaleOption = {
  path: string;
  label: string;
  title: string;
  messages: Record<string, MessageFormatElement[]>;
};

type LocalesConfig = Record<string, Partial<LocaleOption>>;

const locales: LocalesConfig = {
  en: {
    path: 'en',
    label: 'English',
    title: 'Resize images online',
    messages: messages_en,
  },
  'zh-CN': {
    path: 'zh-CN',
    label: '简体中文',
    messages: messages_zh_cn,
  },
  'zh-TW': {
    path: 'zh-TW',
    label: '繁體中文',
    messages: messages_zh_tw,
  },
};

export default locales;
