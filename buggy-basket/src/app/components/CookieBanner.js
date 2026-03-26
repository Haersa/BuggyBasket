'use client';

import CookieConsent from 'react-cookie-consent';

export default function CookieBanner() {
  return (
    <CookieConsent
      location="none"
      buttonText="Accept"
      containerClasses="cookie-banner"
      contentClasses="cookie-banner-content"
      buttonClasses="cookie-banner-btn"
      buttonWrapperClasses="cookie-banner-btn-wrapper"
    >
      <p className="cookie-banner-title">🍪 We use cookies</p>
      <p className="cookie-banner-text">
        We use cookies to improve your experience. See our{' '}
        <a href="/privacy" target = "_blank" className="cookie-banner-link">Privacy Policy</a>.
      </p>
    </CookieConsent>
  );
}