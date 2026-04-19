import { useState } from 'react';
import './_testimonials.scss';

const TESTIMONIALS = [
  { name: 'Rahul S.', title: '5D/4N Benaras tour from Kolkata', meta: 'Subhsafar User • 20 days ago', stars: 5, text: 'I think that I received more than what I paid for. The trip was well organized and the team was very helpful throughout the journey.' },
  { name: 'Priya M.', title: 'Mumbai to Goa flight booking', meta: 'Subhsafar User • 1 month ago', stars: 5, text: 'Got the cheapest flight ticket compared to other platforms. The booking process was smooth and the e-ticket arrived instantly.' },
  { name: 'Amit K.', title: 'Delhi to Dubai international flight', meta: 'Subhsafar User • 2 months ago', stars: 4, text: 'Great experience booking international flights. The price was competitive and customer support was very responsive.' },
  { name: 'Sneha R.', title: 'Rajasthan holiday package', meta: 'Subhsafar User • 3 months ago', stars: 5, text: 'Booked a complete holiday package and it was worth every penny. Highly recommend Subhsafar for travel bookings.' },
];

const CHUNK_SIZE = 2;

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(TESTIMONIALS.length / CHUNK_SIZE);
  const visible = TESTIMONIALS.slice(page * CHUNK_SIZE, page * CHUNK_SIZE + CHUNK_SIZE);

  return (
    <section className="testimonials section">
      <div className="container">
        <h2 className="section-title">Know more about our Happy Customers</h2>
        <div className="testimonials__list">
          {visible.map((t, i) => (
            <div key={i} className="testimonials__card">
              <div className="testimonials__header">
                <div className="avatar" />
                <div>
                  <p className="review-title">{t.title}</p>
                  <span className="meta">{t.meta}</span>
                </div>
                <div className="stars">{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</div>
              </div>
              <p className="testimonials__text">{t.text}</p>
            </div>
          ))}
        </div>
        <div className="testimonials__nav">
          <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>←</button>
          <button onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))} disabled={page === totalPages - 1}>→</button>
        </div>
      </div>
    </section>
  );
}
