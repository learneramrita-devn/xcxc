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
        onToast('Number does not exist. Please register first.', 'error');
        setTimeout(() => onNewUser(tenantId), 500);
      }
    } catch (err) {
      onToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return { loading, mobileError, handleMobileCheck };
};
