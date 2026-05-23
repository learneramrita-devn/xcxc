import Banner from '../components/Banner';
import Offers from '../components/Offers';
import { Features, Categories } from '../components/FeaturesCategories';
import Tour from '../components/Tour';
import Promo from '../components/Promo';
import FeatureBar from '../components/FeatureBar';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import SEOMeta from '../../../shared/components/SEOMeta';

export default function HomePage() {
  return (
    <>
      <SEOMeta
        title="TravelApp – Book Flights, Hotels, Bus & Train Tickets Online"
        description="Book cheap flights, hotels, bus and train tickets online with TravelApp. Get exclusive travel deals, offers and travel insurance at the best prices."
        canonical="https://www.travelapp.com/"
      />
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
