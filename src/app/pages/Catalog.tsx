import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { SocialMetaTags, catalogPageMeta } from "../components/SocialMetaTags";
import { SEOMetaTags, seoConfig, Breadcrumb } from "../utils/seo";
import { usePageTracking } from "../hooks/useAnalytics";
import { trackSearch } from "../utils/analytics";
import husbandCover from "figma:asset/78a836d1f4187cd9762644c9fe81447294d6e1ed.png";
import mountainCover from "figma:asset/2a74e62b093ca2053aa6ecf724b49aea0afc87a8.png";
import flightCover from "figma:asset/ab35b7179deb454b83580783bea0b637ea824084.png";

const books = [
  {
    id: 1,
    title: "The Husband Killed Her",
    publishDate: "January 2025",
    image: husbandCover,
    price: "$14.99",
    originalPrice: null,
    discount: null,
    rating: 5,
    ratingCount: 127,
    badge: null,
    outOfStock: false
  },
  {
    id: 2,
    title: "The Mountain Killed Her",
    publishDate: "March 2025",
    image: mountainCover,
    price: "$14.99",
    originalPrice: null,
    discount: null,
    rating: 5,
    ratingCount: 94,
    badge: "hot-red",
    outOfStock: false
  },
  {
    id: 3,
    title: "The Flight Killed Her",
    publishDate: "June 2025",
    image: flightCover,
    price: "$14.99",
    originalPrice: null,
    discount: null,
    rating: 5,
    ratingCount: 86,
    badge: "new",
    outOfStock: false
  }
];

export function Catalog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.publishDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  usePageTracking("Catalog");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <SEOMetaTags
        title={seoConfig.catalog.title}
        description={seoConfig.catalog.description}
        keywords={seoConfig.catalog.keywords}
        canonical={seoConfig.catalog.canonical}
        ogImage={husbandCover}
      />

      {/* Social Media Meta Tags */}
      <SocialMetaTags
        title={catalogPageMeta.title}
        description={catalogPageMeta.description}
        tags={catalogPageMeta.tags}
        type={catalogPageMeta.type}
        image={husbandCover}
      />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="text-gray-700 hover:bg-gray-100"
              style={{ fontFamily: "Verdana, sans-serif" }}
              aria-label="Return to home page"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Back to Home
            </Button>
            <h1 
              className="text-gray-900"
              style={{
                fontFamily: "'Notable', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                lineHeight: 1.2
              }}
            >
              Book Catalog
            </h1>
            <div className="w-32" aria-hidden="true" />
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search by title or publish date..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  trackSearch(e.target.value);
                }}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}
                aria-label="Search books by title or publish date"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-40 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Book Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5" role="list" aria-label="Book catalog">
            {filteredBooks.map((book) => (
              <article
                key={book.id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                role="listitem"
                aria-label={`${book.title}, published ${book.publishDate}, ${book.rating} stars, ${book.price}`}
              >
                {/* Book Cover Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Hot Badge */}
                  {book.badge === "hot-red" && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded">
                        Hot
                      </span>
                    </div>
                  )}
                  
                  {/* New Badge */}
                  {book.badge === "new" && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded">
                        New
                      </span>
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {book.discount && (
                    <div className="absolute top-3 left-3 mt-10">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {book.discount}
                      </span>
                    </div>
                  )}
                  
                  {/* Out of Stock Overlay */}
                  {book.outOfStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-lg" style={{ fontFamily: "Verdana, sans-serif" }}>
                        Out Of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="p-3">
                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5 mb-2" role="img" aria-label={`${book.rating} out of 5 stars, ${book.ratingCount} reviews`}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < book.rating ? 'fill-orange-400 text-orange-400' : 'fill-gray-200 text-gray-200'
                        }`}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-700 ml-1" style={{ fontFamily: "Verdana, sans-serif" }} aria-hidden="true">
                      ({book.ratingCount})
                    </span>
                  </div>
                  
                  {/* Publish Date */}
                  <p className="text-xs text-gray-700 mb-2" style={{ fontFamily: "Verdana, sans-serif" }}>
                    Published : {book.publishDate}
                  </p>
                  
                  {/* Title */}
                  <h3 
                    className="text-sm font-semibold text-gray-900 mb-2 min-h-[2.5rem] line-clamp-2"
                    style={{
                      fontFamily: "'Notable', sans-serif",
                      lineHeight: 1.3
                    }}
                  >
                    {book.title}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    {book.originalPrice && (
                      <span className="text-gray-400 text-xs line-through" style={{ fontFamily: "Verdana, sans-serif" }}>
                        {book.originalPrice}
                      </span>
                    )}
                    <span className="text-orange-500 font-bold text-lg" style={{ fontFamily: "Verdana, sans-serif" }}>
                      {book.price}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg" style={{ fontFamily: "Verdana, sans-serif" }}>
                No books found matching your search.
              </p>
            </div>
          )}

          {/* Coming Soon Message */}
          {filteredBooks.length > 0 && (
            <div className="text-center py-12 mt-8">
              <p 
                className="text-gray-600 text-lg mb-2"
                style={{ fontFamily: "Verdana, sans-serif" }}
              >
                More books coming soon—check back often!
              </p>
              <p 
                className="text-gray-500"
                style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.95rem" }}
              >
                Subscribe to our newsletter to stay updated on new releases.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-600 py-6 px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem" }}>
            Copyright © 2026, Ruby Satana | She Writes in Her Spare Time Productions Company
          </p>
          <button
            onClick={() => navigate("/privacy")}
            className="text-gray-600 hover:text-gray-900 transition-colors underline"
            style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem" }}
          >
            Privacy Policy
          </button>
        </div>
      </footer>
    </div>
  );
}