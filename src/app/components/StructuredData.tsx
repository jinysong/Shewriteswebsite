import { useEffect } from 'react';

interface BookStructuredDataProps {
  title: string;
  description: string;
  genre: string;
  author: string;
  reviewSnippet: string;
  reviewer: string;
  ratingValue: number;
  isbn?: string;
  publisher?: string;
  datePublished?: string;
  imageUrl?: string;
}

export function BookStructuredData({
  title,
  description,
  genre,
  author,
  reviewSnippet,
  reviewer,
  ratingValue,
  isbn,
  publisher = "She Writes in Her Spare Time Productions Company",
  datePublished,
  imageUrl
}: BookStructuredDataProps) {
  useEffect(() => {
    const scriptId = `structured-data-${title.replace(/\s+/g, '-').toLowerCase()}`;
    
    // Remove existing script if it exists
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Book",
      "name": title,
      "author": {
        "@type": "Person",
        "name": author
      },
      "description": description,
      "genre": genre,
      "publisher": {
        "@type": "Organization",
        "name": publisher
      },
      ...(datePublished && { "datePublished": datePublished }),
      ...(isbn && { "isbn": isbn }),
      ...(imageUrl && { "image": imageUrl }),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ratingValue,
        "bestRating": "5",
        "reviewCount": "1"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": ratingValue,
          "bestRating": "5"
        },
        "author": {
          "@type": "Organization",
          "name": reviewer
        },
        "reviewBody": reviewSnippet
      },
      "offers": {
        "@type": "AggregateOffer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "USD",
        "lowPrice": "9.99",
        "highPrice": "19.99",
        "offerCount": "3"
      }
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, genre, author, reviewSnippet, reviewer, ratingValue, isbn, publisher, datePublished, imageUrl]);

  return null;
}

interface WebsiteStructuredDataProps {
  name: string;
  description: string;
  author: string;
  url?: string;
}

export function WebsiteStructuredData({
  name,
  description,
  author,
  url = window.location.origin
}: WebsiteStructuredDataProps) {
  useEffect(() => {
    const scriptId = 'structured-data-website';
    
    // Remove existing script if it exists
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": name,
      "description": description,
      "author": {
        "@type": "Person",
        "name": author
      },
      "url": url,
      "publisher": {
        "@type": "Organization",
        "name": "She Writes in Her Spare Time Productions Company"
      }
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, description, author, url]);

  return null;
}

interface BookSeriesStructuredDataProps {
  name: string;
  description: string;
  author: string;
  books: string[];
}

export function BookSeriesStructuredData({
  name,
  description,
  author,
  books
}: BookSeriesStructuredDataProps) {
  useEffect(() => {
    const scriptId = 'structured-data-book-series';
    
    // Remove existing script if it exists
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BookSeries",
      "name": name,
      "description": description,
      "author": {
        "@type": "Person",
        "name": author
      },
      "hasPart": books.map(bookTitle => ({
        "@type": "Book",
        "name": bookTitle
      }))
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, description, author, books]);

  return null;
}
