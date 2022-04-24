import classNames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import Slider from 'rc-slider';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  imagesAtom,
  percentAtom,
  percentSliderDragging,
  selectedImageFilesAtom,
} from '../store/jotai';
import { supportedImageTypes } from '../utils/constants';
import ImageWithMetaData from './ImageWithMetaData';

const defaultPercent = 50;

const ImageResizer = () => {
  const selectedImageFiles = useAtomValue(selectedImageFilesAtom);
  const { formatMessage } = useIntl();

  const setAfterPercent = useUpdateAtom(percentAtom);
  const [percent, setPercent] = useState(defaultPercent);
  const [textPercent, setTextPercent] = useState<number | string>(percent);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [images] = useAtom(imagesAtom);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    setAfterPercent(defaultPercent);
  }, [setAfterPercent]);

  const handleSliderOnChange = (value: number) => {
    setPercent(value);
    setTextPercent(value);
  };

  const updateDimensions = useCallback(
    (percent: number) => {
      if (images.length === 1) {
        const firstImage = images[0];
        const { naturalWidth, naturalHeight } = firstImage.el;
        const scale = percent / 100;
        setWidth(Math.round(naturalWidth * scale));
        setHeight(Math.round(naturalHeight * scale));
      }
    },
    [images]
  );

  useEffect(() => {
    updateDimensions(percent);
  }, [percent, updateDimensions]);

  const handlePercentInputOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseFloat(e.target.value);
    if (isNaN(parsedValue)) {
      setTextPercent(percent.toString());
    } else {
      const parsedPercent = parsedValue > 100 ? 100 : parsedValue;
      setPercent(parsedPercent);
      setTextPercent(parsedPercent);
      setAfterPercent(parsedPercent);
    }
  };

  const handleTextPercentKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const resize = () => {
    const canvas = document.createElement('canvas');
    images.forEach((image) => {
      canvas.width = image.el.naturalWidth * (percent / 100);
      canvas.height = image.el.naturalHeight * (percent / 100);
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(image.el, 0, 0, canvas.width, canvas.height);

      let imgType, imgName;
      if (supportedImageTypes.includes(image.type)) {
        imgType = image.type;
        imgName = image.el.alt;
      } else {
        imgType = 'image/png';
        imgName = `${image.el.alt}.png`;
      }

      const dataURL = canvas.toDataURL(imgType);
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = imgName;
      link.click();
    });
  };

  const handleDimensionsOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as unknown as {
      name: string;
      value: number;
    };
    const firstImage = images[0];
    const { naturalWidth, naturalHeight } = firstImage.el;
    const aspectRatio = naturalWidth / naturalHeight;
    let curPercent, limitedValue;
    if (name === 'width') {
      limitedValue = value > naturalWidth ? naturalWidth : value;
      setWidth(limitedValue);
      setHeight(Math.round(limitedValue / aspectRatio));
      curPercent = (limitedValue / firstImage.el.naturalWidth) * 100;
    } else {
      limitedValue = value > naturalHeight ? naturalHeight : value;
      setWidth(Math.round(limitedValue * aspectRatio));
      setHeight(limitedValue);
      curPercent = (limitedValue / firstImage.el.naturalHeight) * 100;
    }
    setPercent(curPercent);
    setTextPercent(Math.round(curPercent));
    setAfterPercent(curPercent);
  };

  return (
    <div className="grid grid-cols-1 gap-8 py-8 md:py-20" ref={containerRef}>
      <div className="flex flex-col gap-2">
        <div
          tabIndex={0}
          className={classNames(
            'flex outline-none flex-row flex-wrap items-center justify-center gap-2 overflow-y-auto rounded-xl py-2 dark:border-slate-600 md:h-64',
            {
              'border-2 border-dashed border-slate-300 md:resize-y':
                selectedImageFiles.length > 1,
            }
          )}
        >
          {selectedImageFiles.map((file) => (
            <ImageWithMetaData file={file} key={`${file.name}`} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-full md:w-1/2">
          <label>{formatMessage({ defaultMessage: 'Percent' })}</label>
          <div className="flex items-center gap-4">
            <Slider
              ariaLabelForHandle={'Percent'}
              min={1}
              value={percent ?? 1}
              onChange={(value) => handleSliderOnChange(value as number)}
              onAfterChange={(value) => setAfterPercent(value as number)}
              handleRender={SliderHandleRender}
            />
            <div className="flex w-1/5 items-center">
              <input
                type="text"
                className="input input-xs border-opacity-0 pr-0.5 text-right shadow-none hover:border-opacity-100 focus:border-opacity-100 dark:border-opacity-0 dark:bg-slate-900 dark:hover:border-opacity-100"
                value={textPercent ?? ''}
                onChange={(e) => setTextPercent(e.target.value)}
                onBlur={handlePercentInputOnBlur}
                onKeyDown={handleTextPercentKeyDown}
              />
              <span>%</span>
            </div>
          </div>
        </div>
        {selectedImageFiles.length === 1 && (
          <>
            {/* <div className="flex w-full items-center px-10 md:w-1/2">
              <div className="flex-grow border-t"></div>
              <span className="mx-3 flex-shrink text-sm">or</span>
              <div className="flex-grow border-t"></div>
            </div> */}
            <div className="flex w-full flex-row items-center gap-2 md:w-1/2">
              <div className="basis-1/2">
                <label htmlFor="width">
                  {formatMessage({ defaultMessage: 'Width' })}
                </label>
                <input
                  id="width"
                  type="number"
                  className="input"
                  min={0}
                  value={width}
                  name="width"
                  onChange={handleDimensionsOnChange}
                />
              </div>
              <div className="basis-1/2">
                <label htmlFor="height">
                  {formatMessage({ defaultMessage: 'Height' })}
                </label>
                <input
                  id="height"
                  type="number"
                  className="input"
                  min={0}
                  value={height}
                  name="height"
                  onChange={handleDimensionsOnChange}
                />
              </div>
            </div>
          </>
        )}
        <div className="mt-3">
          <button className="btn btn-primary" onClick={resize}>
            {formatMessage({ defaultMessage: 'Save' })}
          </button>
        </div>
      </div>
    </div>
  );
};

const SliderHandleRender = (
  node: React.ReactElement,
  { dragging }: { dragging: boolean }
) => {
  const setDragging = useUpdateAtom(percentSliderDragging);

  useEffect(() => {
    setDragging(dragging);
  }, [dragging, setDragging]);

  return node;
};

export default ImageResizer;
