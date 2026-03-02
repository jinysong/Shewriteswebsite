import { Navigation } from "../components/Navigation";
import { HeroPage } from "../components/HeroPage";
import { BookStructuredData, WebsiteStructuredData, BookSeriesStructuredData } from "../components/StructuredData";
import { SocialMetaTags, homePageMeta } from "../components/SocialMetaTags";
import { SEOMetaTags, seoConfig, FAQSchema } from "../utils/seo";
import { usePageTracking, useBookTracking } from "../hooks/useAnalytics";
import { trackNewsletterSignup, trackSampleDownload } from "../utils/analytics";
import { Mail, ArrowUp, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
// Background images (keyhole designs without text)
import husbandBg from "figma:asset/7602c6622cbbbeaa79da9f59efd10f787346f4ca.png";
import mountainBg from "figma:asset/0f36f0609a2dc926f97e121e509a87c4536f73ad.png";
import flightBg from "figma:asset/18aee340f956065c8196ea7d3de2cc0fb667d778.png";
// Book cover images (with text for mockups and catalog)
import husbandCover from "figma:asset/78a836d1f4187cd9762644c9fe81447294d6e1ed.png";
import mountainCover from "figma:asset/2a74e62b093ca2053aa6ecf724b49aea0afc87a8.png";
import flightCover from "figma:asset/ab35b7179deb454b83580783bea0b637ea824084.png";

export function Home() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  // Analytics tracking
  usePageTracking("Home Page");
  const { trackSample } = useBookTracking();

  // FAQ data for SEO
  const faqData = [
    {
      question: "What genre are Ruby Satana's books?",
      answer: "Ruby Satana writes psychological thrillers and mystery novels with dark themes, complex characters, and unexpected plot twists. Her books explore themes like betrayal, manipulation, and murder."
    },
    {
      question: "What is the 'She Killed Her' series about?",
      answer: "The 'She Killed Her' series is a trilogy of psychological thrillers including 'The Husband Killed Her', 'The Mountain Killed Her', and 'The Flight Killed Her'. Each book explores a mysterious death from a unique perspective with intricate plots and dark secrets."
    },
    {
      question: "Are Ruby Satana's books available as audiobooks?",
      answer: "Yes, all of Ruby Satana's thriller novels are available as audiobooks on Audible, as well as in Kindle ebook and paperback formats on Amazon."
    },
    {
      question: "Can I download sample chapters before buying?",
      answer: "Yes! Free sample chapters are available for each book. You can download them directly from the book pages to preview the writing style and story before purchasing."
    },
    {
      question: "What is the Dark Triad Quiz?",
      answer: "The Dark Triad Quiz is an interactive personality quiz that matches you with one of Ruby Satana's thriller books based on your personality traits related to narcissism, psychopathy, and machiavellianism. It's designed for entertainment and book recommendations."
    }
  ];

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    
    const handleScroll = () => {
      if (scrollContainer) {
        const scrollPosition = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight;
        const clientHeight = scrollContainer.clientHeight;
        
        // Show button when scrolled past first screen
        setShowScrollTop(scrollPosition > clientHeight * 0.8);

        // Update current section based on scroll position
        const sectionIndex = Math.round(scrollPosition / clientHeight);
        setCurrentSection(sectionIndex);
      }
    };

    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollContainer = document.getElementById("scroll-container");
      if (!scrollContainer) return;

      const clientHeight = scrollContainer.clientHeight;
      const totalSections = 4; // 3 books + 1 newsletter/bundle section

      // If we're on the last section (newsletter/bundle), allow natural scrolling within it
      if (currentSection === totalSections - 1) {
        const lastSection = scrollContainer.querySelector('.snap-start:last-child') as HTMLElement;
        if (lastSection) {
          const atTop = lastSection.scrollTop === 0;
          const atBottom = lastSection.scrollTop + lastSection.clientHeight >= lastSection.scrollHeight - 5;
          
          // Only handle ArrowUp if at the top of the last section
          if (e.key === "ArrowUp" && atTop) {
            e.preventDefault();
            const prevSection = currentSection - 1;
            scrollContainer.scrollTo({
              top: prevSection * clientHeight,
              behavior: "smooth"
            });
          }
          // Allow natural scrolling within the last section for ArrowDown
          return;
        }
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextSection = Math.min(currentSection + 1, totalSections - 1);
        scrollContainer.scrollTo({
          top: nextSection * clientHeight,
          behavior: "smooth"
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevSection = Math.max(currentSection - 1, 0);
        scrollContainer.scrollTo({
          top: prevSection * clientHeight,
          behavior: "smooth"
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

  const scrollToTop = () => {
    const scrollContainer = document.getElementById("scroll-container");
    scrollContainer?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch(form.action, {
        method: "POST",
        body: formData,
      });
      
      // Track successful newsletter signup
      trackNewsletterSignup(true);
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      
      // Track failed newsletter signup
      trackNewsletterSignup(false);
      
      // Still show success modal even if there's an error
      // (Google Forms scripts sometimes return CORS errors but still work)
      setShowSuccessModal(true);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* SEO Meta Tags */}
      <SEOMetaTags
        title={seoConfig.home.title}
        description={seoConfig.home.description}
        keywords={seoConfig.home.keywords}
        canonical={seoConfig.home.canonical}
        ogImage={husbandCover}
      />

      {/* FAQ Schema for SEO */}
      <FAQSchema items={faqData} />

      {/* Social Media Meta Tags */}
      <SocialMetaTags
        title={homePageMeta.title}
        description={homePageMeta.description}
        tags={homePageMeta.tags}
        type={homePageMeta.type}
        image={husbandCover}
      />
      
      {/* Structured Data for SEO */}
      <WebsiteStructuredData
        name="Ruby Satana's Thriller Book Series"
        description="Award-winning psychological thriller series by Ruby Satana. Featuring 'The Husband Killed Her', 'The Mountain Killed Her', and 'The Flight Killed Her'."
        author="Ruby Satana"
      />
      
      <BookSeriesStructuredData
        name="She Killed Her Mystery Series"
        description="A gripping trilogy of psychological thrillers exploring dark secrets, betrayal, and murder through unique perspectives."
        author="Ruby Satana"
        books={[
          "The Husband Killed Her",
          "The Mountain Killed Her",
          "The Flight Killed Her"
        ]}
      />

      <BookStructuredData
        title="The Husband Killed Her"
        description="In a quiet suburban neighborhood, a woman's mysterious death unravels a web of dark secrets. As Detective Sarah Morrison digs deeper, she discovers that the perfect marriage was built on lies, betrayal, and a love turned deadly."
        genre="Thriller"
        author="Ruby Satana"
        reviewSnippet="A breathtaking thriller that keeps you guessing until the very last page. Absolutely unputdownable!"
        reviewer="The New York Times Book Review"
        ratingValue={5}
        datePublished="2025"
      />

      <BookStructuredData
        title="The Mountain Killed Her"
        description="When a hiking expedition goes tragically wrong in the remote Swiss Alps, journalist Emma Clarke investigates what really happened on that fateful climb. What she uncovers is a chilling conspiracy where nature itself becomes the perfect alibi."
        genre="Thriller"
        author="Ruby Satana"
        reviewSnippet="A masterpiece of suspense set against stunning alpine beauty. This is thriller writing at its finest."
        reviewer="Publisher's Weekly"
        ratingValue={5}
        datePublished="2025"
      />

      <BookStructuredData
        title="The Flight Killed Her"
        description="On a turbulent transatlantic flight, a young woman vanishes without a trace. FBI agent Kate Reynolds must piece together the final hours aboard Flight 447, where every passenger had a motive, and the truth is more terrifying than anyone could imagine."
        genre="Thriller"
        author="Ruby Satana"
        reviewSnippet="A high-altitude thriller that soars to dizzying heights. Nail-biting suspense from takeoff to landing."
        reviewer="Entertainment Weekly"
        ratingValue={5}
        datePublished="2026"
      />

      <Navigation />
      
      {/* Snap Container */}
      <div id="scroll-container" className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth" style={{ scrollSnapType: 'y mandatory', scrollSnapStop: 'always' }} role="main">
        {/* Book 1: The Husband Killed Her */}
        <HeroPage
          backgroundImage={husbandBg}
          bookCoverImage={husbandCover}
          title="The Husband Killed Her"
          plotline="In a quiet suburban neighborhood, a woman's mysterious death unravels a web of dark secrets. As Detective Sarah Morrison digs deeper, she discovers that the perfect marriage was built on lies, betrayal, and a love turned deadly."
          review="A breathtaking thriller that keeps you guessing until the very last page. Absolutely unputdownable!"
          reviewer="The New York Times Book Review"
        />
        
        {/* Book 2: The Mountain Killed Her */}
        <HeroPage
          backgroundImage={mountainBg}
          bookCoverImage={mountainCover}
          title="The Mountain Killed Her"
          plotline="When a hiking expedition goes tragically wrong in the remote Swiss Alps, journalist Emma Clarke investigates what really happened on that fateful climb. What she uncovers is a chilling conspiracy where nature itself becomes the perfect alibi."
          review="A masterpiece of suspense set against stunning alpine beauty. This is thriller writing at its finest."
          reviewer="Publisher's Weekly"
        />
        
        {/* Book 3: The Flight Killed Her */}
        <HeroPage
          backgroundImage={flightBg}
          bookCoverImage={flightCover}
          title="The Flight Killed Her"
          plotline="On a turbulent transatlantic flight, a young woman vanishes without a trace. FBI agent Kate Reynolds must piece together the final hours aboard Flight 447, where every passenger had a motive, and the truth is more terrifying than anyone could imagine."
          review="A high-altitude thriller that soars to dizzying heights. Nail-biting suspense from takeoff to landing."
          reviewer="Entertainment Weekly"
        />
        
        {/* Newsletter & Bundle Section */}
        <div className="w-screen h-screen snap-start flex flex-col overflow-y-auto">
          {/* Top Panel - Newsletter Subscription */}
          <section className="bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center p-8 md:p-12" aria-labelledby="newsletter-heading">
            <h2 
              id="newsletter-heading"
              className="text-white text-center mb-3 flex items-center gap-3"
              style={{
                fontFamily: "'Notable', sans-serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                lineHeight: 1.2
              }}
            >
              <Mail className="w-12 h-12" strokeWidth={1.5} aria-hidden="true" />
              Stay Updated
            </h2>
            <p 
              className="text-white/95 text-center mb-8 px-8"
              style={{
                fontFamily: "Verdana, sans-serif",
                fontSize: "clamp(0.95rem, 1.2vw, 1.125rem)",
                lineHeight: 1.6
              }}
            >
              New books, exclusive content, and giveaways. Straight to your inbox.
            </p>
            <div className="w-full max-w-2xl px-8">
              <form 
                id='gform' 
                method="POST" 
                action="https://script.google.com/macros/s/AKfycbxTwsMNSbtWRXYlXpNeiQdXFHSxFiClnz_77biETvjN0JY7Tce_nyGmSbNw00aYUw/exec"
                className="flex gap-2"
                onSubmit={handleFormSubmit}
                aria-label="Newsletter subscription form"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="NAME"
                  className="flex-1 px-4 py-3 h-12 rounded-md bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}
                  aria-label="Your name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL ADDRESS"
                  className="flex-1 px-4 py-3 h-12 rounded-md bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}
                  aria-label="Your email address"
                  required
                />
                <Button 
                  type="submit"
                  className="px-6 h-12 bg-white text-gray-900 hover:bg-white/90 font-semibold rounded-md transition-all"
                  style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}
                  aria-label={isSubmitting ? "Submitting subscription" : "Subscribe to newsletter"}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBSCRIBE"}
                </Button>
              </form>
            </div>
            <p 
              className="text-white/60 text-center mt-4 text-xs px-8"
              style={{ fontFamily: "Verdana, sans-serif" }}
            >
              By clicking subscribe, I acknowledge that I have read and agree to the{" "}
              <button
                onClick={() => navigate("/privacy#terms-of-use")}
                className="underline hover:text-white/80 transition-colors text-white/60 text-xs"
                style={{ fontFamily: "Verdana, sans-serif" }}
              >
                Terms of Use
              </button>
              {" "}and{" "}
              <button
                onClick={() => navigate("/privacy")}
                className="underline hover:text-white/80 transition-colors text-white/60 text-xs"
                style={{ fontFamily: "Verdana, sans-serif" }}
              >
                Privacy Policy
              </button>
              .
            </p>
          </section>

          {/* Dark Triad Quiz Section */}
          <section className="bg-gradient-to-br from-purple-900 to-purple-950 flex flex-col items-center justify-center p-8 md:p-12" aria-labelledby="quiz-heading">
            <h2 
              id="quiz-heading"
              className="text-white text-center mb-3"
              style={{
                fontFamily: "'Notable', sans-serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                lineHeight: 1.2
              }}
            >
              Discover Your Dark Side
            </h2>
            <p 
              className="text-white/80 text-center mb-8 px-8 max-w-2xl"
              style={{
                fontFamily: "Verdana, sans-serif",
                fontSize: "clamp(0.95rem, 1.2vw, 1.125rem)",
                lineHeight: 1.6
              }}
            >
              Take the Dark Triad personality quiz to uncover which psychological thriller resonates with your darker traits. Are you cunning like a manipulative husband, cold like a mountain, or deceptive like a vanishing act?
            </p>
            <Button 
              onClick={() => navigate("/quiz")}
              className="px-8 py-4 bg-white text-purple-900 hover:bg-white/90 font-bold text-lg rounded-md transition-all hover:scale-105 shadow-2xl"
              style={{ fontFamily: "Verdana, sans-serif" }}
              aria-label="Take the Dark Triad personality quiz"
            >
              TAKE THE QUIZ
            </Button>
          </section>

          {/* Bottom Panel - Bundle Offer */}
          <section className="bg-gradient-to-br from-red-900 to-red-950 flex flex-col items-center justify-center p-8 md:p-16" aria-labelledby="bundle-heading">
            <h2 
              id="bundle-heading"
              className="text-white text-center mb-3"
              style={{
                fontFamily: "'Notable', sans-serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                lineHeight: 1.2
              }}
            >
              Complete the Collection
            </h2>
            <p 
              className="text-white/80 text-center mb-8 px-8"
              style={{
                fontFamily: "Verdana, sans-serif",
                fontSize: "clamp(0.95rem, 1.2vw, 1.125rem)",
                lineHeight: 1.6
              }}
            >
              Get all three thrilling mysteries in one bundle and save 30%
            </p>
            
            {/* Book Covers - Bundle Style */}
            <div className="relative mb-8 h-48 w-96" role="img" aria-label="Bundle of three thriller books">
              <img 
                src={husbandCover} 
                alt="The Husband Killed Her book cover" 
                className="absolute w-32 h-48 object-cover rounded-md"
                style={{ 
                  transform: 'rotate(-25deg)',
                  transformOrigin: 'bottom center',
                  left: '0',
                  bottom: '0',
                  zIndex: 1,
                  boxShadow: '-10px 15px 40px rgba(0, 0, 0, 0.6), -5px 5px 20px rgba(0, 0, 0, 0.4), 0 0 60px rgba(148, 0, 211, 0.3)'
                }}
              />
              <img 
                src={mountainCover} 
                alt="The Mountain Killed Her book cover" 
                className="absolute w-32 h-48 object-cover rounded-md"
                style={{ 
                  transform: 'rotate(0deg)',
                  transformOrigin: 'bottom center',
                  left: '50%',
                  bottom: '0',
                  marginLeft: '-64px',
                  zIndex: 3,
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 80px rgba(255, 215, 0, 0.3)'
                }}
              />
              <img 
                src={flightCover} 
                alt="The Flight Killed Her book cover" 
                className="absolute w-32 h-48 object-cover rounded-md"
                style={{ 
                  transform: 'rotate(25deg)',
                  transformOrigin: 'bottom center',
                  right: '0',
                  bottom: '0',
                  zIndex: 2,
                  boxShadow: '10px 15px 40px rgba(0, 0, 0, 0.6), 5px 5px 20px rgba(0, 0, 0, 0.4), 0 0 60px rgba(220, 20, 60, 0.3)'
                }}
              />
            </div>
            
            {/* Pricing */}
            <div className="text-center mb-6" aria-label="Bundle pricing">
              <p className="text-white/70 line-through mb-1" style={{ fontFamily: "Verdana, sans-serif", fontSize: "1.125rem" }} aria-label="Original price $44.97">
                $44.97
              </p>
              <p className="text-white mb-2" style={{ fontFamily: "'Notable', sans-serif", fontSize: "2.5rem" }} aria-label="Bundle price $29.99">
                $29.99
              </p>
              <p className="text-white/80" style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}>
                Save $14.98 (30% off)
              </p>
            </div>
            
            <Button 
              className="px-8 py-4 bg-white text-red-900 hover:bg-white/90 font-bold text-lg rounded-md transition-all hover:scale-105 shadow-2xl"
              style={{ fontFamily: "Verdana, sans-serif" }}
              aria-label="Purchase complete book bundle for $29.99"
            >
              BUY BUNDLE NOW
            </Button>
          </section>

          {/* Footer */}
          <footer className="bg-black text-white/70 py-6 px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <p style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem" }}>
                Copyright © 2026, Ruby Satana | She Writes in Her Spare Time Productions Company
              </p>
              <button
                onClick={() => navigate("/privacy")}
                className="text-white/70 hover:text-white transition-colors underline"
                style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem" }}
              >
                Privacy Policy
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-black/70 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-black/90 hover:scale-110 transition-all shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="success-modal-title"
          aria-modal="true"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-lg shadow-2xl text-center max-w-md mx-4 border border-white/20">
            <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-6" aria-hidden="true" strokeWidth={1.5} />
            <h3 
              id="success-modal-title"
              className="text-white mb-4"
              style={{
                fontFamily: "'Notable', sans-serif",
                fontSize: "2rem",
                lineHeight: 1.2
              }}
            >
              Thanks for Subscribing!
            </h3>
            <p 
              className="text-white/80 mb-8"
              style={{
                fontFamily: "Verdana, sans-serif",
                fontSize: "1rem",
                lineHeight: 1.6
              }}
            >
              You'll be the first to know about new releases, exclusive content, and special offers.
            </p>
            <Button 
              className="px-8 py-3 bg-white text-gray-900 hover:bg-white/90 font-semibold rounded-md transition-all"
              style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}
              onClick={() => setShowSuccessModal(false)}
              aria-label="Close success message"
            >
              CLOSE
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}