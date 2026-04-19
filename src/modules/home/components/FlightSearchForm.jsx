import { useState } from 'react';
import './_flightSearchForm.scss';

const TRIP_TYPES = [
  { value: 'one-way', label: 'One Way' },
  { value: 'round-trip', label: 'Round Trip' },
  { value: 'multi-city', label: 'Multi City' },
];

const CLASSES = ['Economy', 'Premium Economy', 'Business', 'First Class'];

const SPECIAL_FARES = [
  { value: 'student', label: 'Student' },
  { value: 'senior-citizen', label: 'Senior Citizen' },
  { value: 'armed-forces', label: 'Armed Forces' },
  { value: 'popular-filter', label: 'Popular Filter' },
  { value: 'non-stop', label: 'Non Stop' },
];

export default function FlightSearchForm() {
  const [tripType, setTripType] = useState('one-way');
  const [fares, setFares] = useState([]);
  const [form, setForm] = useState({
    from: '', to: '', departure: '', return: '', travellers: 1, travelClass: 'Economy',
  });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const toggleFare = (value) =>
    setFares((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );

  return (
    <div className="flight-form">
      {/* Radio Buttons */}
      <div className="flight-form__trips">
        {TRIP_TYPES.map(({ value, label }) => (
          <label key={value} className={`flight-form__trip${tripType === value ? ' active' : ''}`}>
            <input
              type="radio"
              name="tripType"
              value={value}
              checked={tripType === value}
              onChange={() => setTripType(value)}
            />
            {label}
          </label>
        ))}
      </div>

      {/* Search Fields */}
      <div className="flight-form__fields">
        <div className="flight-form__field">
          <span className="flight-form__label">From</span>
          <input
            name="from"
            value={form.from}
            onChange={handleChange}
            placeholder="Enter city or airport"
            className="flight-form__input"
          />
        </div>

        <div className="flight-form__divider">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3L4 7l4 4M16 21l4-4-4-4M4 7h16M4 17h16" />
          </svg>
        </div>

        <div className="flight-form__field">
          <span className="flight-form__label">To</span>
          <input
            name="to"
            value={form.to}
            onChange={handleChange}
            placeholder="Enter city or airport"
            className="flight-form__input"
          />
        </div>

        <div className="flight-form__field">
          <span className="flight-form__label">Departure</span>
          <input
            type="date"
            name="departure"
            value={form.departure}
            onChange={handleChange}
            className="flight-form__input"
          />
        </div>

        <div className={`flight-form__field${tripType === 'one-way' ? ' disabled' : ''}`}>
          <span className="flight-form__label">Return</span>
          <input
            type="date"
            name="return"
            value={form.return}
            onChange={handleChange}
            disabled={tripType === 'one-way'}
            className="flight-form__input"
          />
        </div>

        <div className="flight-form__field">
          <span className="flight-form__label">Travellers & Class</span>
          <div className="flight-form__travellers">
            <input
              type="number"
              name="travellers"
              value={form.travellers}
              min={1}
              max={9}
              onChange={handleChange}
              className="flight-form__input flight-form__input--num"
            />
            <select
              name="travelClass"
              value={form.travelClass}
              onChange={handleChange}
              className="flight-form__select"
            >
              {CLASSES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button className="flight-form__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          Search
        </button>
      </div>

      {/* Special Fares */}
      <div className="flight-form__fares">
        <span className="flight-form__fares-label">Special Fares:</span>
        {SPECIAL_FARES.map(({ value, label }) => (
          <label key={value} className={`flight-form__fare${fares.includes(value) ? ' active' : ''}`}>
            <input
              type="checkbox"
              checked={fares.includes(value)}
              onChange={() => toggleFare(value)}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
