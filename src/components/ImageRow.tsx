import React, { useMemo, useState, useCallback, useRef } from 'react';
import { imagesAtom } from '../store/jotai';
import { formatBytes } from '../utils/common';
import { useUpdateAtom } from 'jotai/utils';

type ImageListItemProps = {
  file: File;
  resizedSize?: number;
};

const ImageListItem = ({ file, resizedSize }: ImageListItemProps) => {
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
          [file.name]: { file, el: imgRef.current as HTMLImageElement },
        }));
      }
    },
    [file, setImages]
  );

  const memoImage = useMemo(
    () => (
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="bg-tiny-checkers h-16 w-16 rounded border border-slate-300 object-contain dark:border-slate-600"
        onLoad={handleOnLoad}
        ref={imgRef}
      />
    ),
    [file, handleOnLoad]
  );

  const formattedSize = useMemo(() => formatBytes(file.size), [file.size]);

  return (
    <tr className='border-b'>
      <td className="p-2">{memoImage}</td>
      <td className="truncate" title={file.name}>
        {file.name}
      </td>
      <td className="p-2">{`${dimensions.width}x${dimensions.height}`}</td>
      <td className="p-2">{formattedSize}</td>
      <td className="p-2">{resizedSize || formattedSize}</td>
    </tr>
  );
};

export default React.memo(ImageListItem);
