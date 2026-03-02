import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import authorImage from "figma:asset/b942373ac7016ff4a9f5994f171ec68bc28031f9.png";

export function AuthorProfile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-gray-700 hover:bg-gray-100"
            style={{ fontFamily: "Verdana, sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
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
            About the Author
          </h1>
          <div className="w-32" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Author Profile Section */}
          <div>
            {/* Author Photo - Float Left */}
            <img
              src={authorImage}
              alt="Ruby Satana"
              className="w-80 h-auto rounded-lg shadow-lg float-left mr-6 mb-4"
            />

            {/* Author Bio - Wraps around image */}
            <div className="space-y-6 text-gray-700">
              <p 
                style={{
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "1.125rem",
                  lineHeight: 1.8
                }}
              >
                Writing under the moniker Ruby Satana, this Toronto-bred author has turned "overthinking" and "daydreaming" into an art form. While her physical self resides in a small but cozy condo with two demanding feline roommates, her mind is usually miles away, navigating the improbable scenarios that serve as her favorite escape.
              </p>

              <p 
                style={{
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "1.125rem",
                  lineHeight: 1.8
                }}
              >
                For Ruby, writing isn't just a hobby; it's the compass and sword she uses to navigate the choppy waters of anxiety and the difficult bits of life. It is the creative anchor that keeps her grounded while her imagination reaches for the shore.
              </p>

              <p 
                style={{
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "1.125rem",
                  lineHeight: 1.8
                }}
              >
                Her current life goals include quitting her boring day job, relocating to a tropical beach with a coconut in hand, and convincing her two cats that she is, in fact, the one in charge. In her eyes, the best job in the world is simply to be a full-time reader, losing herself in the pages of a thousand different minds and a million lifetimes.
              </p>
            </div>
          </div>
        </div>
      </div>

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