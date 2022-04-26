import { ArrowSmRightIcon, XCircleIcon } from '@heroicons/react/outline';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import SpinIcon from '../icons/SpinIcon';
import {
  imagesAtom,
  percentAtom,
  percentSliderDragging,
  pushImagesAtom,
  selectedImageFilesAtom,
} from '../store/jotai';

const ImageWithMetaData = ({ file }: { file: File }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const setSelectedImageFiles = useUpdateAtom(selectedImageFilesAtom);
  const percent = useAtomValue(percentAtom) || 0;
  const dragging = useAtomValue(percentSliderDragging);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const pushImages = useUpdateAtom(pushImagesAtom);
  const setImages = useUpdateAtom(imagesAtom);

  const afterDimensions = { ...dimensions };
  Object.keys(dimensions).forEach((key) => {
    const dimensionsKey = key as 'width' | 'height';
    afterDimensions[dimensionsKey] = parseInt(
      (afterDimensions[dimensionsKey] * (percent / 100)).toFixed(0)
    );
  });
  // const afterFileSize = formatBytes(file.size * (percent / 100));

  const handleOnLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.currentTarget;
      URL.revokeObjectURL(target.src);
      if (imgRef.current) {
        const { naturalWidth, naturalHeight } = imgRef.current;
        setDimensions({ width: naturalWidth, height: naturalHeight });
        pushImages({ type: file.type, el: imgRef.current });
      }
    },
    [file.type, pushImages]
  );

  const handleOnDelete = useCallback(() => {
    setImages((previous) =>
      previous.filter((img) => img.el.alt !== imgRef.current?.alt)
    );
    setSelectedImageFiles((previous) =>
      previous.filter((image) => image.name !== file.name)
    );
  }, [file, setSelectedImageFiles, setImages]);

  const memoImg = useMemo(
    () => (
      <div className="group relative">
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="h-36 w-full rounded border border-dashed border-slate-300 object-contain dark:border-slate-600"
          onLoad={handleOnLoad}
          ref={imgRef}
        />
        <button
          className="absolute top-0 right-0 -mt-3 -mr-3 "
          onClick={handleOnDelete}
        >
          <XCircleIcon className="h-6 w-6 text-red-600 opacity-0 transition delay-100 ease-in-out hover:scale-125 group-hover:opacity-100 group-active:opacity-100 dark:text-red-800" />
        </button>
      </div>
    ),
    [file, handleOnDelete, handleOnLoad]
  );

  return (
    <div
      className="w-40 space-y-0.5 p-2 text-center text-xs text-slate-500 outline-none"
      tabIndex={0}
    >
      {memoImg}
      <div className="cursor-auto truncate" title={file.name}>
        {file.name}
      </div>
      <div className="whitespace-nowrap">
        <span className="rounded bg-slate-500 px-1 text-white dark:text-slate-200">{`${dimensions.width}x${dimensions.height}`}</span>
        <ArrowSmRightIcon className="inline h-4 w-4 " />
        {dragging ? (
          <SpinIcon className="inline h-3 w-3 animate-spin text-green-600" />
        ) : (
          <span className="rounded bg-green-600 px-1 text-white transition delay-200 ease-in-out dark:text-slate-200">
            {`${afterDimensions.width}x${afterDimensions.height}`}
          </span>
        )}
      </div>
      {/* <div>
        <span className="rounded bg-slate-500 px-1 text-white dark:text-slate-200">
          {formatBytes(file.size)}
        </span>
        <ArrowSmRightIcon className="inline h-4 w-4 " />
        {dragging ? (
          <SpinIcon className="inline h-3 w-3 animate-spin text-green-600" />
        ) : (
          <span className="rounded bg-green-600 px-1 text-white dark:text-slate-200">
            {afterFileSize}
          </span>
        )}
      </div> */}
    </div>
  );
};

export default React.memo(ImageWithMetaData);
