import { useState } from 'react';
import AppRoutes from './app/routes/AppRoutes';
import { useAuth } from './app/providers/AuthContext';
import { useIdleTimeout } from './shared/hooks/useIdleTimeout';
import Toast from './shared/components/Toast';

function App() {
  const { logout, isLoggedIn } = useAuth();
  const [toast, setToast] = useState(null);

  const handleIdle = () => {
    if (isLoggedIn) {
      logout();
      setToast({ message: 'You have been logged out due to inactivity', type: 'warning' });
      setTimeout(() => {
        window.location.href = '/register';
      }, 2000);
    }
  };

  const handleWarning = () => {
    if (isLoggedIn) {
      setToast({ message: 'You will be logged out in 2 minutes due to inactivity', type: 'warning' });
    }
  };

  useIdleTimeout(handleIdle, handleWarning);

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AppRoutes />
    </>
  );
}

export default App;
