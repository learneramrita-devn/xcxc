import { useState } from 'react';
import { checkUserExists } from '../services/onboardingService';

export const useOnboarding = ({ onUserExists, onNewUser, onToast }) => {
  const [loading, setLoading] = useState(false);
  const [mobileError, setMobileError] = useState('');

  const handleMobileCheck = async (mobile) => {
    if (!/^\d{10}$/.test(mobile)) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return;
    }
    setMobileError('');
    setLoading(true);
    try {
      const { exists, tenantId } = await checkUserExists(mobile);
      if (exists) {
        onUserExists();
      } else {
        onNewUser(tenantId);
      }
    } catch (err) {
      // user-check API unreliable — go to login by default
      onUserExists();
    } finally {
      setLoading(false);
    }
  };

  return { loading, mobileError, handleMobileCheck };
};
