// SEO utility functions and components
import { useEffect } from 'react';

// SEO Keywords for the thriller book series
export const seoKeywords = {
  primary: [
    'psychological thriller',
    'thriller books',
    'mystery novels',
    'suspense fiction',
    'Ruby Satana',
    'dark thriller',
    'crime fiction'
  ],
  books: {
    husband: [
      'domestic thriller',
      'marriage thriller',
      'psychological suspense',
      'narcissist thriller',
      'toxic relationship books'
    ],
    mountain: [
      'survival thriller',
      'mountain mystery',
      'isolated thriller',
      'psychopath fiction',
      'wilderness suspense'
    ],
    flight: [
      'airplane thriller',
      'missing person mystery',
      'manipulation thriller',
      'aviation suspense',
      'disappearance mystery'
    ]
  },
  general: [
    'dark triad personality',
    'page turner',
    'female author',
    'Toronto author',
    'Canadian thriller',
    'twisty thriller',
    'unputdownable'
  ]
};

// Page-specific SEO configurations
export const seoConfig = {
  home: {
    title: 'Ruby Satana - Psychological Thriller Books | Dark Suspense Novels',
    description: 'Discover gripping psychological thrillers by Ruby Satana. Explore "The Husband Killed Her," "The Mountain Killed Her," and "The Flight Killed Her" - dark, twisty page-turners that will keep you up all night.',
    keywords: [...seoKeywords.primary, ...seoKeywords.general].join(', '),
    canonical: 'https://www.rubysatana.com/'
  },
  catalog: {
    title: 'Book Catalog - All Thriller Novels by Ruby Satana | Browse Series',
    description: 'Browse the complete collection of psychological thrillers by Ruby Satana. Find your next dark, suspenseful read with plot twists, complex characters, and gripping narratives.',
    keywords: [...seoKeywords.primary, 'book catalog', 'thriller series', 'book collection'].join(', '),
    canonical: 'https://www.rubysatana.com/catalog'
  },
  author: {
    title: 'About Ruby Satana - Toronto Thriller Author | Biography & Books',
    description: 'Meet Ruby Satana, Toronto-based psychological thriller author. Discover her background, writing journey, and the inspiration behind her dark, compelling mystery novels.',
    keywords: [...seoKeywords.primary, 'author biography', 'thriller writer', 'Canadian author', 'female thriller author'].join(', '),
    canonical: 'https://www.rubysatana.com/author'
  },
  quiz: {
    title: 'Dark Triad Quiz - Which Ruby Satana Thriller Matches Your Personality?',
    description: 'Take the Dark Triad personality quiz to discover which Ruby Satana thriller matches your personality. Are you a narcissist, psychopath, or machiavellian? Find your perfect thriller match!',
    keywords: [...seoKeywords.primary, 'personality quiz', 'dark triad', 'book recommendation', 'interactive quiz'].join(', '),
    canonical: 'https://www.rubysatana.com/quiz'
  },
  privacy: {
    title: 'Privacy Policy - Ruby Satana Thriller Books',
    description: 'Read our privacy policy to understand how we protect your data when you visit Ruby Satana\'s thriller book website.',
    keywords: 'privacy policy, data protection, user privacy',
    canonical: 'https://www.rubysatana.com/privacy'
  }
};

// Component to set SEO meta tags
interface SEOMetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: object;
}

export function SEOMetaTags({
  title = seoConfig.home.title,
  description = seoConfig.home.description,
  keywords = seoConfig.home.keywords,
  canonical = seoConfig.home.canonical,
  ogImage,
  noindex = false,
  structuredData
}: SEOMetaTagsProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, type: 'name' | 'property' = 'name') => {
      const attribute = type === 'property' ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic SEO meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    
    // Open Graph tags
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:url', canonical, 'property');
    if (ogImage) {
      setMetaTag('og:image', ogImage, 'property');
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    if (ogImage) {
      setMetaTag('twitter:image', ogImage);
    }

    // Additional SEO tags
    setMetaTag('author', 'Ruby Satana');
    setMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Canonical URL
    let linkElement = document.querySelector('link[rel="canonical"]');
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      document.head.appendChild(linkElement);
    }
    linkElement.setAttribute('href', canonical);

    // Structured data
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"][data-seo]');
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        scriptElement.setAttribute('data-seo', 'true');
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, canonical, ogImage, noindex, structuredData]);

  return null;
}

// Breadcrumb component for better navigation and SEO
interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Generate breadcrumb structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': `https://www.rubysatana.com${item.href}`
    }))
  };

  useEffect(() => {
    // Add breadcrumb structured data
    let scriptElement = document.querySelector('script[data-breadcrumb]');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', 'application/ld+json');
      scriptElement.setAttribute('data-breadcrumb', 'true');
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(breadcrumbSchema);

    return () => {
      // Cleanup on unmount
      const element = document.querySelector('script[data-breadcrumb]');
      if (element) {
        element.remove();
      }
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Verdana, sans-serif' }}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-gray-400" aria-hidden="true">/</span>
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-700 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a 
                href={item.href} 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// FAQ Schema for better search results
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  useEffect(() => {
    let scriptElement = document.querySelector('script[data-faq]');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', 'application/ld+json');
      scriptElement.setAttribute('data-faq', 'true');
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(faqSchema);

    return () => {
      const element = document.querySelector('script[data-faq]');
      if (element) {
        element.remove();
      }
    };
  }, [items]);

  return null;
}

// Author Schema for rich results
export const authorSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'Ruby Satana',
  'alternateName': 'Ruby Satana',
  'description': 'Toronto-based psychological thriller author known for dark, twisty narratives exploring complex psychological themes.',
  'url': 'https://www.rubysatana.com/author',
  'sameAs': [
    'https://www.facebook.com/rubysatana',
    'https://www.tiktok.com/@rubysatana',
    'https://www.goodreads.com/user/show/199234395-ruby-satana'
  ],
  'jobTitle': 'Author',
  'worksFor': {
    '@type': 'Organization',
    'name': 'She Writes in Her Spare Time Productions Company'
  },
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Toronto',
    'addressRegion': 'ON',
    'addressCountry': 'CA'
  },
  'knowsAbout': [
    'Psychological Thriller Writing',
    'Mystery Fiction',
    'Suspense Novels',
    'Dark Fiction'
  ]
};

// Generate sitemap data
export const generateSitemapData = () => {
  const baseUrl = 'https://www.rubysatana.com';
  const currentDate = new Date().toISOString().split('T')[0];

  return {
    pages: [
      {
        url: `${baseUrl}/`,
        priority: 1.0,
        changefreq: 'weekly',
        lastmod: currentDate
      },
      {
        url: `${baseUrl}/catalog`,
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: currentDate
      },
      {
        url: `${baseUrl}/author`,
        priority: 0.8,
        changefreq: 'monthly',
        lastmod: currentDate
      },
      {
        url: `${baseUrl}/quiz`,
        priority: 0.7,
        changefreq: 'monthly',
        lastmod: currentDate
      },
      {
        url: `${baseUrl}/privacy`,
        priority: 0.3,
        changefreq: 'yearly',
        lastmod: currentDate
      }
    ]
  };
};

// Helper function to generate sitemap XML
export const generateSitemapXML = () => {
  const { pages } = generateSitemapData();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
};
