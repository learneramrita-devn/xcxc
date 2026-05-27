import { Helmet } from 'react-helmet-async';

const EnhancedSEO = ({
  title = 'TravelApp – Book Flights, Hotels, Bus & Train Tickets Online',
  description = 'Book cheap flights, hotels, bus and train tickets online with TravelApp. Get exclusive travel deals, offers and travel insurance at the best prices.',
  canonical = '',
  keywords = 'travel, flights, hotels, bus tickets, train tickets, travel insurance, travel deals, online booking',
  image = 'https://www.travelapp.com/og-image.jpg',
  type = 'website',
  author = 'TravelApp',
  schema = null,
}) => {
  const siteUrl = 'https://www.travelapp.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TravelApp',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-800-900-9009',
      contactType: 'Customer Service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.facebook.com/travelapp',
      'https://www.twitter.com/travelapp',
      'https://www.instagram.com/travelapp',
      'https://www.linkedin.com/company/travelapp',
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="TravelApp" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      <meta property="twitter:site" content="@travelapp" />
      <meta property="twitter:creator" content="@travelapp" />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="TravelApp" />

      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />

      {/* Structured Data / Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    </Helmet>
  );
};

export default EnhancedSEO;
