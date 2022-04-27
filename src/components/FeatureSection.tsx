import {
  CursorClickIcon,
  DocumentDuplicateIcon,
  ShieldCheckIcon,
} from '@heroicons/react/outline';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  'feature-title-0': {
    id: 'feature-title-0',
    defaultMessage: 'Easy to use',
  },
  'feature-title-1': {
    id: 'feature-title-1',
    defaultMessage: 'Privacy',
  },
  'feature-title-2': {
    id: 'feature-title-2',
    defaultMessage: 'Batch image resizing',
  },
  'feature-text-0': {
    id: 'feature-text-0',
    defaultMessage:
      'Select images from your device and resize them to your liking.',
  },
  'feature-text-1': {
    id: 'feature-text-1',
    defaultMessage:
      "We won't upload your images. All operations are done on your device.",
  },
  'feature-text-2': {
    id: 'feature-text-2',
    defaultMessage: 'You can select multiple images and resize them at once.',
  },
});

const features = [
  {
    icon: CursorClickIcon,
  },
  {
    icon: ShieldCheckIcon,
  },
  {
    icon: DocumentDuplicateIcon,
  },
];

const FeatureSection = () => {
  return (
    <section className="grid grid-cols-1 gap-5 py-5 px-1 md:grid-cols-3 md:py-10">
      {features.map((feature, index) => (
        <div key={index}>
          <div className="rounded py-2">
            <feature.icon className="h-14 w-14 rounded-md bg-slate-100 stroke-1 p-2 dark:bg-slate-700 dark:text-slate-100" />
          </div>
          <h1 className="py-3 text-lg">
            <FormattedMessage
              {...messages[`feature-title-${index}` as keyof typeof messages]}
            />
          </h1>
          <p className="text-slate-500">
            <FormattedMessage
              {...messages[`feature-text-${index}` as keyof typeof messages]}
            />
          </p>
        </div>
      ))}
    </section>
  );
};

export default FeatureSection;
