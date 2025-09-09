"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: "/", label: "Home", section: "home" },
    { href: "/#directory", label: "Directory", section: "directory" },
    { href: "/#events", label: "Events", section: "events" },
    { href: "/#contact", label: "Contact", section: "contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center cursor-pointer">
              <svg className="w-8 h-8 text-anglican-purple-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="font-serif font-bold text-xl text-anglican-purple-700">
                Anglican Diocese
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === "/" && item.section === "home"
                      ? "text-anglican-purple-600"
                      : "text-gray-600 hover:text-anglican-purple-600"
                  }`}
                  data-testid={`nav-${item.section}`}
                >
                  {item.label}
                </button>
              ))}
              {user ? (
                <Link href="/admin">
                  <Button 
                    variant="default" 
                    className="bg-anglican-purple-500 hover:bg-anglican-purple-600"
                    data-testid="nav-admin-dashboard"
                  >
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/auth">
                  <Button 
                    variant="default" 
                    className="bg-anglican-purple-500 hover:bg-anglican-purple-600"
                    data-testid="nav-admin"
                  >
                    Admin
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollToSection(item.section)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-anglican-purple-600 hover:bg-gray-50 w-full text-left"
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <Link href="/admin">
                <Button 
                  variant="default" 
                  className="w-full bg-anglican-purple-500 hover:bg-anglican-purple-600 mt-4"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button 
                  variant="default" 
                  className="w-full bg-anglican-purple-500 hover:bg-anglican-purple-600 mt-4"
                >
                  Admin
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
