import { atom } from 'jotai';

export const selectedImageFilesAtom = atom<File[]>([]);
export const addImageFilesAtom = atom(null, (get, set, by: File[]) => {
  const previousImages = get(selectedImageFilesAtom);
  const canaddImageFiles = by.filter(
    (file) =>
      !previousImages.some((previousImage) => previousImage.name === file.name)
  );
  set(selectedImageFilesAtom, [...previousImages, ...canaddImageFiles]);
});

export const percentAtom = atom<number>(50);
export const percentSliderDragging = atom(false);

type ImageProps = {
  file: File;
  el: HTMLImageElement;
  resized?: {
    size: number;
    dataURL: string;
  };
};
export const imagesAtom = atom<{ [key: string]: ImageProps }>({});
