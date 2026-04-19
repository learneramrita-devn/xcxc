import './_tour.scss';

const TOURS = [
  { title: 'The Imperial New Delhi', location: 'New Delhi', badge: '3 Nights / 4 Days', rating: '4.5/5', reviews: '456', price: '₹12,654', oldPrice: '₹15,000', tag: 'member', tagLabel: 'Member Price available', bg: '#3d3f4a' },
  { title: 'Kerala Backwaters Tour', location: 'Kerala', badge: '4 Nights / 5 Days', rating: '4.7/5', reviews: '312', price: '₹9,999', oldPrice: '₹18,000', tag: 'discount', tagLabel: '45% off', bg: '#1a3c2e' },
  { title: 'Rajasthan Heritage Tour', location: 'Rajasthan', badge: '5 Nights / 6 Days', rating: '4.6/5', reviews: '289', price: '₹14,500', oldPrice: '₹20,000', tag: 'member', tagLabel: 'Member Price available', bg: '#5e3c1a' },
  { title: 'Goa Beach Holiday', location: 'Goa', badge: '3 Nights / 4 Days', rating: '4.8/5', reviews: '521', price: '₹8,999', oldPrice: '₹12,000', tag: 'discount', tagLabel: '25% off', bg: '#1a3c5e' },
];

export default function Tour() {
  return (
    <section className="tour section">
      <div className="container">
        <div className="tour__header">
          <div>
            <h2 className="section-title">Our best tour package</h2>
            <p className="section-subtitle">Trending destinations</p>
          </div>
          <a href="#" className="tour__cta">See all Offer</a>
        </div>

        <div className="card-grid card-grid--4">
          {TOURS.map((tour, i) => (
            <div key={i} className="tour-card">
              <div className="tour-card__image" style={{ background: tour.bg }}>
                <span className="tour-card__wishlist">♡</span>
                <span className="tour-card__badge">{tour.badge}</span>
              </div>
              <div className="tour-card__content">
                <h3 className="tour-card__title">{tour.title}</h3>
                <p className="tour-card__location">{tour.location}</p>
                <div className="tour-card__rating">
                  <span className="rating-value">{tour.rating}</span>
                  <span className="rating-text">Exceptional ({tour.reviews} reviews)</span>
                </div>
                <div className="tour-card__price">
                  <span className="price-current">{tour.price}</span>
                  <span className="price-old">{tour.oldPrice}</span>
                </div>
                <p className="tour-card__tax">includes taxes & fees</p>
                <div className="tour-card__footer">
                  <span className={`tag tag--${tour.tag}`}>{tour.tagLabel}</span>
                  <a href="#" className="link">Sign in for Member Price</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
