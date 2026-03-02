import { Navigation } from "../components/Navigation";
import { HeroPage } from "../components/HeroPage";
import { Mail, ArrowUp, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import husbandCover from "figma:asset/78a836d1f4187cd9762644c9fe81447294d6e1ed.png";
import mountainCover from "figma:asset/2a74e62b093ca2053aa6ecf724b49aea0afc87a8.png";
import flightCover from "figma:asset/ab35b7179deb454b83580783bea0b637ea824084.png";

export function Home() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    
    const handleScroll = () => {
      if (scrollContainer) {
        const scrollPosition = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight;
        const clientHeight = scrollContainer.clientHeight;
        
        // Show button when scrolled past first screen
        setShowScrollTop(scrollPosition > clientHeight * 0.8);
      }
    };

    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, []);

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
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
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
      <Navigation />
      
      {/* Snap Container */}
      <div id="scroll-container" className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth" style={{ scrollSnapType: 'y mandatory', scrollSnapStop: 'always' }}>
        {/* Book 1: The Husband Killed Her */}
        <HeroPage
          backgroundImage={husbandCover}
          title="The Husband Killed Her"
          plotline="In a quiet suburban neighborhood, a woman's mysterious death unravels a web of dark secrets. As Detective Sarah Morrison digs deeper, she discovers that the perfect marriage was built on lies, betrayal, and a love turned deadly."
          review="A breathtaking thriller that keeps you guessing until the very last page. Absolutely unputdownable!"
          reviewer="The New York Times Book Review"
        />
        
        {/* Book 2: The Mountain Killed Her */}
        <HeroPage
          backgroundImage={mountainCover}
          title="The Mountain Killed Her"
          plotline="When a hiking expedition goes tragically wrong in the remote Swiss Alps, journalist Emma Clarke investigates what really happened on that fateful climb. What she uncovers is a chilling conspiracy where nature itself becomes the perfect alibi."
          review="A masterpiece of suspense set against stunning alpine beauty. This is thriller writing at its finest."
          reviewer="Publisher's Weekly"
        />
        
        {/* Book 3: The Flight Killed Her */}
        <HeroPage
          backgroundImage={flightCover}
          title="The Flight Killed Her"
          plotline="On a turbulent transatlantic flight, a young woman vanishes without a trace. FBI agent Kate Reynolds must piece together the final hours aboard Flight 447, where every passenger had a motive, and the truth is more terrifying than anyone could imagine."
          review="A high-altitude thriller that soars to dizzying heights. Nail-biting suspense from takeoff to landing."
          reviewer="Entertainment Weekly"
        />
        
        {/* Newsletter & Bundle Section */}
        <div className="w-screen h-screen snap-start flex flex-col overflow-y-auto">
          {/* Top Panel - Newsletter Subscription */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center p-8 md:p-12">
            <Mail className="w-16 h-16 text-white mb-6" strokeWidth={1.5} />
            <h2 
              className="text-white text-center mb-3"
              style={{
                fontFamily: "'Notable', sans-serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                lineHeight: 1.2
              }}
            >
              Stay Updated
            </h2>
            <p 
              className="text-white/80 text-center mb-8 px-8"
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
              >
                <input
                  type="text"
                  name="name"
                  placeholder="NAME"
                  className="flex-1 px-4 py-3 h-12 rounded-md bg-white/10 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL ADDRESS"
                  className="flex-1 px-4 py-3 h-12 rounded-md bg-white/10 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}
                />
                <Button 
                  type="submit"
                  className="px-6 h-12 bg-white text-gray-900 hover:bg-white/90 font-semibold rounded-md transition-all"
                  style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}
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
                className="underline hover:text-white/80 transition-colors"
              >
                Terms of Use
              </button>
              {" "}and{" "}
              <button
                onClick={() => navigate("/privacy")}
                className="underline hover:text-white/80 transition-colors"
              >
                Privacy Policy
              </button>
              .
            </p>
          </div>

          {/* Bottom Panel - Bundle Offer */}
          <div className="bg-gradient-to-br from-red-900 to-red-950 flex flex-col items-center justify-center p-8 md:p-16">
            <h2 
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
            <div className="relative mb-8 h-48 w-96">
              <img 
                src={husbandCover} 
                alt="The Husband Killed Her" 
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
                alt="The Mountain Killed Her" 
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
                alt="The Flight Killed Her" 
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
            <div className="text-center mb-6">
              <p className="text-white/70 line-through mb-1" style={{ fontFamily: "Verdana, sans-serif", fontSize: "1.125rem" }}>
                $44.97
              </p>
              <p className="text-white mb-2" style={{ fontFamily: "'Notable', sans-serif", fontSize: "2.5rem" }}>
                $29.99
              </p>
              <p className="text-white/80" style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}>
                Save $14.98 (30% off)
              </p>
            </div>
            
            <Button 
              className="px-8 py-4 bg-white text-red-900 hover:bg-white/90 font-bold text-lg rounded-md transition-all hover:scale-105 shadow-2xl"
              style={{ fontFamily: "Verdana, sans-serif" }}
            >
              BUY BUNDLE NOW
            </Button>
          </div>

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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-lg shadow-2xl text-center max-w-md mx-4 border border-white/20">
            <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-6" strokeWidth={1.5} />
            <h3 
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
            >
              CLOSE
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}