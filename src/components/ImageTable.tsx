import { useAtomValue } from 'jotai';
import { imagesAtom, selectedImageFilesAtom } from '../store/jotai';
import ImageRow from './ImageRow';

const ImageTable = () => {
  const selectedImageFiles = useAtomValue(selectedImageFilesAtom);
  const images = useAtomValue(imagesAtom);
  return (
    <table className="table-fixed text-sm w-full">
      {selectedImageFiles.map((file, index) => (
        <ImageRow
          file={file}
          resizedSize={images[file.name]?.resizedSize}
          key={index}
        />
      ))}
    </table>
  );
};

export default ImageTable;
