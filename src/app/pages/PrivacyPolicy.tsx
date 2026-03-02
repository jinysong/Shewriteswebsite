import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-8 bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <h1 
          className="mb-8"
          style={{
            fontFamily: "'Notable', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            lineHeight: 1.2
          }}
        >
          Privacy Policy
        </h1>

        <div 
          className="space-y-6 text-white/90"
          style={{
            fontFamily: "Verdana, sans-serif",
            fontSize: "1rem",
            lineHeight: 1.6
          }}
        >
          <p className="text-white/70 text-sm">
            <strong>Effective Date:</strong> March 1, 2026
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">1. Introduction</h2>
            <p>
              Welcome to Ruby Satana's author website ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and subscribe to our newsletter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">2. Information We Collect</h2>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Personal Information:</strong> Email address when you subscribe to our newsletter</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">3. How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Send you newsletters, book updates, and promotional materials</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and user experience</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">4. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Service Providers:</strong> Email marketing platforms and website hosting services that help us operate our business</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">6. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Unsubscribe from our newsletter at any time</li>
              <li>Object to processing of your personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">7. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites (such as Amazon, Audible, Stripe, and PayPal). We are not responsible for the privacy practices of these external sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">8. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date."
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Ruby Satana</strong><br />
              She Writes in Her Spare Time Productions Company<br />
              Email: privacy@rubysatana.com
            </p>
          </section>

          <section id="terms-of-use">
            <h2 className="text-xl font-semibold mb-3 text-white">11. Terms of Use</h2>
            
            <h3 className="text-lg font-semibold mb-2 text-white/90 mt-4">Newsletter Subscription</h3>
            <p className="mb-2">
              By subscribing to our newsletter, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Receive periodic emails about new book releases, exclusive content, and promotions</li>
              <li>Provide accurate and current contact information</li>
              <li>Understand that you can unsubscribe at any time by clicking the unsubscribe link in any email</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2 text-white/90 mt-4">Website Use</h3>
            <p className="mb-2">
              By using this website, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the website for lawful purposes only</li>
              <li>Not attempt to gain unauthorized access to any portion of the website</li>
              <li>Not reproduce, distribute, or create derivative works from our content without permission</li>
              <li>Respect all intellectual property rights, including book covers, author photographs, and written content</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2 text-white/90 mt-4">Third-Party Purchases</h3>
            <p>
              When you purchase books through third-party platforms (Amazon Kindle, Audible, Stripe, PayPal), you are subject to their respective terms of service and privacy policies. We are not responsible for transactions completed on external platforms.
            </p>

            <h3 className="text-lg font-semibold mb-2 text-white/90 mt-4">Limitation of Liability</h3>
            <p>
              This website and its content are provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of this website or reliance on its content.
            </p>

            <h3 className="text-lg font-semibold mb-2 text-white/90 mt-4">Governing Law</h3>
            <p>
              These Terms of Use are governed by and construed in accordance with applicable laws. Any disputes shall be resolved in the appropriate courts.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}