import classNames from 'classnames';
import { useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import useImageClipboard from '../hooks/imageClipboard';
import PhotographIcon from '../icons/PhotographIcon';
import UploadIcon from '../icons/UploadIcon';
import XIcon from '../icons/XIcon';
import { addImageFilesAtom } from '../store/jotai';

const ImageSelector = () => {
  const { formatMessage } = useIntl();

  const addImageFiles = useUpdateAtom(addImageFilesAtom);

  useImageClipboard();

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: 'image/*',
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      addImageFiles(acceptedFiles);
    }
  }, [addImageFiles, acceptedFiles]);

  return (
    <>
      <div
        className={classNames(
          'relative flex cursor-pointer items-center justify-center rounded-xl border-dashed outline-none hover:border-slate-300 dark:hover:border-slate-600 md:h-64 md:bg-slate-100 md:dark:bg-slate-800'
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <UploadIcon className="mx-auto mb-1 h-12 w-12" />
          <button className="btn btn-primary btn-lg my-3 outline-none">
            {formatMessage({ defaultMessage: 'Select Image' })}
          </button>
          <div className="hidden md:block">
            {formatMessage({ defaultMessage: 'or drop images here' })}
          </div>
        </div>
        <div
          className={classNames(
            'absolute z-10 flex h-full w-full items-center justify-center rounded-xl bg-opacity-50 backdrop-blur-sm',
            { hidden: !isDragActive },
            { block: isDragActive },
            { 'bg-green-600 dark:bg-green-800/50': isDragAccept },
            { 'bg-red-600 dark:bg-red-800/50': isDragReject }
          )}
        >
          {isDragAccept && <PhotographIcon className="h-24 w-24" />}
          {isDragReject && <XIcon className="h-24 w-24" />}
        </div>
      </div>
      <div className="mt-3 hidden text-center text-xs text-slate-500 md:block">
        {formatMessage(
          {
            defaultMessage: 'Paste image using <kbd>ctrl</kbd>+<kbd>v</kbd>',
          },
          {
            kbd: (...chunks) => <kbd className="kbd">{chunks}</kbd>,
          }
        )}
      </div>
    </>
  );
};
export default ImageSelector;
