import { Link } from 'react-router-dom';
import FlightSearchForm from './FlightSearchForm';
import './_banner.scss';

export default function Banner() {
  return (
    <section className="banner">
      <div className="banner__form">
        <h1 className="banner__heading">
          Book Domestic and International Flight Online. For best offer{' '}
          <Link to=""><span>click here</span></Link>

        </h1>
        <FlightSearchForm />
      </div>
    </section>
  );
}
