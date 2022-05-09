import { useAtomValue } from 'jotai';
import { imagesAtom, selectedImageFilesAtom } from '../store/jotai';
import ImageRow from './ImageRow';

const tableHeaders = ['', 'Name', 'Dimensions', 'Size', 'Resized Size'];

const ImageTable = () => {
  const selectedImageFiles = useAtomValue(selectedImageFilesAtom);
  const images = useAtomValue(imagesAtom);
  return (
    <table className="w-full table-fixed text-sm">
      <thead>
        <tr>
          {tableHeaders.map((header, index) => (
            <th key={`${index}-${header}`} className="p-2 text-left border-b">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {selectedImageFiles.map((file, index) => (
          <ImageRow
            file={file}
            resizedSize={images[file.name]?.resized?.size}
            key={index}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ImageTable;
