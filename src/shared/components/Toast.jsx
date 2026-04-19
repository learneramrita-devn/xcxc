import { useEffect } from 'react';
import './_toast.scss';

const Toast = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast-notification toast-notification--${type}`}>
      <span>{message}</span>
      <button className="toast-notification__close" onClick={onClose}>✕</button>
    </div>
  );
};

export default Toast;
