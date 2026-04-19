import { useState } from 'react';
import './_faq.scss';

const FAQS = [
  { question: 'Why is flight ticket booking the cheapest on Subhsafar?', answer: 'We provide best deals using smart pricing, exclusive airline partnerships, and special offers that help you save more on every booking.' },
  { question: 'How do I book cheap flight tickets?', answer: 'Use our offers section, compare prices across airlines, book early, and enable price alerts to get the best deals.' },
  { question: 'Can I cancel or reschedule my flight booking?', answer: 'Yes, you can cancel or reschedule your booking from the My Trips section. Cancellation charges may apply based on the airline policy.' },
  { question: 'What payment methods are accepted?', answer: 'We accept all major credit/debit cards, net banking, UPI, and popular wallets like Paytm and PhonePe.' },
  { question: 'How do I get my e-ticket after booking?', answer: 'Your e-ticket will be sent to your registered email address immediately after booking confirmation.' },
  { question: 'Is it safe to book flights online on Subhsafar?', answer: 'Absolutely. We use industry-standard SSL encryption and secure payment gateways to ensure your data and transactions are fully protected.' },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <section className="faq section">
      <div className="faq__container">
        <h2 className="section-title">Frequently Asked Questions</h2>

        <div className="faq__list">
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq__item${activeIndex === i ? ' active' : ''}`}>
              <div className="faq__question" onClick={() => toggle(i)}>
                <span>{faq.question}</span>
                <i className="faq__icon"></i>
              </div>
              <div className="faq__answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
