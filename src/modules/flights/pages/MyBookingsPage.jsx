import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../../shared/components/Toast';
import { bookRetrieveApi } from '../api/flightApi';
import './_myBookings.scss';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchBookingId, setSearchBookingId] = useState('');

  const showToast = (message, type) => setToast({ message, type });

  const handleSearchBooking = async (e) => {
    e.preventDefault();
    
    if (!searchBookingId.trim()) {
      showToast('Please enter booking ID', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await bookRetrieveApi({ bookingId: searchBookingId });
      if (response) {
        setBookings([response]);
        showToast('Booking found!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Booking not found', 'error');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'CONFIRMED': 'confirmed',
      'PENDING': 'pending',
      'CANCELLED': 'cancelled',
      'FAILED': 'failed',
    };
    return statusMap[status] || 'pending';
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="my-bookings-page">
        <div className="bookings-header">
          <div>
            <h2>My Bookings</h2>
            <p>View and manage your flight bookings</p>
          </div>
          <button className="btn-new-search" onClick={() => navigate('/flights/search')}>
            + New Search
          </button>
        </div>

        <div className="search-booking">
          <form onSubmit={handleSearchBooking}>
            <input
              type="text"
              placeholder="Enter Booking ID to search..."
              value={searchBookingId}
              onChange={(e) => setSearchBookingId(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        <div className="bookings-container">
          {loading && bookings.length === 0 ? (
            <div className="loading">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="no-bookings">
              <h3>No bookings found</h3>
              <p>Search for a booking using Booking ID or create a new booking</p>
              <button onClick={() => navigate('/flights/search')}>
                Search Flights
              </button>
            </div>
          ) : (
            bookings.map((booking, idx) => (
              <div key={idx} className="booking-card">
                <div className="booking-header">
                  <div>
                    <h3>Booking ID: {booking.bookingId || 'N/A'}</h3>
                    <p>PNR: {booking.pnr || 'Pending'}</p>
                  </div>
                  <span className={`status-badge ${getStatusClass(booking.status)}`}>
                    {booking.status || 'PENDING'}
                  </span>
                </div>

                <div className="booking-details">
                  <div className="detail-section">
                    <h4>Flight Details</h4>
                    <div className="detail-row">
                      <span>Airline:</span>
                      <strong>{booking.airlineName || 'N/A'}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Route:</span>
                      <strong>{booking.origin || 'N/A'} → {booking.destination || 'N/A'}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Date:</span>
                      <strong>{booking.travelDate || 'N/A'}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Passengers:</span>
                      <strong>{booking.totalPassengers || booking.travellerDetailList?.length || 0}</strong>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Payment Details</h4>
                    <div className="detail-row">
                      <span>Total Amount:</span>
                      <strong className="amount">₹{booking.totalFare?.toLocaleString() || '0'}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Booking Date:</span>
                      <strong>{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A'}</strong>
                    </div>
                  </div>
                </div>

                {booking.travellerDetailList && booking.travellerDetailList.length > 0 && (
                  <div className="passengers-section">
                    <h4>Passengers</h4>
                    {booking.travellerDetailList.map((pax, i) => (
                      <div key={i} className="passenger-item">
                        {pax.title} {pax.firstName} {pax.lastName} ({pax.paxType})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
