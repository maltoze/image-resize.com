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

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9027498975434534"
          crossOrigin="anonymous"
        ></script>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-9027498975434534"
          data-ad-slot="3547032576"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>

        {selectedImageFiles.length > 0 && <ImageResizer />}
      </div>
    </>
  );
};

export default IndexPage;
