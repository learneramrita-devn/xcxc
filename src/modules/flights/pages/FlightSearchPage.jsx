import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../../shared/components/Toast';
import { searchFlightsApi } from '../api/flightApi';
import './_flightSearch.scss';

export default function FlightSearchPage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    travelDate: '',
    adults: 1,
    children: 0,
    infants: 0,
  });

  const showToast = (message, type) => setToast({ message, type });

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!formData.origin || !formData.destination) {
      showToast('Please select origin and destination', 'error');
      return;
    }
    if (!formData.travelDate) {
      showToast('Please select travel date', 'error');
      return;
    }

    const paxInfo = {};
    if (formData.adults > 0) paxInfo.ADULT = formData.adults;
    if (formData.children > 0) paxInfo.CHILD = formData.children;
    if (formData.infants > 0) paxInfo.INFANT = formData.infants;

    const payload = {
      flightQuery: {
        routeDetailList: [{
          origin: formData.origin,
          destination: formData.destination,
          travelDate: formData.travelDate,
        }],
        paxInfo,
      },
    };

    setLoading(true);
    try {
      const response = await searchFlightsApi(payload);
      navigate('/flights/results', { state: { results: response, searchData: formData } });
    } catch (err) {
      showToast(err.message || 'Failed to search flights', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="flight-search-page">
        <div className="search-container">
          <h2>Search Flights</h2>
          <p>Find the best flights for your journey</p>

          <form onSubmit={handleSearch}>
            <div className="form-row">
              <div className="form-group">
                <label>From *</label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData(p => ({ ...p, origin: e.target.value.toUpperCase() }))}
                  placeholder="BOM"
                  maxLength={3}
                  required
                />
              </div>

              <div className="form-group">
                <label>To *</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData(p => ({ ...p, destination: e.target.value.toUpperCase() }))}
                  placeholder="DEL"
                  maxLength={3}
                  required
                />
              </div>

              <div className="form-group">
                <label>Travel Date *</label>
                <input
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => setFormData(p => ({ ...p, travelDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Adults</label>
                <input
                  type="number"
                  value={formData.adults}
                  onChange={(e) => setFormData(p => ({ ...p, adults: parseInt(e.target.value) || 0 }))}
                  min={1}
                  max={9}
                />
              </div>

              <div className="form-group">
                <label>Children</label>
                <input
                  type="number"
                  value={formData.children}
                  onChange={(e) => setFormData(p => ({ ...p, children: parseInt(e.target.value) || 0 }))}
                  min={0}
                  max={9}
                />
              </div>

              <div className="form-group">
                <label>Infants</label>
                <input
                  type="number"
                  value={formData.infants}
                  onChange={(e) => setFormData(p => ({ ...p, infants: parseInt(e.target.value) || 0 }))}
                  min={0}
                  max={9}
                />
              </div>
            </div>

            <button type="submit" className="btn-search" disabled={loading}>
              {loading ? 'Searching...' : 'Search Flights'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
