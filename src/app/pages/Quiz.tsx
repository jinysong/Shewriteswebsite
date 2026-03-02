import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Check, Facebook, Linkedin, Twitter, Share2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { SocialMetaTags, quizPageMeta } from "../components/SocialMetaTags";
import { SEOMetaTags, seoConfig } from "../utils/seo";
import { usePageTracking } from "../hooks/useAnalytics";
import { trackQuizStart, trackQuizComplete, trackQuizAnswer, trackSocialShare } from "../utils/analytics";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import husbandCover from "figma:asset/78a836d1f4187cd9762644c9fe81447294d6e1ed.png";
import mountainCover from "figma:asset/2a74e62b093ca2053aa6ecf724b49aea0afc87a8.png";
import flightCover from "figma:asset/ab35b7179deb454b83580783bea0b637ea824084.png";

type Answer = {
  text: string;
  trait: "narcissism" | "psychopathy" | "machiavellianism";
};

type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

const questions: Question[] = [
  {
    id: 1,
    question: "When facing a difficult situation, you tend to:",
    answers: [
      { text: "Trust my instincts and act decisively, even if it means bending the rules", trait: "psychopathy" },
      { text: "Carefully plan every detail and manipulate circumstances to my advantage", trait: "machiavellianism" },
      { text: "Assert my superiority and expect others to follow my lead", trait: "narcissism" }
    ]
  },
  {
    id: 2,
    question: "Your ideal vacation would involve:",
    answers: [
      { text: "An isolated retreat where I can disconnect from everyone", trait: "psychopathy" },
      { text: "A luxurious destination where I can be admired and envied", trait: "narcissism" },
      { text: "A strategic networking opportunity disguised as leisure", trait: "machiavellianism" }
    ]
  },
  {
    id: 3,
    question: "When someone betrays your trust, you:",
    answers: [
      { text: "Feel wounded and need everyone to know how I've been wronged", trait: "narcissism" },
      { text: "Cut them off completely without explanation or emotion", trait: "psychopathy" },
      { text: "Plan a calculated response that ensures they regret it", trait: "machiavellianism" }
    ]
  },
  {
    id: 4,
    question: "In social situations, you're most likely to:",
    answers: [
      { text: "Dominate conversations and ensure I'm the center of attention", trait: "narcissism" },
      { text: "Observe quietly while assessing who might be useful to me", trait: "machiavellianism" },
      { text: "Feel detached and find most people boring or predictable", trait: "psychopathy" }
    ]
  },
  {
    id: 5,
    question: "Your biggest fear is:",
    answers: [
      { text: "Being exposed as ordinary or unremarkable", trait: "narcissism" },
      { text: "Losing control of a situation I've carefully orchestrated", trait: "machiavellianism" },
      { text: "Nothing really scares me—I'm comfortable with risk", trait: "psychopathy" }
    ]
  },
  {
    id: 6,
    question: "When you achieve success, you attribute it to:",
    answers: [
      { text: "My natural talent and superiority over others", trait: "narcissism" },
      { text: "My strategic thinking and ability to outmaneuver competition", trait: "machiavellianism" },
      { text: "Taking chances others were too afraid to take", trait: "psychopathy" }
    ]
  },
  {
    id: 7,
    question: "Your approach to relationships is:",
    answers: [
      { text: "Transactional—everyone serves a purpose", trait: "machiavellianism" },
      { text: "Shallow—I lose interest once the thrill fades", trait: "psychopathy" },
      { text: "Centered around me—I need constant validation and admiration", trait: "narcissism" }
    ]
  }
];

const results = {
  narcissism: {
    book: "The Husband Killed Her",
    cover: husbandCover,
    title: "The Narcissist",
    description: "You crave admiration and believe you're special. Like the cunning husband in this thriller, you understand the power of charm and the art of creating a perfect facade. Your need for validation and control makes this psychological mystery resonate deeply with you.",
    buyLinks: {
      kindle: "https://www.amazon.com/kindle",
      audible: "https://www.audible.com",
      amazon: "https://www.amazon.com"
    }
  },
  psychopathy: {
    book: "The Mountain Killed Her",
    cover: mountainCover,
    title: "The Psychopath",
    description: "You're calculating and emotionally detached, thriving in isolation. Like the cold, unforgiving mountain in this story, you operate with chilling precision and lack remorse. This thriller explores the dark psychology that mirrors your fearless approach to life.",
    buyLinks: {
      kindle: "https://www.amazon.com/kindle",
      audible: "https://www.audible.com",
      amazon: "https://www.amazon.com"
    }
  },
  machiavellianism: {
    book: "The Flight Killed Her",
    cover: flightCover,
    title: "The Machiavellian",
    description: "You're the master strategist who plans every move. Like the mysterious disappearance on Flight 447, you understand that the perfect crime requires meticulous planning and manipulation. This thriller will satisfy your appetite for complex plots and calculated deception.",
    buyLinks: {
      kindle: "https://www.amazon.com/kindle",
      audible: "https://www.audible.com",
      amazon: "https://www.amazon.com"
    }
  }
};

export function Quiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<keyof typeof results | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Analytics tracking
  usePageTracking("Quiz Page");

  const handleAnswer = (trait: string) => {
    const newAnswers = [...answers, trait];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const counts = newAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as keyof typeof results;
      setResult(winner);
      trackQuizComplete(winner, counts);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setShowDisclaimer(true);
    setAgreedToTerms(false);
  };

  const startQuiz = () => {
    if (agreedToTerms) {
      setShowDisclaimer(false);
      trackQuizStart();
    }
  };

  if (result) {
    const bookResult = results[result];
    
    // Calculate scores for all traits
    const counts = answers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const radarData = [
      { 
        trait: 'Narcissism', 
        value: ((counts['narcissism'] || 0) / questions.length) * 100,
        fullMark: 100
      },
      { 
        trait: 'Psychopathy', 
        value: ((counts['psychopathy'] || 0) / questions.length) * 100,
        fullMark: 100
      },
      { 
        trait: 'Machiavellianism', 
        value: ((counts['machiavellianism'] || 0) / questions.length) * 100,
        fullMark: 100
      }
    ];

    // Social sharing
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `📚 I just took the Dark Triad Quiz and \"${bookResult.book}\" is the best book that suits me! My personality match: ${bookResult.title}. What's yours? Take the quiz!`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    const handleShare = (platform: string) => {
      let url = '';
      switch(platform) {
        case 'facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
          break;
        case 'twitter':
          url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
          break;
        case 'linkedin':
          url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
          break;
        case 'whatsapp':
          url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
          break;
      }
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
        trackSocialShare(platform);
      }
    };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex flex-col">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-gray-200"
              style={{ fontFamily: "Verdana, sans-serif" }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 
              className="text-white"
              style={{
                fontFamily: "'Notable', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                lineHeight: 1.2
              }}
            >
              Quiz Results
            </h1>
            <div className="w-32" />
          </div>
        </div>

        {/* Results Content */}
        <div className="flex-1 flex items-center justify-center px-8 pt-24 pb-16">
          <div className="max-w-4xl w-full">
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-8 md:p-12">
              {/* Radar Chart */}
              <div className="mb-8 bg-white rounded-xl p-8" style={{
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="flex gap-8 items-center">
                  {/* Radar Chart - Left Side */}
                  <div className="flex-shrink-0" style={{ width: '140px', height: '140px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                        <PolarGrid 
                          stroke="#9ca3af" 
                          strokeWidth={1}
                        />
                        <PolarAngleAxis 
                          dataKey="trait" 
                          tick={(props) => {
                            const { x, y, payload } = props;
                            const isBottom = payload.value === 'Psychopathy' || payload.value === 'Machiavellianism';
                            const adjustedY = isBottom ? y + 12 : y;
                            
                            return (
                              <text
                                x={x}
                                y={adjustedY}
                                textAnchor="middle"
                                fill="#1f2937"
                                fontFamily="'Inter', 'Helvetica', sans-serif"
                                fontSize={8}
                                fontWeight={500}
                              >
                                {payload.value}
                              </text>
                            );
                          }}
                          tickLine={false}
                        />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 100]} 
                          tick={false}
                          axisLine={false}
                        />
                        <Radar 
                          name="Your Score" 
                          dataKey="value" 
                          stroke="#3b82f6"
                          fill="#93c5fd"
                          fillOpacity={0.4}
                          strokeWidth={1.5}
                          dot={{ fill: '#3b82f6', r: 2 }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Title and Stats - Right Side */}
                  <div className="flex-1 flex flex-col" style={{ minHeight: '140px' }}>
                    <h3 
                      className="text-center mb-2"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
                        fontSize: "1.5rem",
                        fontWeight: 500,
                        color: '#1a1a1a',
                        letterSpacing: '0.02em'
                      }}
                    >
                      YOUR DARK TRIAD PROFILE
                    </h3>
                    
                    <div className="flex justify-center gap-12">
                      {radarData.map((item) => (
                        <div key={item.trait} className="text-center">
                          <p 
                            style={{ 
                              fontFamily: "'Inter', 'Helvetica', sans-serif",
                              fontSize: '2rem',
                              fontWeight: 700,
                              color: '#1f2937',
                              marginBottom: '0.25rem'
                            }}
                          >
                            {Math.round(item.value)}%
                          </p>
                          <p 
                            style={{ 
                              fontFamily: "'Inter', 'Helvetica', sans-serif",
                              fontSize: '0.75rem',
                              color: '#6b7280',
                              textTransform: 'uppercase',
                              fontWeight: 500,
                              letterSpacing: '0.05em'
                            }}
                          >
                            {item.trait}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <h2 
                className="text-white text-center mb-4"
                style={{
                  fontFamily: "'Notable', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  lineHeight: 1.2
                }}
              >
                {bookResult.title}
              </h2>

              <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                <img 
                  src={bookResult.cover} 
                  alt={bookResult.book}
                  className="w-64 h-auto rounded-lg shadow-2xl"
                />
                <div>
                  <h3 
                    className="text-white mb-4"
                    style={{
                      fontFamily: "'Notable', sans-serif",
                      fontSize: "1.5rem",
                      lineHeight: 1.2
                    }}
                  >
                    Your Perfect Match: {bookResult.book}
                  </h3>
                  <p 
                    className="text-white/90 mb-6"
                    style={{
                      fontFamily: "Verdana, sans-serif",
                      fontSize: "1.125rem",
                      lineHeight: 1.6
                    }}
                  >
                    {bookResult.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => window.open(bookResult.buyLinks.kindle, '_blank', 'noopener,noreferrer')}
                      className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md hover:from-white/30 hover:to-white/20 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                      style={{ fontFamily: "Verdana, sans-serif" }}
                    >
                      Buy on Kindle
                    </Button>
                    <Button
                      onClick={() => window.open(bookResult.buyLinks.audible, '_blank', 'noopener,noreferrer')}
                      className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md hover:from-white/30 hover:to-white/20 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                      style={{ fontFamily: "Verdana, sans-serif" }}
                    >
                      Buy on Audible
                    </Button>
                    <Button
                      onClick={() => window.open(bookResult.buyLinks.amazon, '_blank', 'noopener,noreferrer')}
                      className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md hover:from-white/30 hover:to-white/20 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                      style={{ fontFamily: "Verdana, sans-serif" }}
                    >
                      Buy Paperback
                    </Button>
                  </div>
                </div>
              </div>

              {/* Social Sharing Section */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <h3 
                  className="text-white text-center mb-4"
                  style={{
                    fontFamily: "'Notable', sans-serif",
                    fontSize: "1.25rem",
                    lineHeight: 1.2
                  }}
                >
                  Share Your Results
                </h3>
                <div className="flex justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1877F2] hover:bg-[#0d65d9] text-white transition-all hover:scale-105 shadow-lg"
                    style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem" }}
                  >
                    <Facebook className="w-5 h-5" />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-gray-900 text-white transition-all hover:scale-105 shadow-lg"
                    style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem" }}
                  >
                    <Twitter className="w-5 h-5" />
                    X (Twitter)
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white transition-all hover:scale-105 shadow-lg"
                    style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem" }}
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#1da851] text-white transition-all hover:scale-105 shadow-lg"
                    style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem" }}
                  >
                    <Share2 className="w-5 h-5" />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex flex-col">
      {/* SEO Meta Tags */}
      <SEOMetaTags
        title={seoConfig.quiz.title}
        description={seoConfig.quiz.description}
        keywords={seoConfig.quiz.keywords}
        canonical={seoConfig.quiz.canonical}
        ogImage={husbandCover}
      />

      {/* Social Media Meta Tags */}
      <SocialMetaTags
        title={quizPageMeta.title}
        description={quizPageMeta.description}
        tags={quizPageMeta.tags}
        type={quizPageMeta.type}
        image={husbandCover}
      />
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-white hover:bg-white/10 hover:text-gray-200"
            style={{ fontFamily: "Verdana, sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 
            className="text-white"
            style={{
              fontFamily: "'Notable', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              lineHeight: 1.2
            }}
          >
            Dark Triad Quiz
          </h1>
          <div className="w-32" />
        </div>
      </div>

      {/* Disclaimer Screen */}
      {showDisclaimer && (
        <div className="flex-1 flex items-center justify-center px-8 pt-24 pb-16">
          <div className="max-w-2xl w-full">
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-8 md:p-12">
              <h2 
                className="text-white text-center mb-6"
                style={{
                  fontFamily: "'Notable', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 2.5rem)",
                  lineHeight: 1.2
                }}
              >
                Before You Begin
              </h2>

              <div className="space-y-4 mb-8">
                <p 
                  className="text-white/90"
                  style={{
                    fontFamily: "Verdana, sans-serif",
                    fontSize: "0.875rem",
                    lineHeight: 1.6
                  }}
                >
                  This quiz is designed purely for <strong>entertainment purposes</strong> and to help match you with a book from our thriller series based on your personality preferences.
                </p>
                
                <p 
                  className="text-white/90"
                  style={{
                    fontFamily: "Verdana, sans-serif",
                    fontSize: "0.875rem",
                    lineHeight: 1.6
                  }}
                >
                  <strong>Important Disclaimers:</strong>
                </p>

                <ul className="list-disc list-inside space-y-1 text-white/90 pl-4" style={{
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "0.8125rem",
                  lineHeight: 1.5
                }}>
                  <li>This is NOT a diagnostic tool or medical assessment</li>
                  <li>Results should not be used for self-diagnosis or treatment</li>
                  <li>This quiz does not replace professional psychological evaluation</li>
                  <li>The Dark Triad traits are presented in a fictional context for entertainment</li>
                  <li>If you have concerns about your mental health, please consult a licensed professional</li>
                  <li>By participating, you agree not to hold the author, publisher, or website liable for any decisions made based on quiz results</li>
                </ul>

                <p 
                  className="text-white/90 pt-2"
                  style={{
                    fontFamily: "Verdana, sans-serif",
                    fontSize: "0.875rem",
                    lineHeight: 1.6
                  }}
                >
                  By continuing, you acknowledge that this quiz is for fun and to discover which thriller book best matches your personality style.
                </p>
              </div>

              {/* Checkbox Agreement */}
              <div className="mb-6">
                <label 
                  className="flex items-start gap-3 cursor-pointer group"
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                >
                  <div 
                    className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                      agreedToTerms 
                        ? 'bg-white border-white' 
                        : 'bg-white/10 border-white/40 group-hover:border-white/60'
                    }`}
                  >
                    {agreedToTerms && <Check className="w-4 h-4 text-black" strokeWidth={3} />}
                  </div>
                  <span 
                    className="text-white/90 flex-1"
                    style={{
                      fontFamily: "Verdana, sans-serif",
                      fontSize: "0.875rem",
                      lineHeight: 1.5
                    }}
                  >
                    I agree to the terms and understand this is for entertainment purposes only
                  </span>
                </label>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={startQuiz}
                  disabled={!agreedToTerms}
                  className={`backdrop-blur-md border shadow-lg transition-all px-8 py-6 text-lg ${
                    agreedToTerms 
                      ? 'bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white border-white/30 hover:shadow-xl hover:scale-105 cursor-pointer'
                      : 'bg-gray-500/20 text-white/40 border-gray-500/30 cursor-not-allowed'
                  }`}
                  style={{ fontFamily: "Verdana, sans-serif" }}
                >
                  Start Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Content */}
      {!showDisclaimer && (
        <div className="flex-1 flex items-center justify-center px-8 pt-24 pb-16">
          <div className="max-w-3xl w-full">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span 
                  className="text-white/90"
                  style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem" }}
                >
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span 
                  className="text-white/90"
                  style={{ fontFamily: "Verdana, sans-serif", fontSize: "0.875rem" }}
                >
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-8 md:p-12">
              <h2 
                className="text-white mb-8"
                style={{
                  fontFamily: "'Notable', sans-serif",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  lineHeight: 1.3
                }}
              >
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      trackQuizAnswer(currentQuestion + 1, answer.trait);
                      handleAnswer(answer.trait);
                    }}
                    className="w-full text-left p-4 rounded-lg bg-white/10 border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all group"
                  >
                    <span 
                      className="text-white group-hover:text-white/100"
                      style={{
                        fontFamily: "Verdana, sans-serif",
                        fontSize: "1.125rem",
                        lineHeight: 1.5
                      }}
                    >
                      {answer.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}