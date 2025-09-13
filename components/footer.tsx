"use client";
import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  ChevronUp,
  Church,
  Heart
} from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative text-white overflow-hidden">
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/70 to-[var(--color-anglican-purple-800)]/70" />
      
      {/* Purple tint overlay for Anglican branding */}
      <div className="absolute inset-0 bg-purple-900/30" />
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-anglican-gold rounded-full -translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-40 translate-y-40" />
      </div>
      
      {/* Scroll to top button */}
      <div className="absolute z-[100] left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToTop}
          className="bg-anglican-gold text-anglican-purple-800 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-anglican-gold rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
                <Church className="relative w-10 h-10 text-anglican-gold mr-4 p-1" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-2xl text-white">
                  Idoani Diocese
                </h3>
                <p className="text-anglican-purple-200 text-sm font-light">
                  Anglican Communion
                </p>
              </div>
            </div>
            
            <p className="text-anglican-purple-100 mb-8 leading-relaxed font-light text-lg">
              A vibrant community of faith serving God and our neighbors with love, compassion, 
              and unwavering dedication to the Gospel of Jesus Christ.
            </p>
            
            {/* Mission statement */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/10">
              <div className="flex items-center mb-2">
                <Heart className="w-4 h-4 text-anglican-gold mr-2" />
                <p className="text-anglican-gold font-medium text-sm">Our Mission</p>
              </div>
              <p className="text-anglican-purple-100 text-sm leading-relaxed">
                "To know Christ and make Him known through worship, fellowship, and service."
              </p>
            </div>
            
            {/* Social Links */}
            <div>
              <p className="text-anglican-purple-200 text-sm font-medium mb-3">Connect With Us</p>
              <div className="flex space-x-3">
                <a 
                  href="https://www.facebook.com/p/Idoani-Diocese-100064662195607/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 hover:bg-anglican-gold p-3 rounded-full transition-all duration-200 hover:scale-105"
                  data-testid="link-facebook"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5 text-white group-hover:text-anglican-purple-800 transition-colors" />
                </a>
                <a 
                  href="#" 
                  className="group bg-white/10 hover:bg-anglican-gold p-3 rounded-full transition-all duration-200 hover:scale-105"
                  data-testid="link-instagram"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5 text-white group-hover:text-anglican-purple-800 transition-colors" />
                </a>
                <a 
                  href="#" 
                  className="group bg-white/10 hover:bg-anglican-gold p-3 rounded-full transition-all duration-200 hover:scale-105"
                  data-testid="link-youtube"
                  aria-label="Watch us on YouTube"
                >
                  <Youtube className="w-5 h-5 text-white group-hover:text-anglican-purple-800 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="font-serif font-semibold text-xl mb-6 text-white relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-anglican-gold" />
            </h4>
            <nav>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection("home")} 
                    className="group text-anglican-purple-200 hover:text-anglican-gold transition-all duration-200 text-left flex items-center"
                    data-testid="footer-link-home"
                  >
                    <Star className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">Home</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("directory")} 
                    className="group text-anglican-purple-200 hover:text-anglican-gold transition-all duration-200 text-left flex items-center"
                    data-testid="footer-link-directory"
                  >
                    <Star className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">Parish Directory</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("events")} 
                    className="group text-anglican-purple-200 hover:text-anglican-gold transition-all duration-200 text-left flex items-center"
                    data-testid="footer-link-events"
                  >
                    <Star className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">Events</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("contact")} 
                    className="group text-anglican-purple-200 hover:text-anglican-gold transition-all duration-200 text-left flex items-center"
                    data-testid="footer-link-contact"
                  >
                    <Star className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">Contact Us</span>
                  </button>
                </li>
                <li className="pt-2 border-t border-white/10">
                  <Link href="/auth">
                    <span className="group text-anglican-gold hover:text-yellow-300 transition-all duration-200 cursor-pointer flex items-center font-medium">
                      <Star className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform">Admin Login</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 lg:col-span-5">
            <h4 className="font-serif font-semibold text-xl mb-6 text-white relative">
              Get In Touch
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-anglican-gold" />
            </h4>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4 group">
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-anglican-gold/20 transition-colors">
                  <MapPin className="w-5 h-5 text-anglican-gold flex-shrink-0" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Visit Us</p>
                  <p className="text-anglican-purple-200 leading-relaxed">
                    Cathedral Church of the Holy Trinity<br />
                    Idoani, Ondo State, 341116
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 group">
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-anglican-gold/20 transition-colors">
                  <Phone className="w-5 h-5 text-anglican-gold flex-shrink-0" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Call Us</p>
                  <a 
                    href="tel:+15550001234" 
                    className="text-anglican-purple-200 hover:text-anglican-gold transition-colors"
                  >
                    +234 (703) 210 5433
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 group">
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-anglican-gold/20 transition-colors">
                  <Mail className="w-5 h-5 text-anglican-gold flex-shrink-0" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email Us</p>
                  <a 
                    href="mailto:dioceseofidoani@gmail.com" 
                    className="text-anglican-purple-200 hover:text-anglican-gold transition-colors break-all"
                  >
                    dioceseofidoani@gmail.com
                  </a>
                </div>
              </div>

              {/* Service Times */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-anglican-gold font-medium mb-3 flex items-center">
                  <Church className="w-4 h-4 mr-2" />
                  Service Times
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-anglican-purple-200">Sunday Worship:</span>
                    <span className="text-white">8:00 AM & 10:30 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-anglican-purple-200">Wednesday Prayer:</span>
                    <span className="text-white">5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-anglican-purple-200 text-sm">
                © 2025 Idoani Diocese. All rights reserved.
              </p>
              <div className="hidden sm:block w-1 h-1 bg-anglican-purple-400 rounded-full" />
              <p className="text-anglican-purple-300 text-sm font-light">
                Built with faith and dedication
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              <a 
                href="#" 
                className="text-anglican-purple-200 hover:text-anglican-gold text-sm transition-colors relative group"
                data-testid="link-privacy"
              >
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-anglican-gold group-hover:w-full transition-all duration-200" />
              </a>
              <a 
                href="#" 
                className="text-anglican-purple-200 hover:text-anglican-gold text-sm transition-colors relative group"
                data-testid="link-terms"
              >
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-anglican-gold group-hover:w-full transition-all duration-200" />
              </a>
              <a 
                href="#" 
                className="text-anglican-purple-200 hover:text-anglican-gold text-sm transition-colors relative group"
                data-testid="link-accessibility"
              >
                Accessibility
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-anglican-gold group-hover:w-full transition-all duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}