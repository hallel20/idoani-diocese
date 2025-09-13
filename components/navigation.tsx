"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  Menu,
  X,
  ChevronDown,
  Users,
  Calendar,
  Mail,
  Home,
  Shield,
} from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const { user } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/parishes", label: "Parishes", icon: Users },
    { href: "/priests", label: "Priests", icon: Users },
    { href: "/archdeaconries", label: "Archdeaconries", icon: Users },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/bishops-charge", label: "Bishop's Charge", icon: Mail },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-purple-100"
            : "bg-white/90 backdrop-blur-sm shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <Link href="/" data-testid="link-home">
              <div className="flex items-center cursor-pointer group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl mr-3 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <Image src="/logo.png" alt="Logo" width={30} height={30} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">✝</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl text-purple-800 group-hover:text-purple-700 transition-colors">
                    Idoani Diocese
                  </span>
                  <span className="text-xs text-purple-600 font-medium">
                    Anglican Communion
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                        isActive
                          ? "text-purple-700 bg-purple-50"
                          : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                      }`}
                      data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <div
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-yellow-500 transition-all duration-300 ${
                          isActive
                            ? "w-full"
                            : "group-hover:w-full"
                        }`}
                      />
                    </Link>
                  );
                })}

                {/* Admin Button */}
                {user ? (
                  <div className="ml-6 pl-6 border-l border-gray-200">
                    <Link href="/admin">
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                        data-testid="nav-admin-dashboard"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Button>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className={`relative p-2 rounded-xl transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "bg-purple-100 text-purple-700"
                    : "hover:bg-purple-50 text-gray-700"
                }`}
                data-testid="button-mobile-menu"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "opacity-0 rotate-180"
                        : "opacity-100 rotate-0"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "opacity-100 rotate-0"
                        : "opacity-0 -rotate-180"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-lg border-t border-purple-100 shadow-xl">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 group-hover:text-purple-600" />
                    <span>{item.label}</span>
                    <div className="flex-1" />
                    <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}

              <div className="pt-4 mt-4 border-t border-gray-200">
                {user ? (
                  <Link href="/admin">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-xl font-medium shadow-lg flex items-center justify-center space-x-2 transition-all duration-300">
                      <Shield className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-xl font-medium shadow-lg flex items-center justify-center space-x-2 transition-all duration-300">
                      <Shield className="w-5 h-5" />
                      <span>Admin Login</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-20" />
    </>
  );
}
