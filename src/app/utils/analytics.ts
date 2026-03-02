// Analytics utility for tracking user behavior and engagement
// This module provides a centralized way to track events across the application

// Google Analytics 4 configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 Measurement ID

// Initialize Google Analytics
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Load Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll handle page views manually
    cookie_flags: 'SameSite=None;Secure', // For better privacy compliance
  });
};

// Page view tracking
export const trackPageView = (path: string, title: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });

  console.log(`📊 Analytics: Page view tracked - ${title} (${path})`);
};

// Book interaction events
export const trackBookView = (bookTitle: string, position: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'view_item', {
    event_category: 'Book Interaction',
    event_label: bookTitle,
    value: position,
    items: [{
      item_id: bookTitle.toLowerCase().replace(/\s/g, '-'),
      item_name: bookTitle,
      item_category: 'Thriller Book',
      index: position
    }]
  });

  console.log(`📊 Analytics: Book viewed - ${bookTitle} (Position: ${position})`);
};

export const trackPurchaseClick = (bookTitle: string, platform: 'kindle' | 'audible' | 'amazon' | 'paperback', price?: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'begin_checkout', {
    event_category: 'Purchase Intent',
    event_label: `${bookTitle} - ${platform}`,
    currency: 'USD',
    value: price || 0,
    items: [{
      item_id: bookTitle.toLowerCase().replace(/\s/g, '-'),
      item_name: bookTitle,
      item_category: 'Thriller Book',
      item_variant: platform,
      price: price || 0
    }]
  });

  console.log(`📊 Analytics: Purchase click - ${bookTitle} on ${platform}`);
};

export const trackSampleDownload = (bookTitle: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'download', {
    event_category: 'Engagement',
    event_label: `Sample Chapter - ${bookTitle}`,
    file_name: `${bookTitle.toLowerCase().replace(/\s/g, '-')}-sample.pdf`,
  });

  console.log(`📊 Analytics: Sample download - ${bookTitle}`);
};

// Newsletter events
export const trackNewsletterSignup = (success: boolean) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'sign_up', {
    event_category: 'Newsletter',
    event_label: success ? 'Success' : 'Failed',
    method: 'Email Form'
  });

  console.log(`📊 Analytics: Newsletter signup - ${success ? 'Success' : 'Failed'}`);
};

// Quiz events
export const trackQuizStart = () => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'quiz_start', {
    event_category: 'Quiz',
    event_label: 'Dark Triad Quiz'
  });

  console.log('📊 Analytics: Quiz started');
};

export const trackQuizComplete = (result: string, traits: Record<string, number>) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'quiz_complete', {
    event_category: 'Quiz',
    event_label: result,
    narcissism_score: traits.narcissism || 0,
    psychopathy_score: traits.psychopathy || 0,
    machiavellianism_score: traits.machiavellianism || 0
  });

  console.log(`📊 Analytics: Quiz completed - Result: ${result}`);
};

export const trackQuizAnswer = (questionNumber: number, answer: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'quiz_answer', {
    event_category: 'Quiz',
    event_label: `Question ${questionNumber}`,
    answer_trait: answer
  });
};

// Social sharing events
export const trackSocialShare = (platform: string, content: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'share', {
    event_category: 'Social Sharing',
    event_label: platform,
    content_type: content,
    method: platform
  });

  console.log(`📊 Analytics: Social share - ${platform} (${content})`);
};

// Navigation events
export const trackNavigation = (from: string, to: string, method: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'navigation', {
    event_category: 'Navigation',
    event_label: `${from} → ${to}`,
    method: method // 'button', 'link', 'scroll', etc.
  });

  console.log(`📊 Analytics: Navigation - ${from} → ${to} (${method})`);
};

// Engagement metrics
export const trackTimeOnPage = (pageName: string, seconds: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'timing_complete', {
    event_category: 'Engagement',
    event_label: pageName,
    value: seconds,
    name: 'time_on_page'
  });

  console.log(`📊 Analytics: Time on page - ${pageName} (${seconds}s)`);
};

export const trackScrollDepth = (pageName: string, percentage: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'scroll', {
    event_category: 'Engagement',
    event_label: pageName,
    percent_scrolled: percentage
  });

  console.log(`📊 Analytics: Scroll depth - ${pageName} (${percentage}%)`);
};

// Search events
export const trackSearch = (query: string, resultsCount: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'search', {
    event_category: 'Search',
    search_term: query,
    results_count: resultsCount
  });

  console.log(`📊 Analytics: Search - "${query}" (${resultsCount} results)`);
};

// External link clicks
export const trackExternalLink = (url: string, label: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'click', {
    event_category: 'External Link',
    event_label: label,
    outbound: true,
    link_url: url
  });

  console.log(`📊 Analytics: External link - ${label} (${url})`);
};

// Error tracking
export const trackError = (errorMessage: string, errorLocation: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'exception', {
    description: errorMessage,
    fatal: false,
    location: errorLocation
  });

  console.error(`📊 Analytics: Error tracked - ${errorMessage} at ${errorLocation}`);
};

// User engagement score (custom metric)
export const calculateEngagementScore = (
  pageViews: number,
  timeOnSite: number,
  interactions: number
): number => {
  // Simple engagement score calculation
  // You can adjust the weights based on what's important for your site
  const pageViewScore = Math.min(pageViews * 10, 50);
  const timeScore = Math.min(timeOnSite / 60, 30); // Convert to minutes
  const interactionScore = Math.min(interactions * 5, 20);
  
  return Math.round(pageViewScore + timeScore + interactionScore);
};

// TypeScript definitions
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default {
  initializeAnalytics,
  trackPageView,
  trackBookView,
  trackPurchaseClick,
  trackSampleDownload,
  trackNewsletterSignup,
  trackQuizStart,
  trackQuizComplete,
  trackQuizAnswer,
  trackSocialShare,
  trackNavigation,
  trackTimeOnPage,
  trackScrollDepth,
  trackSearch,
  trackExternalLink,
  trackError,
  calculateEngagementScore
};
