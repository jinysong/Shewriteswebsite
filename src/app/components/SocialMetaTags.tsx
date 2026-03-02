import { useEffect } from 'react';

interface SocialMetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'book' | 'profile';
  author?: string;
  publishedTime?: string;
  tags?: string[];
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export function SocialMetaTags({
  title,
  description,
  image,
  url = window.location.href,
  type = 'website',
  author = 'Ruby Satana',
  publishedTime,
  tags = [],
  twitterCard = 'summary_large_image'
}: SocialMetaTagsProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic Meta Tags
    setMetaTag('description', description, true);
    setMetaTag('author', author, true);
    if (tags.length > 0) {
      setMetaTag('keywords', tags.join(', '), true);
    }

    // Open Graph Meta Tags
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:type', type);
    setMetaTag('og:url', url);
    setMetaTag('og:site_name', "Ruby Satana's Thriller Book Series");
    setMetaTag('og:locale', 'en_US');
    
    if (image) {
      setMetaTag('og:image', image);
      setMetaTag('og:image:width', '1200');
      setMetaTag('og:image:height', '630');
      setMetaTag('og:image:alt', title);
    }

    if (author) {
      setMetaTag('article:author', author);
    }

    if (publishedTime) {
      setMetaTag('article:published_time', publishedTime);
    }

    if (tags.length > 0) {
      tags.forEach(tag => {
        setMetaTag('article:tag', tag);
      });
    }

    // Twitter Card Meta Tags
    setMetaTag('twitter:card', twitterCard, true);
    setMetaTag('twitter:title', title, true);
    setMetaTag('twitter:description', description, true);
    setMetaTag('twitter:creator', '@rubysatana', true);
    setMetaTag('twitter:site', '@rubysatana', true);
    
    if (image) {
      setMetaTag('twitter:image', image, true);
      setMetaTag('twitter:image:alt', title, true);
    }

    // Additional Meta Tags for Better SEO
    setMetaTag('robots', 'index, follow', true);
    setMetaTag('googlebot', 'index, follow', true);
    setMetaTag('theme-color', '#1a1a1a', true);
    
    // Mobile Meta Tags
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0', true);
    setMetaTag('format-detection', 'telephone=no', true);

    // Apple Meta Tags
    setMetaTag('apple-mobile-web-app-capable', 'yes', true);
    setMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent', true);
    setMetaTag('apple-mobile-web-app-title', title, true);

    // Facebook Meta Tags
    setMetaTag('fb:app_id', 'YOUR_FACEBOOK_APP_ID');

    // Additional Book-specific tags if type is book
    if (type === 'book') {
      setMetaTag('book:author', author);
      setMetaTag('book:genre', 'Thriller');
      if (publishedTime) {
        setMetaTag('book:release_date', publishedTime);
      }
      tags.forEach(tag => {
        setMetaTag('book:tag', tag);
      });
    }

  }, [title, description, image, url, type, author, publishedTime, tags, twitterCard]);

  return null;
}

// Preset configurations for common pages
export const homePageMeta = {
  title: "Ruby Satana's Thriller Book Series | Psychological Thrillers",
  description: "Discover award-winning psychological thrillers by Ruby Satana. Featuring 'The Husband Killed Her', 'The Mountain Killed Her', and 'The Flight Killed Her'. Dark secrets, betrayal, and murder await.",
  tags: ['thriller', 'psychological thriller', 'mystery', 'suspense', 'crime fiction', 'Ruby Satana', 'books', 'bestseller'],
  type: 'website' as const
};

export const catalogPageMeta = {
  title: "Book Catalog | Ruby Satana Thriller Series",
  description: "Browse all thriller books by Ruby Satana. Award-winning psychological mysteries featuring complex plots, dark secrets, and unforgettable twists.",
  tags: ['book catalog', 'thriller books', 'mystery novels', 'Ruby Satana', 'psychological thriller'],
  type: 'website' as const
};

export const authorPageMeta = {
  title: "About Ruby Satana | Thriller Author",
  description: "Meet Ruby Satana, bestselling author of psychological thrillers. Discover her journey, inspirations, and the stories behind her gripping mystery novels.",
  tags: ['Ruby Satana', 'author', 'thriller writer', 'mystery author', 'bestselling author'],
  type: 'profile' as const
};

export const quizPageMeta = {
  title: "Dark Triad Personality Quiz | Ruby Satana",
  description: "Take the Dark Triad personality quiz to discover which psychological thriller resonates with your darker traits. Are you cunning, cold, or deceptive?",
  tags: ['personality quiz', 'dark triad', 'psychology', 'thriller', 'interactive'],
  type: 'website' as const
};
