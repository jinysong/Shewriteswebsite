import { useEffect, ReactNode } from 'react';
import { initializeAnalytics } from '../utils/analytics';

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize Google Analytics on mount
    initializeAnalytics();

    // Track referrer information
    if (typeof window !== 'undefined' && document.referrer) {
      const referrer = new URL(document.referrer);
      const referrerDomain = referrer.hostname;
      
      sessionStorage.setItem('analytics_referrer', referrerDomain);
      
      // Track traffic source
      if (window.gtag) {
        window.gtag('event', 'traffic_source', {
          event_category: 'Acquisition',
          event_label: referrerDomain,
          source: referrerDomain
        });
      }
    }

    // Track device and browser information
    if (typeof window !== 'undefined' && window.gtag) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isTablet = /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
      
      let deviceType = 'Desktop';
      if (isMobile) deviceType = 'Mobile';
      if (isTablet) deviceType = 'Tablet';

      window.gtag('event', 'device_info', {
        event_category: 'Technical',
        device_type: deviceType,
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
      });
    }

    // Track session start
    if (typeof window !== 'undefined') {
      const sessionStart = Date.now();
      sessionStorage.setItem('analytics_session_start', sessionStart.toString());
      sessionStorage.setItem('analytics_page_views', '0');
      
      console.log('📊 Analytics initialized successfully');
    }

    // Increment page view counter
    const pageViews = parseInt(sessionStorage.getItem('analytics_page_views') || '0');
    sessionStorage.setItem('analytics_page_views', (pageViews + 1).toString());

  }, []);

  return <>{children}</>;
}

// Analytics dashboard component for admin/debugging
export function AnalyticsDashboard() {
  useEffect(() => {
    // This would connect to your analytics backend to fetch data
    // For now, we'll just show what's being tracked
    console.log('📊 Analytics Dashboard - Tracking the following events:');
    console.log('- Page Views');
    console.log('- Book Interactions (views, purchases, sample downloads)');
    console.log('- Newsletter Signups');
    console.log('- Quiz Completion & Results');
    console.log('- Social Shares');
    console.log('- Navigation Patterns');
    console.log('- Time on Page & Scroll Depth');
    console.log('- Search Queries');
    console.log('- External Link Clicks');
  }, []);

  return null;
}

// Privacy-compliant cookie consent (basic version)
export function CookieConsent({ onAccept }: { onAccept?: () => void }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics_consent');
    if (!consent) {
      setShowBanner(true);
    } else if (consent === 'accepted') {
      initializeAnalytics();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('analytics_consent', 'accepted');
    setShowBanner(false);
    initializeAnalytics();
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem('analytics_consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-lg"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ fontFamily: "Verdana, sans-serif" }}>
          We use cookies and analytics to improve your experience and understand how you interact with our content. 
          By clicking "Accept", you consent to our use of cookies and analytics.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm transition-colors"
            style={{ fontFamily: "Verdana, sans-serif" }}
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold transition-colors"
            style={{ fontFamily: "Verdana, sans-serif" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
