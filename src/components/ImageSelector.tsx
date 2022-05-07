import classNames from 'classnames';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import useImageClipboard from '../hooks/imageClipboard';
import { addImageFilesAtom, selectedImageFilesAtom } from '../store/jotai';
import { PhotographIcon, UploadIcon, XIcon } from '@heroicons/react/outline';
import ImageResizer from './ImageResizer';
import ImageTable from './ImageTable';

const ImageSelector = () => {
  const { formatMessage } = useIntl();

  const selectedImageFiles = useAtomValue(selectedImageFilesAtom);
  const addImageFiles = useUpdateAtom(addImageFilesAtom);

  useImageClipboard();

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
    open,
  } = useDropzone({
    accept: 'image/*',
    noClick: selectedImageFiles.length > 0,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      addImageFiles(acceptedFiles);
    }
  }, [addImageFiles, acceptedFiles]);

  return (
    <div className="flex flex-col space-y-2 md:flex-row">
      <div
        className={classNames('w-full duration-300 md:transition-[width]', {
          'md:w-2/3': selectedImageFiles.length > 0,
        })}
      >
        <div
          className={classNames(
            'relative flex items-center justify-center rounded-lg border-dashed border-slate-300 pt-2 outline-none dark:border-slate-500 md:h-64',
            {
              'cursor-default overflow-y-auto border':
                selectedImageFiles.length > 0,
            },
            {
              'flex-col md:bg-slate-100 md:dark:bg-slate-800':
                selectedImageFiles.length === 0,
            },
            { 'h-64 resize-y': selectedImageFiles.length > 2 }
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {selectedImageFiles.length === 0 ? (
            <div className="text-center">
              <UploadIcon className="mx-auto mb-1 h-12 w-12" />
              <button className="btn btn-primary btn-lg my-3 outline-none">
                {formatMessage({ defaultMessage: 'Select Image' })}
              </button>
              <div className="hidden md:block">
                {formatMessage({ defaultMessage: 'or drop images here' })}
              </div>
            </div>
          ) : (
            <ImageTable />
          )}
          <div
            className={classNames(
              'absolute -mt-2 flex h-full w-full items-center justify-center rounded-md bg-opacity-50 backdrop-blur-sm',
              { hidden: !isDragActive },
              { block: isDragActive },
              {
                'animate-pulse bg-green-600 dark:bg-green-800/50': isDragAccept,
              },
              { 'bg-red-600 dark:bg-red-800/50': isDragReject }
            )}
          >
            {isDragAccept && (
              <PhotographIcon className="h-24 w-24 stroke-[1.5]" />
            )}
            {isDragReject && <XIcon className="h-24 w-24 stroke-[1.5]" />}
          </div>
        </div>
        <div className="mt-3 hidden items-center justify-center gap-3 divide-x md:flex">
          {selectedImageFiles.length > 0 && (
            <button onClick={open}>
              <PhotographIcon className="h-5 w-5 text-primary-700" />
            </button>
          )}
          <div className="px-3 text-center text-xs text-slate-500">
            {formatMessage(
              {
                defaultMessage:
                  'Paste image using <kbd>ctrl</kbd>+<kbd>v</kbd>',
              },
              {
                kbd: (...chunks) => <kbd className="kbd">{chunks}</kbd>,
              }
            )}
          </div>
        </div>
      </div>
      {selectedImageFiles.length > 0 && <ImageResizer />}
    </div>
  );
};
export default ImageSelector;
