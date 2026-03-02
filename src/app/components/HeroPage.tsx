import { ReactNode } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
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
  return (
    <div className="w-screen h-screen relative overflow-hidden snap-start">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-8 md:px-16 max-w-7xl mx-auto py-16">
        <div className="flex flex-col items-center w-full">
          {/* Book Title with Custom Font - Full Width Centered */}
          <h1 
            className="text-white text-center mb-6"
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
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-8 w-full justify-center">
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
              <div className="flex flex-wrap gap-2 justify-center md:justify-start max-w-3xl">
                <Button
                  className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md hover:from-white/30 hover:to-white/20 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105 px-2 py-1 h-auto"
                >
                  <img src={kindleIcon} alt="Kindle" className="w-4 h-4 mr-1" />
                  <span style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem", fontWeight: 600 }}>
                    e-book (Kindle)
                  </span>
                </Button>
                <Button
                  className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md hover:from-white/30 hover:to-white/20 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105 px-2 py-1 h-auto"
                >
                  <img src={audibleIcon} alt="Audible" className="w-4 h-4 mr-1" />
                  <span style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem", fontWeight: 600 }}>
                    audiobook (Audible)
                  </span>
                </Button>
                <Button
                  className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md hover:from-white/30 hover:to-white/20 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105 px-2 py-1 h-auto"
                >
                  <img src={amazonIcon} alt="Amazon" className="w-4 h-4 mr-1" />
                  <span style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem", fontWeight: 600 }}>
                    paperback (Amazon)
                  </span>
                </Button>
              </div>
            </div>

            {/* 3D Book Mockup */}
            <div className="flex-shrink-0">
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
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Review Quote - Full Width Centered */}
          <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-6 max-w-2xl w-full">
            <div className="flex gap-1 mb-3 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote 
              className="text-white/95 text-center italic mb-3"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(0.95rem, 1.3vw, 1.125rem)",
                lineHeight: 1.5
              }}
            >
              "{review}"
            </blockquote>
            <p 
              className="text-white/70 text-center"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "0.95rem"
              }}
            >
              — {reviewer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}