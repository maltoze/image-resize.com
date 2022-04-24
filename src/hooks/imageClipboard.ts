import { useUpdateAtom } from 'jotai/utils';
import { useCallback, useEffect } from 'react';
import { addImageFilesAtom } from '../store/jotai';
import { imageType } from '../utils/constants';

const useImageClipboard = () => {
  const addImageFiles = useUpdateAtom(addImageFilesAtom);

  const handleOnPaste = useCallback(
    (e: ClipboardEvent) => {
      const imageFiles = Array.from(e.clipboardData?.files || []).filter(
        (file) => imageType.test(file.type)
      );

      addImageFiles(imageFiles);
    },
    [addImageFiles]
  );

  useEffect(() => {
    document.addEventListener('paste', handleOnPaste);

    return () => {
      document.removeEventListener('paste', handleOnPaste);
    };
  }, [handleOnPaste]);
};

export default useImageClipboard;
