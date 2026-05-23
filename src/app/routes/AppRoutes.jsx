import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import HomePage from '../../modules/home/pages/HomePage';
import RegistrationForm from '../../modules/onboarding/tenants/pages/RegistrationForm';
import { REGISTRATION_TYPES } from '../../modules/onboarding/tenants/constants/formConfig';
import SEOMeta from '../../shared/components/SEOMeta';
import ProfilePage from '../../modules/users/pages/ProfilePage';

const withMeta = (title, description, element) => (
  <>
    <SEOMeta title={title} description={description} />
    {element}
  </>
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/flights" element={withMeta('Book Cheap Flights Online – TravelApp', 'Search and book cheap domestic & international flights. Compare airfares and get the best flight deals on TravelApp.', <div>Flights</div>)} />
        <Route path="/hotels" element={withMeta('Book Hotels Online – Best Hotel Deals – TravelApp', 'Find and book hotels at the best prices. Explore top-rated hotels, resorts and homestays worldwide on TravelApp.', <div>Hotels</div>)} />
        <Route path="/bus" element={withMeta('Book Bus Tickets Online – TravelApp', 'Book bus tickets online at lowest prices. Compare bus operators, routes and timings easily on TravelApp.', <div>Bus</div>)} />
        <Route path="/trains" element={withMeta('Book Train Tickets Online – TravelApp', 'Book train tickets online quickly and easily. Check train schedules, availability and fares on TravelApp.', <div>Trains</div>)} />
        <Route path="/insurance" element={withMeta('Travel Insurance – Protect Your Trip – TravelApp', 'Get comprehensive travel insurance plans at affordable prices. Protect your trip against cancellations, medical emergencies and more.', <div>Travel Insurance</div>)} />
        <Route path="/offers" element={withMeta('Exclusive Travel Offers & Deals – TravelApp', 'Discover the best travel offers, discount coupons and deals on flights, hotels, bus and train bookings on TravelApp.', <div>Offers</div>)} />
        <Route path="/my-trips" element={withMeta('My Trips – Manage Your Bookings – TravelApp', 'View and manage all your travel bookings in one place. Track your upcoming and past trips on TravelApp.', <div>My Trips</div>)} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/support" element={withMeta('Customer Support – TravelApp', 'Need help? Contact TravelApp customer support for assistance with bookings, cancellations and travel queries.', <div>Support</div>)} />
      </Route>

      {/* Auth — no header */}
      <Route path="/login" element={<Navigate to="/register" replace />} />
      <Route path="/admin" element={<div>Admin Portal</div>} />
      <Route path="/dashboard" element={<div>Dashboard</div>} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/agency/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.AGENCY} />} />
      <Route path="/api-partner/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.API_PARTNER} />} />
      <Route path="/whitelabel/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.WHITELABEL} />} />
      <Route path="/corporate/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.CORPORATE} />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
