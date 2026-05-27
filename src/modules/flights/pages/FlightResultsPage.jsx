import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from '../../../shared/components/Toast';
import './_flightResults.scss';

export default function FlightResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, searchData } = location.state || {};
  const [toast, setToast] = useState(null);

  if (!results) {
    return (
      <div className="no-results">
        <h2>No search results found</h2>
        <button onClick={() => navigate('/flights/search')}>Back to Search</button>
      </div>
    );
  }

  const flights = results?.flightSearchResponse?.flightDetailList || [];

  const handleSelectFlight = (flight) => {
    navigate('/flights/review', { state: { flight, searchData } });
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="flight-results-page">
        <div className="results-header">
          <div>
            <h2>Available Flights</h2>
            <p>{searchData?.origin} → {searchData?.destination} | {searchData?.travelDate}</p>
          </div>
          <button className="btn-back" onClick={() => navigate('/flights/search')}>
            ← Modify Search
          </button>
        </div>

        <div className="results-container">
          {flights.length === 0 ? (
            <div className="no-flights">
              <p>No flights found for your search criteria</p>
            </div>
          ) : (
            flights.map((flight, idx) => (
              <div key={idx} className="flight-card">
                <div className="flight-info">
                  <div className="airline">
                    <h3>{flight.airlineName || 'Airline'}</h3>
                    <span>{flight.airlineCode || ''}</span>
                  </div>
                  
                  <div className="route">
                    <div className="time">
                      <h4>{flight.departureTime || '--:--'}</h4>
                      <p>{flight.origin || searchData?.origin}</p>
                    </div>
                    <div className="duration">
                      <span>{flight.duration || '--h --m'}</span>
                      <div className="line"></div>
                      <span>{flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop(s)`}</span>
                    </div>
                    <div className="time">
                      <h4>{flight.arrivalTime || '--:--'}</h4>
                      <p>{flight.destination || searchData?.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="flight-price">
                  <h3>₹{flight.totalFare?.toLocaleString() || '0'}</h3>
                  <button className="btn-select" onClick={() => handleSelectFlight(flight)}>
                    Select
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
