import { ReactNode } from "react";
import { Star, BookOpen, Headphones, CreditCard } from "lucide-react";
import { Button } from "./ui/button";

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
      <div className="relative h-full flex flex-col items-center justify-center px-8 md:px-16 max-w-5xl mx-auto">
        {/* Book Title with Custom Font */}
        <h1 
          className="text-white text-center mb-8"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            textShadow: "0 4px 20px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
            letterSpacing: "0.02em"
          }}
        >
          {title}
        </h1>
        
        {/* Plotline */}
        <p 
          className="text-white/90 text-center max-w-2xl mb-8"
          style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
            lineHeight: 1.6,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)"
          }}
        >
          {plotline}
        </p>
        
        {/* Purchase Buttons */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <Button
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg"
            size="lg"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Amazon Kindle
          </Button>
          <Button
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white border-0 shadow-lg"
            size="lg"
          >
            <Headphones className="w-4 h-4 mr-2" />
            Audible
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg"
            size="lg"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Buy with Stripe
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg"
            size="lg"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Buy with PayPal
          </Button>
        </div>
        
        {/* Review Quote */}
        <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-8 max-w-2xl">
          <div className="flex gap-1 mb-4 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote 
            className="text-white/95 text-center italic mb-4"
            style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              lineHeight: 1.5
            }}
          >
            "{review}"
          </blockquote>
          <p 
            className="text-white/70 text-center"
            style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: "1rem"
            }}
          >
            — {reviewer}
          </p>
        </div>
      </div>
    </div>
  );
}