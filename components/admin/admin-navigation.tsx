"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  Calendar, 
  MapPin, 
  LogOut,
  Home,
  FileText
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Parishes", href: "/admin/parishes", icon: Building2 },
  { name: "Priests", href: "/admin/priests", icon: Users },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Archdeaconries", href: "/admin/archdeaconries", icon: MapPin },
  { name: "Bishop's Charge", href: "/admin/bishops-charge", icon: FileText },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="flex items-center">
              <Image src="/logo.png" alt="Diocese Logo" width={40} height={40} />
              <h1 className="ml-3 font-serif font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/80"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              View Site
            </Link>
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              variant="outline"
              size="sm"
              className="border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
