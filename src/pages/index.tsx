import ImageSelector from '../components/ImageSelector';
import FaqSection from '../components/FaqSection';
import FeatureSection from '../components/FeatureSection';
import Hero from '../components/Hero';

const IndexPage = () => {
  return (
    <>
      <div className="mt-10 space-y-10 divide-y dark:divide-slate-800 md:space-y-20">
        <section>
          <Hero />
          <ImageSelector />
        </section>
        <FeatureSection />
        <FaqSection />
      </div>
    </>
  );
};

export default IndexPage;
