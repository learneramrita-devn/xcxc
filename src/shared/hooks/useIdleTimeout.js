import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../app/providers/AuthContext';

const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_TIME = 2 * 60 * 1000; // 2 minutes before timeout

export const useIdleTimeout = (onIdle, onWarning) => {
  const timeoutRef = useRef(null);
  const warningRef = useRef(null);
  const { isLoggedIn } = useAuth();

  const resetTimer = useCallback(() => {
    if (!isLoggedIn) return;

    // Clear existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

    // Set warning timer
    warningRef.current = setTimeout(() => {
      if (onWarning) onWarning();
    }, IDLE_TIMEOUT - WARNING_TIME);

    // Set idle timeout
    timeoutRef.current = setTimeout(() => {
      if (onIdle) onIdle();
    }, IDLE_TIMEOUT);
  }, [isLoggedIn, onIdle, onWarning]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
    };
  }, [isLoggedIn, resetTimer]);

  return { resetTimer };
};
