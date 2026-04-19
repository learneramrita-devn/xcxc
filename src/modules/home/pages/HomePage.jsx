import Banner from '../components/Banner';
import Offers from '../components/Offers';
import { Features, Categories } from '../components/FeaturesCategories';
import Tour from '../components/Tour';
import Promo from '../components/Promo';
import FeatureBar from '../components/FeatureBar';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

export default function HomePage() {
  return (
    <>
      <Banner />
      <Offers />
      <Features />
      <Categories />
      <Tour />
      <Promo />
      <FeatureBar />
      <Testimonials />
      <FAQ />
    </>
  );
}
