import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import HomePage from '../../modules/home/pages/HomePage';
import LoginPage from '../../modules/auth/pages/LoginPage';
import RegistrationForm from '../../modules/onboarding/tenants/pages/RegistrationForm';
import { REGISTRATION_TYPES } from '../../modules/onboarding/tenants/constants/formConfig';
import SEOMeta from '../../shared/components/SEOMeta';
import ProfilePage from '../../modules/users/pages/ProfilePage';
import ProfileWithTabsNew from '../../modules/users/pages/ProfileWithTabsNew';
import BasicProfilePage from '../../modules/users/pages/BasicProfilePage';
import BasicProfilePageWithTabs from '../../modules/users/pages/BasicProfilePageWithTabs';
import CompanyDetailsPage from '../../modules/users/pages/CompanyDetailsPage';
import BankingDetailsPage from '../../modules/users/pages/BankingDetailsPage';
import SubUsersPage from '../../modules/users/pages/SubUsersPage';
import ChangePasswordPage from '../../modules/users/pages/ChangePasswordPage';
import ChangeEmailPage from '../../modules/users/pages/ChangeEmailPage';
import EmailVerificationPage from '../../modules/users/pages/EmailVerificationPage';
import ForgotPasswordPage from '../../modules/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../../modules/auth/pages/ResetPasswordPage';
import MyAccountLayout from '../../modules/users/pages/MyAccountLayout';
import DashboardPage from '../../modules/dashboard/pages/DashboardPage';
import FlightSearchPage from '../../modules/flights/pages/FlightSearchPage';
import FlightResultsPage from '../../modules/flights/pages/FlightResultsPage';
import FlightReviewPage from '../../modules/flights/pages/FlightReviewPage';
import FlightBookingPage from '../../modules/flights/pages/FlightBookingPage';
import MyBookingsPage from '../../modules/flights/pages/MyBookingsPage';

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
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfileWithTabsNew />} />
        
        {/* My Account Routes with Sidebar */}
        <Route path="/my-account/*" element={
          <MyAccountLayout>
            <Routes>
              <Route index element={<Navigate to="/my-account/basic-profile" replace />} />
              <Route path="basic-profile" element={<BasicProfilePageWithTabs />} />
              <Route path="company-details" element={<CompanyDetailsPage />} />
              <Route path="banking-details" element={<BankingDetailsPage />} />
              <Route path="sub-users" element={<SubUsersPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="bookings" element={withMeta('My Bookings – TravelApp', 'View all your bookings', <div style={{padding: '20px', background: '#fff', borderRadius: '8px'}}><h2>My Bookings</h2><p>View all your travel bookings here.</p></div>)} />
              <Route path="invoices" element={withMeta('Invoices – TravelApp', 'View your invoices', <div style={{padding: '20px', background: '#fff', borderRadius: '8px'}}><h2>Invoices</h2><p>View and download your invoices here.</p></div>)} />
              <Route path="reports" element={withMeta('Reports – TravelApp', 'View reports', <div style={{padding: '20px', background: '#fff', borderRadius: '8px'}}><h2>Reports</h2><p>View detailed reports and analytics here.</p></div>)} />
              <Route path="deposit-request" element={withMeta('Deposit Request – TravelApp', 'Request a deposit', <div style={{padding: '20px', background: '#fff', borderRadius: '8px'}}><h2>Deposit Request</h2><p>Request deposits to your account here.</p></div>)} />
              <Route path="gst-detail" element={withMeta('GST Detail – TravelApp', 'Manage your GST details', <div style={{padding: '20px', background: '#fff', borderRadius: '8px'}}><h2>GST Detail</h2><p>Manage your GST information here.</p></div>)} />
              <Route path="frequent-travellers" element={withMeta('Frequent Travellers – TravelApp', 'Manage frequent travellers', <div style={{padding: '20px', background: '#fff', borderRadius: '8px'}}><h2>Frequent Travellers</h2><p>Manage your frequent traveller list here.</p></div>)} />
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route path="change-email" element={<ChangeEmailPage />} />
            </Routes>
          </MyAccountLayout>
        } />
        
        <Route path="/flights" element={withMeta('Book Cheap Flights Online – TravelApp', 'Search and book cheap domestic & international flights. Compare airfares and get the best flight deals on TravelApp.', <Navigate to="/flights/search" replace />)} />
        <Route path="/flights/search" element={<FlightSearchPage />} />
        <Route path="/flights/results" element={<FlightResultsPage />} />
        <Route path="/flights/review" element={<FlightReviewPage />} />
        <Route path="/flights/booking" element={<FlightBookingPage />} />
        <Route path="/flights/bookings" element={<MyBookingsPage />} />
        <Route path="/hotels" element={withMeta('Book Hotels Online – Best Hotel Deals – TravelApp', 'Find and book hotels at the best prices. Explore top-rated hotels, resorts and homestays worldwide on TravelApp.', <div>Hotels</div>)} />
        <Route path="/bus" element={withMeta('Book Bus Tickets Online – TravelApp', 'Book bus tickets online at lowest prices. Compare bus operators, routes and timings easily on TravelApp.', <div>Bus</div>)} />
        <Route path="/trains" element={withMeta('Book Train Tickets Online – TravelApp', 'Book train tickets online quickly and easily. Check train schedules, availability and fares on TravelApp.', <div>Trains</div>)} />
        <Route path="/insurance" element={withMeta('Travel Insurance – Protect Your Trip – TravelApp', 'Get comprehensive travel insurance plans at affordable prices. Protect your trip against cancellations, medical emergencies and more.', <div>Travel Insurance</div>)} />
        <Route path="/offers" element={withMeta('Exclusive Travel Offers & Deals – TravelApp', 'Discover the best travel offers, discount coupons and deals on flights, hotels, bus and train bookings on TravelApp.', <div>Offers</div>)} />
        <Route path="/my-trips" element={withMeta('My Trips – Manage Your Bookings – TravelApp', 'View and manage all your travel bookings in one place. Track your upcoming and past trips on TravelApp.', <div>My Trips</div>)} />
        <Route path="/my-bookings" element={withMeta('My Bookings – TravelApp', 'View all your bookings', <div>My Bookings</div>)} />
        <Route path="/ledger" element={withMeta('Ledger – TravelApp', 'View your ledger', <div>Ledger</div>)} />
        <Route path="/invoices" element={withMeta('Invoices – TravelApp', 'View your invoices', <div>Invoices</div>)} />
        <Route path="/reports" element={withMeta('Reports – TravelApp', 'View reports', <div>Reports</div>)} />
        <Route path="/check-in" element={withMeta('Check-In – TravelApp', 'Check-in for your flight', <div>Check-In</div>)} />
        <Route path="/pax-calendar" element={withMeta('Pax Calendar – TravelApp', 'View passenger calendar', <div>Pax Calendar</div>)} />
        <Route path="/view-statement" element={withMeta('View Statement – TravelApp', 'View your account statement', <div>View Statement</div>)} />
        <Route path="/add-money" element={withMeta('Add Money – TravelApp', 'Add money to your account', <div>Add Money</div>)} />
        <Route path="/support" element={withMeta('Customer Support – TravelApp', 'Need help? Contact TravelApp customer support for assistance with bookings, cancellations and travel queries.', <div>Support</div>)} />
      </Route>

      {/* Auth — no header */}
      <Route path="/login" element={<Navigate to="/register" replace />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/admin" element={<div>Admin Portal</div>} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/agency/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.AGENCY} />} />
      <Route path="/api-partner/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.API_PARTNER} />} />
      <Route path="/whitelabel/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.WHITELABEL} />} />
      <Route path="/corporate/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.CORPORATE} />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
