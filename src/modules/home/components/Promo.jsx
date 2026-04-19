import './_promo.scss';

export default function Promo() {
  return (
    <section className="promo section">
      <div className="container">
        <div className="promo__card">
          <div className="promo__content">
            <h2 className="promo__title">
              UPTO <span className="promo__highlight">35%</span>
            </h2>
            <p className="promo__subtitle">Exclusive Discount on</p>
            <p className="promo__location">
              <span className="promo__city">Bangkok</span> Hotels
            </p>
          </div>

          <div className="promo__divider" />

          <div className="promo__action">
            <a href="#" className="promo__btn">Book now</a>
          </div>
        </div>
      </div>
    </section>
  );
}
