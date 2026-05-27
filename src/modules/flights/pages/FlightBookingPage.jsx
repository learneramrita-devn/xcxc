import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from '../../../shared/components/Toast';
import { bookFlightApi } from '../api/flightApi';
import './_flightBooking.scss';

export default function FlightBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, searchData, bookingId } = location.state || {};
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalPax = (searchData?.adults || 0) + (searchData?.children || 0) + (searchData?.infants || 0);

  const [passengers, setPassengers] = useState(
    Array.from({ length: totalPax }, (_, i) => ({
      paxId: i + 1,
      paxType: i < searchData?.adults ? 'ADULT' : i < (searchData?.adults + searchData?.children) ? 'CHILD' : 'INFANT',
      title: 'Mr',
      firstName: '',
      lastName: '',
      gender: 1,
      age: '',
      dob: '',
      passportNumber: '',
      passportIssuingCountry: 'IN',
      passportExpiryDate: '',
      nationality: 'Indian',
      panCardNumber: '',
      mobile: '',
      email: '',
    }))
  );

  const [gstEnabled, setGstEnabled] = useState(false);
  const [gstDetails, setGstDetails] = useState({
    gstNumber: '',
    gstHolderName: '',
    gstAddress: '',
  });

  const [contactInfo, setContactInfo] = useState({
    customerMobile: '',
    passengerMobile: '',
    whatsAppMobile: '',
    passengerEmail: '',
  });

  if (!flight || !bookingId) {
    return (
      <div className="no-data">
        <h2>Booking information not available</h2>
        <button onClick={() => navigate('/flights/search')}>Back to Search</button>
      </div>
    );
  }

  const showToast = (message, type) => setToast({ message, type });

  const updatePassenger = (index, field, value) => {
    setPassengers(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.firstName || !p.lastName || !p.dob) {
        showToast(`Please fill all required fields for Passenger ${i + 1}`, 'error');
        return;
      }
    }

    if (!contactInfo.customerMobile || !contactInfo.passengerEmail) {
      showToast('Please fill contact information', 'error');
      return;
    }

    const payload = {
      bookingId,
      travellerDetailList: passengers,
      gstDetail: gstEnabled ? {
        gst: true,
        gstNumber: gstDetails.gstNumber,
        gstHolderName: gstDetails.gstHolderName,
        gstAddress: gstDetails.gstAddress,
      } : { gst: false },
      contactInfo,
    };

    setLoading(true);
    try {
      const response = await bookFlightApi(payload);
      showToast('Booking successful!', 'success');
      setTimeout(() => {
        navigate('/flights/bookings', { state: { bookingId: response?.bookingId || bookingId } });
      }, 1500);
    } catch (err) {
      showToast(err.message || 'Booking failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="flight-booking-page">
        <div className="booking-container">
          <h2>Complete Your Booking</h2>
          <p>Booking ID: {bookingId}</p>

          <form onSubmit={handleSubmit}>
            {/* Passenger Details */}
            {passengers.map((pax, idx) => (
              <div key={idx} className="section">
                <h3>Passenger {idx + 1} ({pax.paxType})</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Title *</label>
                    <select value={pax.title} onChange={(e) => updatePassenger(idx, 'title', e.target.value)} required>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" value={pax.firstName} onChange={(e) => updatePassenger(idx, 'firstName', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" value={pax.lastName} onChange={(e) => updatePassenger(idx, 'lastName', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input type="date" value={pax.dob} onChange={(e) => updatePassenger(idx, 'dob', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Mobile</label>
                    <input type="tel" value={pax.mobile} onChange={(e) => updatePassenger(idx, 'mobile', e.target.value)} maxLength={10} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={pax.email} onChange={(e) => updatePassenger(idx, 'email', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}

            {/* GST Details */}
            <div className="section">
              <div className="gst-toggle">
                <input type="checkbox" id="gst" checked={gstEnabled} onChange={(e) => setGstEnabled(e.target.checked)} />
                <label htmlFor="gst">I have a GST Number</label>
              </div>
              {gstEnabled && (
                <div className="form-grid">
                  <div className="form-group">
                    <label>GST Number *</label>
                    <input type="text" value={gstDetails.gstNumber} onChange={(e) => setGstDetails(p => ({ ...p, gstNumber: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label>Company Name *</label>
                    <input type="text" value={gstDetails.gstHolderName} onChange={(e) => setGstDetails(p => ({ ...p, gstHolderName: e.target.value }))} required />
                  </div>
                  <div className="form-group full-width">
                    <label>Address *</label>
                    <input type="text" value={gstDetails.gstAddress} onChange={(e) => setGstDetails(p => ({ ...p, gstAddress: e.target.value }))} required />
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="section">
              <h3>Contact Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Customer Mobile *</label>
                  <input type="tel" value={contactInfo.customerMobile} onChange={(e) => setContactInfo(p => ({ ...p, customerMobile: e.target.value }))} maxLength={10} required />
                </div>
                <div className="form-group">
                  <label>Passenger Mobile</label>
                  <input type="tel" value={contactInfo.passengerMobile} onChange={(e) => setContactInfo(p => ({ ...p, passengerMobile: e.target.value }))} maxLength={10} />
                </div>
                <div className="form-group">
                  <label>WhatsApp Mobile</label>
                  <input type="tel" value={contactInfo.whatsAppMobile} onChange={(e) => setContactInfo(p => ({ ...p, whatsAppMobile: e.target.value }))} maxLength={10} />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" value={contactInfo.passengerEmail} onChange={(e) => setContactInfo(p => ({ ...p, passengerEmail: e.target.value }))} required />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-book" disabled={loading}>
              {loading ? 'Booking...' : `Pay ₹${flight.totalFare?.toLocaleString() || '0'}`}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
