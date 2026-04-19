import './_featuresCategories.scss';

const FEATURES = [
  { icon: '🎧', title: '24/7 customer support', text: 'No matter the time zone, we\'re here to help.' },
  { icon: '🏆', title: 'Earn reward', text: 'Explore, earn, redeem, and repeat with our loyalty program.' },
  { icon: '💬', title: 'Millions of reviews', text: 'Plan and book with confidence using reviews from travelers.' },
  { icon: '🗺️', title: 'Plan your way', text: 'Stay flexible with free cancellation and reserve now.' },
];

const CATEGORIES = [
  { icon: '🦁', label: 'Wildlife' },
  { icon: '🤿', label: 'Beach Snorkel' },
  { icon: '🚴', label: 'City Cycling' },
  { icon: '🏔️', label: 'Mountain Trek' },
  { icon: '🍜', label: 'Food Tour' },
  { icon: '🚢', label: 'River Cruise' },
  { icon: '💆', label: 'Spa Retreat' },
  { icon: '🚗', label: 'Road Trip' },
];

export function Features() {
  return (
    <section className="features section">
      <div className="container">
        <div className="section-header mb-30">
          <h2 className="section-title">Why book with InsaneTravels?</h2>
        </div>
        <div className="features__grid">
          {FEATURES.map(({ icon, title, text }) => (
            <div key={title} className="feature-card">
              <div className="feature-card__icon">{icon}</div>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__text">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <section className="categories section">
      <div className="container">
        <div className="section-header mb-40">
          <h2 className="section-title">Travel By Categories</h2>
          <p className="section-subtitle">Navigate the Globe with Confidence</p>
        </div>
        <div className="categories__list">
          {CATEGORIES.map(({ icon, label }) => (
            <div key={label} className="category-item">
              <div className="category-item__icon">{icon}</div>
              <span className="category-item__label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
