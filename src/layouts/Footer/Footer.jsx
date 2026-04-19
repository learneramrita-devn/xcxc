import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './_footer.scss';

const FOOTER_LINKS = [
  {
    title: 'Help',
    links: [
      { label: 'Help Center', to: '/help' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Cookie Policy', to: '/cookie-policy' },
      { label: 'Terms of Use', to: '/terms' },
      { label: 'Manage Cookie Settings', to: '/cookie-settings' },
      { label: 'Digital Services Act (EU)', to: '/dsa' },
      { label: 'Content Guidelines & Reporting', to: '/content-guidelines' },
      { label: 'Modern Slavery Statement', to: '/modern-slavery' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press', to: '/press' },
      { label: 'Blog', to: '/blog' },
      { label: 'PointsMAX', to: '/pointsmax' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { label: 'Countries/Territories', to: '/destinations/countries' },
      { label: 'All Flight Routes', to: '/flights' },
    ],
  },
  {
    title: 'Partner with us',
    links: [
      { label: 'YCS Partner Portal', to: '/agency/register' },
      { label: 'Partner Hub', to: '/business/corporate' },
      { label: 'Advertise on Subhsafar', to: '/advertise' },
      { label: 'Affiliates', to: '/affiliates' },
      { label: 'Subhsafar API Documentation', to: '/business/api-partners' },
    ],
  },
  {
    title: 'Get the App',
    links: [
      { label: 'iOS App', to: '#' },
      { label: 'Android App', to: '#' },
    ],
  },
];

const HOTEL_LINKS = 'Hotels in Coimbatore | Hotels in Mandarmani | Hotels in Kodaikanal | Hotels in Kochi | Hotels in Visakhapatnam | Hotels in Trivandrum | Hotels in Noida | Hotels in Nasik | Hotels in Nagpur | Hotels in Tiruchendur | Hotels in Guwahati | Hotels in Daman | Hotels in Bhopal | Hotels in Udupi | Hotels in Kolhapur | Hotels in Gangtok | Hotels in Kanyakumari | Hotels in Mathura | Hotels in Tarapith | Hotels in Diu | Hotels in Ajmer | Hotels in Vadodara | Hotels in Dharamshala';

const FOOTER_MIDDLE = [
  { title: 'Most Searched Hotels In India', links: HOTEL_LINKS },
  { title: 'Budget Hotels In City', links: `${HOTEL_LINKS} ${HOTEL_LINKS}` },
  { title: 'Top Hotels in India', links: HOTEL_LINKS },
  { title: 'Trending Hotels in India', links: `${HOTEL_LINKS} ${HOTEL_LINKS}` },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {FOOTER_LINKS.map(({ title, links }) => (
            <div key={title}>
              <h4>{title}</h4>
              <ul>
                {links.map(({ label, to }) => (
                  <li key={label}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-middle">
          {FOOTER_MIDDLE.map(({ title, links }) => (
            <div key={title} className="footer-middle__section">
              <h5>{title}</h5>
              <p>{links}</p>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom__logo">
            <img src={logo} alt="TravelApp" />
          </div>

          <div className="footer-bottom__apps">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
          </div>

          <div className="footer-bottom__social">
            <span className="footer-bottom__social-label">Connect with us:</span>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
          </div>
        </div>

        <div className="footer-copyright">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
}
