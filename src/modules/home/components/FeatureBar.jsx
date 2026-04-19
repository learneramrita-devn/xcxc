import './_featureBar.scss';

const FEATURES = [
  { icon: '📍', label: 'Your Destination' },
  { icon: '🛡️', label: 'Insurance For International Trips' },
  { icon: '✈️', label: 'Explore International Flights' },
  { icon: '👥', label: 'Offsites, Events & Meetings' },
  { icon: '🎁', label: 'Gift Cards' },
];

export default function FeatureBar() {
  return (
    <section className="feature-bar">
      <div className="container">
        <div className="feature-bar__container">
          {FEATURES.map(({ icon, label }) => (
            <div key={label} className="feature-bar__item">
              <i className="icon">{icon}</i>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
