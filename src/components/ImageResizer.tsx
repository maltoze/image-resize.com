import classNames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import Slider from 'rc-slider';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  imagesAtom,
  percentAtom,
  percentSliderDragging,
  selectedImageFilesAtom,
} from '../store/jotai';
import { supportedImageTypes } from '../utils/constants';

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

  useEffect(() => {
    setAfterPercent(defaultPercent);
  }, [setAfterPercent]);

  const handleSliderOnChange = (value: number) => {
    setPercent(value);
    setTextPercent(value);
  };

  const updateDimensions = useCallback(
    (percent: number) => {
      if (Object.keys(images).length === 1) {
        const firstImage = images[Object.keys(images)[0]];
        const {
          el: { naturalWidth: width, naturalHeight: height },
        } = firstImage;
        const scale = percent / 100;
        setWidth(Math.round(width * scale));
        setHeight(Math.round(height * scale));
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
    Object.keys(images).forEach((key) => {
      const {
        file: { type, name },
        el,
      } = images[key];
      const { naturalHeight: height, naturalWidth: width } = el;
      canvas.width = width * (percent / 100);
      canvas.height = height * (percent / 100);
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(el, 0, 0, canvas.width, canvas.height);

      let imgType, imgName;
      if (supportedImageTypes.includes(type)) {
        imgType = type;
        imgName = name;
      } else {
        imgType = 'image/png';
        imgName = `${name}.png`;
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
    const firstImage = images[Object.keys(images)[0]];
    const {
      el: { naturalWidth: width, naturalHeight: height },
    } = firstImage;
    const aspectRatio = width / height;
    let curPercent, limitedValue;
    if (name === 'width') {
      limitedValue = value > width ? width : value;
      setWidth(limitedValue);
      setHeight(Math.round(limitedValue / aspectRatio));
      curPercent = (limitedValue / width) * 100;
    } else {
      limitedValue = value > height ? height : value;
      setWidth(Math.round(limitedValue * aspectRatio));
      setHeight(limitedValue);
      curPercent = (limitedValue / height) * 100;
    }
    setPercent(curPercent);
    setTextPercent(Math.round(curPercent));
    setAfterPercent(curPercent);
  };

  return (
    <div
      className={classNames(
        'flex flex-col space-y-3 py-2 text-sm duration-300 md:w-1/3 md:px-4'
      )}
    >
      <div className="">
        <label>{formatMessage({ defaultMessage: 'Percent' })}</label>
        <div className="flex items-center space-x-3">
          <Slider
            ariaLabelForHandle={'Percent'}
            min={5}
            step={5}
            value={percent ?? 5}
            onChange={(value) => handleSliderOnChange(value as number)}
            onAfterChange={(value) => setAfterPercent(value as number)}
            handleRender={SliderHandleRender}
          />
          <div className="relative flex w-1/3 items-center md:w-1/2">
            <input
              type="text"
              className="input input-xs border-opacity-0 pr-5 text-right shadow-none hover:border-opacity-100 focus:border-opacity-100 dark:border-opacity-0 dark:bg-slate-900 dark:hover:border-opacity-100"
              value={textPercent ?? ''}
              onChange={(e) => setTextPercent(e.target.value)}
              onBlur={handlePercentInputOnBlur}
              onKeyDown={handleTextPercentKeyDown}
            />
            <span className="absolute right-1">%</span>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor="width">
          {formatMessage({ defaultMessage: 'Width' })}
        </label>
        <input
          id="width"
          type="number"
          className="input"
          disabled={selectedImageFiles.length > 1}
          min={0}
          value={width}
          name="width"
          onChange={handleDimensionsOnChange}
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="height">
          {formatMessage({ defaultMessage: 'Height' })}
        </label>
        <input
          id="height"
          type="number"
          className="input"
          disabled={selectedImageFiles.length > 1}
          min={0}
          value={height}
          name="height"
          onChange={handleDimensionsOnChange}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary rounded-full px-6" onClick={resize}>
          {formatMessage({ defaultMessage: 'Save' })}
        </button>
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
