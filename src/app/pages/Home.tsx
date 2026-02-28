import { Navigation } from "../components/Navigation";
import { HeroPage } from "../components/HeroPage";
import keyhole1 from "figma:asset/f61556f2e342fc99a727c7662d4c6a872c7b5c3e.png";
import keyhole2 from "figma:asset/1cbbbc798a0e909331dabb9db23c714588dc1678.png";
import mountain from "figma:asset/c8b8f7421e624c882dbf52e61cc5503691685de8.png";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const newPage = Math.round(scrollPosition / pageHeight);
      setCurrentPage(newPage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    const pageHeight = window.innerHeight;
    window.scrollTo({
      top: pageHeight * (currentPage + 1),
      behavior: "smooth"
    });
  };

  return (
    <div className="relative">
      <Navigation />
      
      {/* Snap Container */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {/* Book 1: The Husband Killed Her */}
        <HeroPage
          backgroundImage={keyhole2}
          title="The Husband Killed Her"
          plotline="In a quiet suburban neighborhood, a woman's mysterious death unravels a web of dark secrets. As Detective Sarah Morrison digs deeper, she discovers that the perfect marriage was built on lies, betrayal, and a love turned deadly."
          review="A breathtaking thriller that keeps you guessing until the very last page. Absolutely unputdownable!"
          reviewer="The New York Times Book Review"
        />
        
        {/* Book 2: The Mountain Killed Her */}
        <HeroPage
          backgroundImage={mountain}
          title="The Mountain Killed Her"
          plotline="When a hiking expedition goes tragically wrong in the remote Swiss Alps, journalist Emma Clarke investigates what really happened on that fateful climb. What she uncovers is a chilling conspiracy where nature itself becomes the perfect alibi."
          review="A masterpiece of suspense set against stunning alpine beauty. This is thriller writing at its finest."
          reviewer="Publisher's Weekly"
        />
      </div>

      {/* Scroll Indicator - only show on first page */}
      {currentPage === 0 && (
        <button
          onClick={scrollToNext}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce"
          aria-label="Scroll to next book"
        >
          <div className="bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all">
            <ChevronDown className="w-6 h-6 text-white" />
          </div>
        </button>
      )}
    </div>
  );
}
