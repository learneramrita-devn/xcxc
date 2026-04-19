import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import HomePage from '../../modules/home/pages/HomePage';
import RegistrationForm from '../../modules/onboarding/tenants/pages/RegistrationForm';
import { REGISTRATION_TYPES } from '../../modules/onboarding/tenants/constants/formConfig';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/flights" element={<div>Flights</div>} />
        <Route path="/hotels" element={<div>Hotels</div>} />
        <Route path="/bus" element={<div>Bus</div>} />
        <Route path="/trains" element={<div>Trains</div>} />
        <Route path="/insurance" element={<div>Travel Insurance</div>} />
        <Route path="/offers" element={<div>Offers</div>} />
        <Route path="/my-trips" element={<div>My Trips</div>} />
        <Route path="/support" element={<div>Support</div>} />
      </Route>

      {/* Auth — no header */}
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.AGENCY} />} />
      <Route path="/agency/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.AGENCY} />} />
      <Route path="/api-partner/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.API_PARTNER} />} />
      <Route path="/whitelabel/register" element={<RegistrationForm registrationType={REGISTRATION_TYPES.WHITELABEL} />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
