import { useState } from 'react';
import './_offers.scss';

const TABS = ['All Offers', 'Bank Offers', 'Flights', 'Hotels', 'Holidays', 'Trains', 'Cabs', 'Bus', 'Forex'];

const OFFERS = [
  { tab: 'Flights', badge: '25% off on first order', title: 'Live now: Gateway Sale by Spicejet', desc: 'With flight fares starting @ ₹2000.', bg: '#3a3d46' },
  { tab: 'Flights', badge: 'Flat ₹500 off', title: 'IndiGo Monsoon Sale — Book Now', desc: 'Limited seats available on select routes.', bg: '#1a3c5e' },
  { tab: 'Flights', badge: 'Up to 30% off', title: 'Air India Summer Deals', desc: 'Fly domestic from just ₹1499.', bg: '#2d4a22' },
  { tab: 'Flights', badge: 'Buy 1 Get 1', title: 'Vistara Weekend Flash Sale', desc: 'Book for 2, pay for 1 on select flights.', bg: '#22334a' },
  { tab: 'Flights', badge: 'Extra 15% off', title: 'GoFirst Early Bird Offer', desc: 'Book 30 days in advance and save big.', bg: '#3d2244' },
  { tab: 'Hotels', badge: 'Up to 40% off', title: 'OYO Weekend Getaway Deals', desc: 'Stay at top hotels starting @ ₹999.', bg: '#1a3c2e' },
  { tab: 'Hotels', badge: 'Flat ₹1000 off', title: 'Taj Hotels Exclusive Offer', desc: 'Luxury stays at unbeatable prices.', bg: '#2e1a3c' },
  { tab: 'Hotels', badge: 'Free Breakfast', title: 'Marriott Summer Sale', desc: 'Book now and enjoy complimentary breakfast.', bg: '#3c2a1a' },
  { tab: 'Hotels', badge: '30% cashback', title: 'Treebo Budget Hotels', desc: 'Best budget stays across India.', bg: '#1a2e3c' },
  { tab: 'Hotels', badge: 'Buy 2 nights get 1 free', title: 'Lemon Tree Special Offer', desc: 'Extended stays made affordable.', bg: '#2e3c1a' },
  { tab: 'Bank Offers', badge: 'Extra 10% cashback', title: 'HDFC Bank Exclusive Offer', desc: 'Use HDFC credit card & save more.', bg: '#4a2222' },
  { tab: 'Bank Offers', badge: 'Flat ₹750 off', title: 'SBI Card Travel Offer', desc: 'Use SBI credit card on flights & hotels.', bg: '#22224a' },
  { tab: 'Bank Offers', badge: '5% cashback', title: 'ICICI Bank EMI Offer', desc: 'Convert bookings to easy EMI.', bg: '#224a22' },
  { tab: 'Bank Offers', badge: 'No cost EMI', title: 'Axis Bank Travel Deal', desc: 'Zero interest EMI on select bookings.', bg: '#4a3322' },
  { tab: 'Bank Offers', badge: '₹500 instant discount', title: 'Kotak Mahindra Offer', desc: 'Instant discount on domestic flights.', bg: '#334a22' },
  { tab: 'Holidays', badge: '20% off', title: 'Goa Beach Holiday Package', desc: '3N/4D package starting @ ₹8999.', bg: '#1a3c5e' },
  { tab: 'Holidays', badge: 'All inclusive', title: 'Kerala Backwaters Tour', desc: 'Houseboat stay + sightseeing included.', bg: '#1a5e3c' },
  { tab: 'Holidays', badge: 'Early bird discount', title: 'Rajasthan Heritage Tour', desc: '5N/6D package with hotel & transport.', bg: '#5e3c1a' },
  { tab: 'Holidays', badge: 'Couple special', title: 'Shimla Manali Honeymoon', desc: 'Romantic getaway starting @ ₹12999.', bg: '#3c1a5e' },
  { tab: 'Holidays', badge: 'Group discount', title: 'Andaman Island Package', desc: 'Best group rates for 4+ travelers.', bg: '#1a5e5e' },
  { tab: 'Trains', badge: 'Flat ₹200 off', title: 'IRCTC Tatkal Offer', desc: 'Save on tatkal bookings with promo code.', bg: '#3c2a1a' },
  { tab: 'Trains', badge: '10% cashback', title: 'Rajdhani Express Deal', desc: 'Cashback on premium train bookings.', bg: '#1a2a3c' },
  { tab: 'Trains', badge: 'Free meal', title: 'Shatabdi Express Offer', desc: 'Complimentary meal on select routes.', bg: '#2a3c1a' },
  { tab: 'Trains', badge: 'Senior discount', title: 'Senior Citizen Rail Pass', desc: 'Special fares for 60+ travelers.', bg: '#3c1a2a' },
  { tab: 'Trains', badge: 'Student offer', title: 'Student Rail Concession', desc: 'Up to 50% off for students.', bg: '#1a3c2a' },
  { tab: 'Cabs', badge: '₹100 off first ride', title: 'Ola First Ride Offer', desc: 'New users get flat ₹100 off.', bg: '#2a1a3c' },
  { tab: 'Cabs', badge: '20% off', title: 'Uber Airport Transfer Deal', desc: 'Discounted airport rides all week.', bg: '#3c1a1a' },
  { tab: 'Cabs', badge: 'Free upgrade', title: 'Meru Cabs Premium Offer', desc: 'Get free upgrade to sedan on booking.', bg: '#1a3c3c' },
  { tab: 'Cabs', badge: 'Flat ₹50 off', title: 'Rapido Bike Taxi Offer', desc: 'Quick rides at discounted rates.', bg: '#3c3c1a' },
  { tab: 'Cabs', badge: 'Cashback ₹150', title: 'InDrive Weekend Offer', desc: 'Cashback on weekend rides.', bg: '#1a1a3c' },
  { tab: 'Bus', badge: '15% off', title: 'RedBus Monsoon Sale', desc: 'AC sleeper buses starting @ ₹299.', bg: '#3c1a2a' },
  { tab: 'Bus', badge: 'Flat ₹100 off', title: 'AbhiBus First Booking', desc: 'New users get instant discount.', bg: '#2a3c1a' },
  { tab: 'Bus', badge: 'Free cancellation', title: 'VRL Travels Offer', desc: 'Book with free cancellation option.', bg: '#1a2a3c' },
  { tab: 'Bus', badge: 'Combo deal', title: 'KSRTC Volvo Special', desc: 'Combo offer on return journey.', bg: '#3c2a2a' },
  { tab: 'Bus', badge: '₹200 cashback', title: 'Parveen Travels Deal', desc: 'Cashback on bookings above ₹500.', bg: '#2a2a3c' },
  { tab: 'Forex', badge: 'Zero markup', title: 'BookMyForex Best Rates', desc: 'Get best forex rates with zero markup.', bg: '#1a3c1a' },
  { tab: 'Forex', badge: 'Free delivery', title: 'Thomas Cook Forex Offer', desc: 'Free home delivery on forex orders.', bg: '#3c1a3c' },
  { tab: 'Forex', badge: '₹500 off', title: 'Centrum Forex Deal', desc: 'Discount on forex card loading.', bg: '#1a1a3c' },
  { tab: 'Forex', badge: 'Best rate guarantee', title: 'ExTravelMoney Offer', desc: 'Best guaranteed rates on USD & EUR.', bg: '#3c3c1a' },
  { tab: 'Forex', badge: 'Instant card', title: 'Niyo Global Card Offer', desc: 'Zero forex markup on international spends.', bg: '#1a3c3c' },
];

export default function Offers() {
  const [activeTab, setActiveTab] = useState('All Offers');

  const filtered = activeTab === 'All Offers'
    ? OFFERS.slice(0, 5)
    : OFFERS.filter((o) => o.tab === activeTab);

  return (
    <section className="offers section">
      <div className="container">
      <div className="section-header mb-30">
        <h2 className="section-title">Offers</h2>
        <p className="section-subtitle">Trending destinations</p>
      </div>

      <div className="tabs">
        {TABS.map((tab) => (
          <div
            key={tab}
            className={`tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
        <button className="see-all">See all Offer</button>
      </div>

      <div className="card-grid card-grid--5">
        {filtered.map((offer, i) => (
          <div className="card" key={i}>
            <div className="image" style={{ background: offer.bg }}>
              <span className="badge">{offer.badge}</span>
            </div>
            <div className="content">
              <h4>{offer.title}</h4>
              <p>{offer.desc}</p>
              <span className="tnc">T&Cs APPLY</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
