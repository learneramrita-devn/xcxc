import FlightSearchForm from './FlightSearchForm';
import './_banner.scss';
import { useAuth } from '../../../app/providers/AuthContext';

export default function Banner() {
  const { isLoggedIn } = useAuth();

  return (
    <section className="banner">
      <div className="banner__form">
        {isLoggedIn ? (
          <>
            <h1 className="banner__heading">
              Book Domestic and International Flight Online.<br />
              For best offer <span style={{ color: '#FFBE10', cursor: 'pointer' }}>click here</span>
            </h1>
            <FlightSearchForm />
          </>
        ) : (
          <>
            <h1 className="banner__heading">
              The Smart Way to<br />Grow Your Business
            </h1>
            <p className="banner__subheading">
              Welcome to myPartner, a platform built exclusively for travel agents to fulfill all their customer travel needs with easy-to-use features and amazing deals.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
