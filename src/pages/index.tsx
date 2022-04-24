import SEO from '../components/SEO';
import Heading from '../components/Heading';
import ImageResizer from '../components/ImageResizer';
import ImageSelector from '../components/ImageSelector';
import { selectedImageFilesAtom } from '../store/jotai';
import { useAtomValue } from 'jotai';

const IndexPage = () => {
  const selectedImageFiles = useAtomValue(selectedImageFilesAtom);

  return (
    <>
      <SEO />
      <div className="mx-auto mt-6 w-full max-w-3xl px-6 md:px-3">
        <Heading />
        <ImageSelector />
        {selectedImageFiles.length > 0 && <ImageResizer />}
      </div>
    </>
  );
};

export default IndexPage;
