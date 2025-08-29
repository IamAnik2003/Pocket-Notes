import { useState, useEffect } from 'react';
import styles from './LearnMore.module.css';

export default function LearnMore({ onClose })  {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the popup animation on mount
    setIsVisible(true);
    
    // Prevent background scrolling when popup is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(); // Call the parent's close handler after animation
    }, 300); // Match this with your CSS transition duration
  };

  return (
    <div className={`${styles.popupOverlay} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.popupContainer}>
        <button 
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close popup"
        >
          &times;
        </button>
        
        <div className={styles.popupContent}>
          <h2>Why Choose Pocket Notes?</h2>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📝</div>
            <h3>Organized Note-Taking</h3>
            <p>Create, categorize, and find your notes instantly with our intuitive organization system.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔐</div>
            <h3>Secure & Private</h3>
            <p>Your thoughts stay private with end-to-end encryption and secure cloud sync.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Lightning Fast</h3>
            <p>Capture ideas instantly with our optimized app that works even offline.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔄</div>
            <h3>Sync Across Devices</h3>
            <p>Access your notes anywhere - on your phone, tablet, or computer.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔍</div>
            <h3>Powerful Search</h3>
            <p>Find any note in seconds with our advanced search and tagging system.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h3>Rich Formatting</h3>
            <p>Express yourself with text formatting, checklists, images, and more.</p>
          </div>
          
          <button 
            className={styles.ctaButton}
            onClick={handleClose}
          >
            Start Taking Notes Now
          </button>
        </div>
      </div>
    </div>
  );
};