import { ReactNode, useState, useEffect, useRef } from "react";
import { Star, Download } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "motion/react";
import amazonIcon from "figma:asset/6bcb8a0b30479c584e3accc9e587519bf2392a08.png";
import kindleIcon from "figma:asset/76aa1becd33846b7c9ba9b5c6ed3b60e8c4964a6.png";
import audibleIcon from "figma:asset/7744cba0999164c7f99df791d2697e0a436e871a.png";
import stripeIcon from "figma:asset/d70b63b8815f16d05a4747c28e0f5cb41e8fe80d.png";
import paypalIcon from "figma:asset/64eeb00008c3479b5e72d5bbfe2a49169d3d8425.png";

interface HeroPageProps {
  backgroundImage: string;
  title: string;
  plotline: string;
  review: string;
  reviewer: string;
}

export function HeroPage({ backgroundImage, title, plotline, review, reviewer }: HeroPageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress for this section
      // 0 when section enters viewport from bottom, 1 when it exits from top
      const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
      setScrollProgress(progress);
    };

    const scrollContainer = document.getElementById("scroll-container");
    scrollContainer?.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate parallax transforms
  const backgroundY = scrollProgress * 50; // Move background slower (50px max)
  const backgroundScale = 1 + scrollProgress * 0.1; // Slight zoom effect

  const handleDownloadSample = () => {
    // Create a mock PDF download
    // In production, this would link to actual PDF files
    const bookSlug = title.toLowerCase().replace(/\s+/g, '-');
    const filename = `${bookSlug}-chapter-1.pdf`;
    
    // Create a mock download by creating a blob with sample text
    const sampleContent = `
${title}
Chapter 1 - Sample

${plotline}

This is a sample chapter. In a production environment, this would be the actual first chapter of the book.

Thank you for your interest in "${title}"!

To read the complete story, purchase the full book on Amazon, Kindle, or Audible.
`;
    
    const blob = new Blob([sampleContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="w-screen h-screen relative overflow-hidden snap-start" aria-label={`Book details for ${title}`} ref={sectionRef}>
      {/* Background Image */}
      <div 
        className="absolute bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(-${backgroundY}px) scale(${backgroundScale})`,
          top: '-10%',
          left: '-5%',
          right: '-5%',
          bottom: '-10%'
        }}
        role="img"
        aria-label={`${title} book cover background`}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-8 md:px-16 max-w-7xl mx-auto py-20 md:py-28">
        <div className="flex flex-col items-center w-full">
          {/* Author Attribution */}
          <div 
            className="text-white/80 text-center mb-2"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              fontStyle: "italic",
              letterSpacing: "0.03em",
              textShadow: "0 2px 10px rgba(0,0,0,0.7)"
            }}
          >
            Ruby J. Satana's
          </div>

          {/* Book Title with Custom Font - Full Width Centered */}
          <h1 
            className="text-white text-center mb-8"
            style={{
              fontFamily: "'Notable', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              textShadow: "0 4px 20px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
              letterSpacing: "0.02em"
            }}
          >
            {title}
          </h1>

          {/* Middle Section: Book Mockup + Plotline & Buttons */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-10 w-full justify-center">
            {/* Plotline & Purchase Buttons */}
            <div className="flex flex-col items-center md:items-start">
              {/* Plotline */}
              <p 
                className="text-white/90 text-center md:text-left max-w-2xl mb-6"
                style={{
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  lineHeight: 1.5,
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)"
                }}
              >
                {plotline}
              </p>
              
              {/* Purchase Buttons */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start max-w-3xl" role="group" aria-label="Purchase options">
                <Button
                  onClick={() => window.open('https://www.amazon.com/kindle', '_blank', 'noopener,noreferrer')}
                  className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md hover:from-white/30 hover:to-white/20 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105 px-2 py-1 h-auto"
                  aria-label={`Purchase ${title} e-book on Kindle`}
                >
                  <img src={kindleIcon} alt="" className="w-4 h-4 mr-1" aria-hidden="true" />
                  <span style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem", fontWeight: 600 }}>
                    e-book (Kindle)
                  </span>
                </Button>
                <Button
                  onClick={() => window.open('https://www.audible.com', '_blank', 'noopener,noreferrer')}
                  className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md hover:from-white/30 hover:to-white/20 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105 px-2 py-1 h-auto"
                  aria-label={`Purchase ${title} audiobook on Audible`}
                >
                  <img src={audibleIcon} alt="" className="w-4 h-4 mr-1" aria-hidden="true" />
                  <span style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem", fontWeight: 600 }}>
                    audiobook (Audible)
                  </span>
                </Button>
                <Button
                  onClick={() => window.open('https://www.amazon.com', '_blank', 'noopener,noreferrer')}
                  className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md hover:from-white/30 hover:to-white/20 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105 px-2 py-1 h-auto"
                  aria-label={`Purchase ${title} paperback on Amazon`}
                >
                  <img src={amazonIcon} alt="" className="w-4 h-4 mr-1" aria-hidden="true" />
                  <span style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem", fontWeight: 600 }}>
                    paperback (Amazon)
                  </span>
                </Button>
              </div>
            </div>

            {/* 3D Book Mockup with Sample Chapter Button */}
            <div className="flex flex-col items-center gap-4">
              <motion.div 
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  opacity: { duration: 0.6 }
                }}
                aria-label={`3D mockup of ${title}`}
              >
                <div 
                  className="relative"
                  style={{
                    width: '140px',
                    height: '200px',
                    perspective: '1000px'
                  }}
                >
                  {/* Book */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      transform: 'rotateY(-25deg) rotateX(5deg)',
                      boxShadow: '20px 20px 60px rgba(0, 0, 0, 0.8), -5px 5px 20px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {/* Front Cover */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '3px',
                        boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.3)'
                      }}
                      role="img"
                      aria-label={`${title} book cover`}
                    />
                    
                    {/* Spine */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '30px',
                        height: '100%',
                        background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))',
                        transformOrigin: 'left',
                        transform: 'rotateY(-90deg)',
                        left: '0'
                      }}
                      aria-hidden="true"
                    />
                    
                    {/* Pages Effect */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to left, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
                        transformOrigin: 'left',
                        transform: 'translateZ(-15px)',
                        borderRadius: '0 3px 3px 0',
                        boxShadow: 'inset -5px 0 10px rgba(0, 0, 0, 0.2)'
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Sample Chapter Button */}
              <Button
                onClick={handleDownloadSample}
                className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md hover:from-white/30 hover:to-white/20 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105 px-2.5 py-1.5 h-auto"
                aria-label={`Download sample chapter of ${title}`}
              >
                <Download className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
                <span style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.8125rem", fontWeight: 600 }}>
                  Read Sample
                </span>
              </Button>
            </div>
          </div>
          
          {/* Review Quote - Full Width Centered */}
          <figure className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-6 max-w-2xl w-full" aria-label="Book review">
            <div className="flex gap-1 mb-3 justify-center" role="img" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              ))}
            </div>
            <blockquote 
              className="text-white text-center italic mb-3"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(0.95rem, 1.3vw, 1.125rem)",
                lineHeight: 1.5
              }}
            >
              "{review}"
            </blockquote>
            <figcaption 
              className="text-white/90 text-center"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "0.95rem"
              }}
            >
              — {reviewer}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}