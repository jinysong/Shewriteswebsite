import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router';
import {
  trackPageView,
  trackTimeOnPage,
  trackScrollDepth,
  trackNavigation
} from '../utils/analytics';

// Hook for tracking page views
export const usePageTracking = (pageTitle: string) => {
  const location = useLocation();
  const startTimeRef = useRef<number>(Date.now());
  const lastScrollPercentRef = useRef<number>(0);
  const hasTrackedPageViewRef = useRef<boolean>(false);

  useEffect(() => {
    // Track page view only once per mount
    if (!hasTrackedPageViewRef.current) {
      trackPageView(location.pathname, pageTitle);
      hasTrackedPageViewRef.current = true;
      startTimeRef.current = Date.now();
    }

    // Track scroll depth
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      // Track at 25%, 50%, 75%, 100% milestones
      const milestones = [25, 50, 75, 100];
      const nextMilestone = milestones.find(m => m > lastScrollPercentRef.current && scrollPercent >= m);
      
      if (nextMilestone) {
        trackScrollDepth(pageTitle, nextMilestone);
        lastScrollPercentRef.current = nextMilestone;
      }
    };

    // Track time on page when leaving
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackTimeOnPage(pageTitle, timeSpent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Track time on page when component unmounts
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackTimeOnPage(pageTitle, timeSpent);
    };
  }, [location.pathname, pageTitle]);
};

// Hook for tracking book interactions
export const useBookTracking = () => {
  const trackBookInteraction = useCallback((bookTitle: string, position: number) => {
    // Using dynamic import to avoid circular dependencies
    import('../utils/analytics').then(({ trackBookView }) => {
      trackBookView(bookTitle, position);
    });
  }, []);

  const trackPurchase = useCallback((
    bookTitle: string, 
    platform: 'kindle' | 'audible' | 'amazon' | 'paperback',
    price?: number
  ) => {
    import('../utils/analytics').then(({ trackPurchaseClick }) => {
      trackPurchaseClick(bookTitle, platform, price);
    });
  }, []);

  const trackSample = useCallback((bookTitle: string) => {
    import('../utils/analytics').then(({ trackSampleDownload }) => {
      trackSampleDownload(bookTitle);
    });
  }, []);

  return {
    trackBookInteraction,
    trackPurchase,
    trackSample
  };
};

// Hook for tracking navigation
export const useNavigationTracking = () => {
  const location = useLocation();
  const previousPathRef = useRef<string>(location.pathname);

  const trackNav = useCallback((to: string, method: string = 'link') => {
    trackNavigation(previousPathRef.current, to, method);
    previousPathRef.current = to;
  }, []);

  return trackNav;
};

// Hook for session tracking
export const useSessionTracking = () => {
  useEffect(() => {
    const sessionStart = Date.now();
    const sessionId = `session_${sessionStart}`;
    
    // Store session info
    sessionStorage.setItem('analytics_session_id', sessionId);
    sessionStorage.setItem('analytics_session_start', sessionStart.toString());
    
    // Track session data
    const trackSessionData = () => {
      const start = parseInt(sessionStorage.getItem('analytics_session_start') || '0');
      const duration = Math.round((Date.now() - start) / 1000);
      const pageViews = parseInt(sessionStorage.getItem('analytics_page_views') || '0');
      
      console.log(`📊 Session Summary: Duration: ${duration}s, Page Views: ${pageViews}`);
    };

    window.addEventListener('beforeunload', trackSessionData);

    return () => {
      window.removeEventListener('beforeunload', trackSessionData);
    };
  }, []);
};

// Hook for tracking form submissions
export const useFormTracking = () => {
  const trackFormStart = useCallback((formName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_start', {
        event_category: 'Form',
        event_label: formName
      });
      console.log(`📊 Analytics: Form started - ${formName}`);
    }
  }, []);

  const trackFormComplete = useCallback((formName: string, success: boolean) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'Form',
        event_label: formName,
        success: success
      });
      console.log(`📊 Analytics: Form submitted - ${formName} (${success ? 'Success' : 'Failed'})`);
    }
  }, []);

  return {
    trackFormStart,
    trackFormComplete
  };
};

// Hook for tracking video/audio engagement (for audiobook samples)
export const useMediaTracking = () => {
  const trackMediaPlay = useCallback((mediaTitle: string, mediaType: 'audio' | 'video') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'media_play', {
        event_category: 'Media Engagement',
        event_label: mediaTitle,
        media_type: mediaType
      });
      console.log(`📊 Analytics: Media played - ${mediaTitle} (${mediaType})`);
    }
  }, []);

  const trackMediaComplete = useCallback((mediaTitle: string, mediaType: 'audio' | 'video') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'media_complete', {
        event_category: 'Media Engagement',
        event_label: mediaTitle,
        media_type: mediaType
      });
      console.log(`📊 Analytics: Media completed - ${mediaTitle} (${mediaType})`);
    }
  }, []);

  return {
    trackMediaPlay,
    trackMediaComplete
  };
};

// Hook for A/B testing tracking
export const useABTestTracking = () => {
  const trackVariant = useCallback((experimentName: string, variant: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_variant', {
        event_category: 'A/B Testing',
        event_label: experimentName,
        variant: variant
      });
      console.log(`📊 Analytics: A/B Test - ${experimentName} (Variant: ${variant})`);
    }
  }, []);

  return trackVariant;
};
