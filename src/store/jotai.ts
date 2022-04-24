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
  type: string;
  el: HTMLImageElement;
};
export const imagesAtom = atom<ImageProps[]>([]);
export const pushImagesAtom = atom(null, (get, set, by: ImageProps) => {
  const previousImages = get(imagesAtom);
  const sameEls = previousImages.filter((img) => img.el.alt === by.el.alt);
  if (sameEls.length === 0) {
    set(imagesAtom, [...previousImages, by]);
  }
});
