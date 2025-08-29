import { useState, useEffect } from 'react';
import styles from './LogoutConfirmation.module.css';

export default function LogoutConfirmation({ onConfirm, onCancel }){
  const [isVisible, setIsVisible] = useState(false);
  

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300); // Match CSS transition duration
  };

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(onConfirm, 300);
  };

  return (
    <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}>
      <div className={`${styles.modal} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>Ready to leave?</h2>
          <p className={styles.message}>
            Are you sure you want to log out of your Chirp account?
          </p>
          
          <div className={styles.buttons}>
            <button
              onClick={handleClose}
              className={`${styles.button} ${styles.cancelButton}`}
              aria-label="Cancel logout"
            >
              Stay Logged In
            </button>
            <button
              onClick={handleConfirm}
              className={`${styles.button} ${styles.confirmButton}`}
              aria-label="Confirm logout"
            >
              Yes, Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

