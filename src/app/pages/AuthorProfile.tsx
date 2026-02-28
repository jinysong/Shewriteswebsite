import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Twitter, Instagram, Globe } from "lucide-react";
import { Button } from "../components/ui/button";

export function AuthorProfile() {
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
            Author Profile
          </h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Author Card */}
          <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
              {/* Author Image Placeholder */}
              <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex-shrink-0 flex items-center justify-center">
                <span 
                  className="text-white text-6xl"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900
                  }}
                >
                  A.M.
                </span>
              </div>

              {/* Author Info */}
              <div className="flex-1">
                <h2 
                  className="text-white text-5xl mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900
                  }}
                >
                  Alexandra Morgan
                </h2>
                <p 
                  className="text-purple-300 text-xl mb-6"
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    fontStyle: "italic"
                  }}
                >
                  Bestselling Thriller Author
                </p>
                
                {/* Social Links */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                  >
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                  >
                    <Globe className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4">
              <h3 
                className="text-white text-2xl mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700
                }}
              >
                About the Author
              </h3>
              <p 
                className="text-white/80"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: "1.125rem",
                  lineHeight: 1.7
                }}
              >
                Alexandra Morgan is an internationally bestselling author known for her gripping psychological thrillers that explore the darkest corners of human nature. With a background in criminal psychology, she brings authenticity and depth to every twisted tale.
              </p>
              <p 
                className="text-white/80"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: "1.125rem",
                  lineHeight: 1.7
                }}
              >
                Her debut novel became an instant sensation, praised for its intricate plotting and unforgettable characters. When she's not writing, Alexandra enjoys hiking in remote locations—often finding inspiration in the isolation and beauty of nature's most dangerous landscapes.
              </p>
              <p 
                className="text-white/80"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: "1.125rem",
                  lineHeight: 1.7
                }}
              >
                She currently resides in the Pacific Northwest, where the misty forests and dramatic coastlines fuel her imagination.
              </p>
            </div>

            {/* Awards Section */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <h3 
                className="text-white text-2xl mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700
                }}
              >
                Awards & Recognition
              </h3>
              <ul 
                className="space-y-2 text-white/80"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: "1.125rem"
                }}
              >
                <li>• New York Times Bestselling Author</li>
                <li>• Edgar Award Nominee for Best First Novel</li>
                <li>• Thriller Award Winner - Best Psychological Thriller</li>
                <li>• Goodreads Choice Award Nominee</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
