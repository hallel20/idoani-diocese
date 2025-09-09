"use client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Users, Church, Map, Calendar, Mail } from "lucide-react";
import PriestManagement from "@/components/admin/priest-management";
import ParishManagement from "@/components/admin/parish-management";
import ArchdeaconryManagement from "@/components/admin/archdeaconry-management";
import EventsManagement from "@/components/admin/events-management";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  const { user } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <svg
                className="w-8 h-8 text-anglican-purple-500 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <h1 className="font-serif font-bold text-xl text-anglican-purple-700">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* @ts-ignore */}
              <span className="text-gray-600">Welcome, {user?.username}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Content Management System
          </h2>
          <p className="text-gray-600">
            Manage diocesan content, directory information, and community
            events.
          </p>
        </div>

        <Tabs defaultValue="priests" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger
              value="priests"
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Priests</span>
            </TabsTrigger>
            <TabsTrigger
              value="parishes"
              className="flex items-center space-x-2"
            >
              <Church className="w-4 h-4" />
              <span className="hidden sm:inline">Parishes</span>
            </TabsTrigger>
            <TabsTrigger
              value="archdeaconries"
              className="flex items-center space-x-2"
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Archdeaconries</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Contacts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="priests">
            <PriestManagement />
          </TabsContent>

          <TabsContent value="parishes">
            <ParishManagement />
          </TabsContent>

          <TabsContent value="archdeaconries">
            <ArchdeaconryManagement />
          </TabsContent>

          <TabsContent value="events">
            <EventsManagement />
          </TabsContent>

          <TabsContent value="contacts">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Contact Messages</h3>
              <p className="text-gray-600">
                Contact management functionality will be implemented here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
