import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import keyhole2 from "figma:asset/1cbbbc798a0e909331dabb9db23c714588dc1678.png";
import mountain from "figma:asset/c8b8f7421e624c882dbf52e61cc5503691685de8.png";

const books = [
  {
    id: 1,
    title: "The Husband Killed Her",
    image: keyhole2,
    description: "A suburban nightmare where the perfect marriage hides deadly secrets.",
    year: 2024,
    status: "Available Now"
  },
  {
    id: 2,
    title: "The Mountain Killed Her",
    image: mountain,
    description: "A chilling conspiracy unfolds in the remote Swiss Alps.",
    year: 2025,
    status: "Coming Soon"
  }
];

export function Catalog() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 
            className="text-white text-4xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900
            }}
          >
            Book Catalog
          </h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto">
          <p 
            className="text-white/80 text-center mb-16 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: "1.25rem",
              lineHeight: 1.6
            }}
          >
            Dive into a world of psychological thrillers where every page turns darkness into revelation.
          </p>

          {/* Book Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="group relative bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:border-white/40 transition-all hover:scale-105"
              >
                {/* Book Cover Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h2 
                      className="text-white text-3xl flex-1"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700
                      }}
                    >
                      {book.title}
                    </h2>
                    <span className="text-white/60 ml-4" style={{ fontFamily: "'Crimson Text', serif" }}>
                      {book.year}
                    </span>
                  </div>
                  
                  <p 
                    className="text-white/80 mb-4"
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      fontSize: "1.125rem",
                      lineHeight: 1.5
                    }}
                  >
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span 
                      className="px-4 py-2 bg-purple-500/30 text-purple-200 rounded-full"
                      style={{ fontFamily: "'Crimson Text', serif" }}
                    >
                      {book.status}
                    </span>
                    <Button
                      onClick={() => navigate("/")}
                      variant="outline"
                      className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
