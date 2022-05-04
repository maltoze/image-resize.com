import { useMemo, useState, useCallback, useRef } from 'react';
import { imagesAtom } from '../store/jotai';
import { formatBytes } from '../utils/common';
import { useUpdateAtom } from 'jotai/utils';

type ImageListItemProps = {
  file: File;
};

const ImageListItem = ({ file }: ImageListItemProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const setImages = useUpdateAtom(imagesAtom);

  const handleOnLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.currentTarget;
      URL.revokeObjectURL(target.src);
      if (imgRef.current) {
        const { naturalWidth, naturalHeight } = imgRef.current;
        setDimensions({ width: naturalWidth, height: naturalHeight });
        setImages((previous) => ({
          ...previous,
          [file.name]: {
            width: naturalWidth,
            height: naturalHeight,
            type: file.type,
            size: file.size,
          },
        }));
      }
    },
    [file.name, file.size, file.type, setImages]
  );

  const memoImage = useMemo(
    () => (
      <div className="group relative">
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="bg-tiny-checkers h-36 w-full rounded border border-slate-300 object-contain dark:border-slate-600"
          onLoad={handleOnLoad}
          ref={imgRef}
        />
      </div>
    ),
    [file, handleOnLoad]
  );

  return (
    <div className="flex">
      {memoImage}
      <div>{file.name}</div>
      <div>{formatBytes(file.size)}</div>
      <div></div>
    </div>
  );
};

export default ImageListItem;
