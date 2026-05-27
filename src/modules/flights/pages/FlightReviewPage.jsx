import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from '../../../shared/components/Toast';
import { reviewFlightApi } from '../api/flightApi';
import './_flightReview.scss';

export default function FlightReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, searchData } = location.state || {};
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!flight) {
    return (
      <div className="no-data">
        <h2>No flight selected</h2>
        <button onClick={() => navigate('/flights/search')}>Back to Search</button>
      </div>
    );
  }

  const showToast = (message, type) => setToast({ message, type });

  const handleProceedToBook = async () => {
    if (!flight.priceId) {
      showToast('Price ID not available', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = { priceIdList: [flight.priceId] };
      const response = await reviewFlightApi(payload);
      
      const bookingId = response?.bookingId || `BK-${Date.now()}`;
      navigate('/flights/booking', { 
        state: { 
          flight, 
          searchData, 
          reviewData: response,
          bookingId 
        } 
      });
    } catch (err) {
      showToast(err.message || 'Failed to review flight', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="flight-review-page">
        <div className="review-container">
          <div className="review-header">
            <h2>Review Your Flight</h2>
            <button className="btn-back" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>

          <div className="flight-details-card">
            <div className="section">
              <h3>Flight Details</h3>
              <div className="detail-row">
                <span>Airline:</span>
                <strong>{flight.airlineName || 'N/A'}</strong>
              </div>
              <div className="detail-row">
                <span>Flight Code:</span>
                <strong>{flight.airlineCode || 'N/A'}</strong>
              </div>
              <div className="detail-row">
                <span>Route:</span>
                <strong>{searchData?.origin} → {searchData?.destination}</strong>
              </div>
              <div className="detail-row">
                <span>Date:</span>
                <strong>{searchData?.travelDate}</strong>
              </div>
              <div className="detail-row">
                <span>Departure:</span>
                <strong>{flight.departureTime || '--:--'}</strong>
              </div>
              <div className="detail-row">
                <span>Arrival:</span>
                <strong>{flight.arrivalTime || '--:--'}</strong>
              </div>
              <div className="detail-row">
                <span>Duration:</span>
                <strong>{flight.duration || 'N/A'}</strong>
              </div>
            </div>

            <div className="section">
              <h3>Passenger Details</h3>
              <div className="detail-row">
                <span>Adults:</span>
                <strong>{searchData?.adults || 0}</strong>
              </div>
              {searchData?.children > 0 && (
                <div className="detail-row">
                  <span>Children:</span>
                  <strong>{searchData.children}</strong>
                </div>
              )}
              {searchData?.infants > 0 && (
                <div className="detail-row">
                  <span>Infants:</span>
                  <strong>{searchData.infants}</strong>
                </div>
              )}
            </div>

            <div className="section fare-section">
              <h3>Fare Breakup</h3>
              <div className="detail-row">
                <span>Base Fare:</span>
                <strong>₹{flight.baseFare?.toLocaleString() || '0'}</strong>
              </div>
              <div className="detail-row">
                <span>Taxes & Fees:</span>
                <strong>₹{flight.taxes?.toLocaleString() || '0'}</strong>
              </div>
              <div className="detail-row total">
                <span>Total Amount:</span>
                <strong>₹{flight.totalFare?.toLocaleString() || '0'}</strong>
              </div>
            </div>
          </div>

          <button 
            className="btn-proceed" 
            onClick={handleProceedToBook}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Proceed to Book'}
          </button>
        </div>
      </div>
    </>
  );
}
