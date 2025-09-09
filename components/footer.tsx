"use client";
import Link from "next/link";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-anglican-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <svg className="w-8 h-8 text-anglican-gold mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="font-serif font-bold text-xl">Anglican Diocese</span>
            </div>
            <p className="text-anglican-purple-100 mb-6 leading-relaxed">
              A community of faith serving God and our neighbors with love, compassion, and dedication to the Gospel of Jesus Christ.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-anglican-purple-200 hover:text-anglican-gold transition-colors"
                data-testid="link-facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-anglican-purple-200 hover:text-anglican-gold transition-colors"
                data-testid="link-instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348c0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348c0 1.297-1.051 2.348-2.348 2.348z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-anglican-purple-200 hover:text-anglican-gold transition-colors"
                data-testid="link-youtube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="text-anglican-purple-200 hover:text-white transition-colors text-left"
                  data-testid="footer-link-home"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("directory")} 
                  className="text-anglican-purple-200 hover:text-white transition-colors text-left"
                  data-testid="footer-link-directory"
                >
                  Parish Directory
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("events")} 
                  className="text-anglican-purple-200 hover:text-white transition-colors text-left"
                  data-testid="footer-link-events"
                >
                  Events
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="text-anglican-purple-200 hover:text-white transition-colors text-left"
                  data-testid="footer-link-contact"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <Link href="/auth">
                  <span className="text-anglican-purple-200 hover:text-white transition-colors cursor-pointer">
                    Admin Login
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-2 text-anglican-purple-200">
              <p>123 Cathedral Square</p>
              <p>City Center, State 12345</p>
              <p>(555) 000-1234</p>
              <p>info@anglicandioceseexample.org</p>
            </div>
          </div>
        </div>

        <div className="border-t border-anglican-purple-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-anglican-purple-200 text-sm">
              © 2024 Anglican Diocese. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="#" 
                className="text-anglican-purple-200 hover:text-white text-sm transition-colors"
                data-testid="link-privacy"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-anglican-purple-200 hover:text-white text-sm transition-colors"
                data-testid="link-terms"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-anglican-purple-200 hover:text-white text-sm transition-colors"
                data-testid="link-accessibility"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
