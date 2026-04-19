import { useState } from 'react';
import { registerUser } from '../services/onboardingService';

const validate = (form) => {
  const errors = {};
  if (!form.agencyName.trim()) errors.agencyName = 'Agency name is required';
  if (!form.agentType) errors.agentType = 'Agent type is required';
  if (!form.firstName.trim()) errors.firstName = 'First name is required';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required';
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Valid email is required';
  if (form.agentType === 'Distributor' && !form.distributorAgents) errors.distributorAgents = 'This field is required';
  if (!form.agreed) errors.agreed = 'Please agree to Terms & Privacy';
  return errors;
};

export const useRegister = ({ mobile, onSuccess, onToast }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = async (form) => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await registerUser({ mobile, form });
      onToast('Registration successful!', 'success');
      onSuccess();
    } catch (err) {
      onToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, handleRegister };
};
