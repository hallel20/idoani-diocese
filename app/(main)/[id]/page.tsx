"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Mail, ArrowLeft, Building2 } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Parish, Archdeaconry } from "@prisma/client";
import { Church } from "lucide-react";
import Link from "next/link";

export default function ParishDetail() {
  const params = useParams();
  const parishId = params?.id;

  const { data: parish, isLoading, error } = useQuery<Parish>({
    queryKey: ["/api/parishes", parishId],
    enabled: !!parishId,
  });

  const { data: archdeaconries = [] } = useQuery<Archdeaconry[]>({
    queryKey: ["/api/archdeaconries"],
  });

  const archdeaconry = parish?.archdeaconryId 
    ? archdeaconries.find(a => a.id === parish.archdeaconryId)
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-anglican-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading parish details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !parish) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Parish Not Found</h1>
            <p className="text-gray-600 mb-8">The requested parish could not be found.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-anglican-purple-600 to-anglican-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="outline" className="mb-6 text-white border-white hover:bg-white hover:text-anglican-purple-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Directory
            </Button>
          </Link>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            {parish.name}
          </h1>
          <p className="text-xl text-anglican-purple-100">
            {parish.address}
          </p>
        </div>
      </section>

      {/* Parish Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Church className="w-5 h-5 mr-2 text-anglican-purple-500" />
                    Parish Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-anglican-purple-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p className="text-gray-600">{parish.address}</p>
                    </div>
                  </div>

                  {parish.phone && (
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-anglican-purple-500 mt-1 mr-3" />
                      <div>
                        <h4 className="font-semibold">Phone</h4>
                        <p className="text-gray-600">{parish.phone}</p>
                      </div>
                    </div>
                  )}

                  {parish.email && (
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-anglican-purple-500 mt-1 mr-3" />
                      <div>
                        <h4 className="font-semibold">Email</h4>
                        <p className="text-gray-600">{parish.email}</p>
                      </div>
                    </div>
                  )}

                  {parish.serviceTimes && (
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-anglican-purple-500 mt-1 mr-3" />
                      <div>
                        <h4 className="font-semibold">Service Times</h4>
                        <p className="text-gray-600">{parish.serviceTimes}</p>
                      </div>
                    </div>
                  )}

                  {archdeaconry && (
                    <div className="flex items-start">
                      <Building2 className="w-5 h-5 text-anglican-purple-500 mt-1 mr-3" />
                      <div>
                        <h4 className="font-semibold">Archdeaconry</h4>
                        <Link 
                          href={`/archdeaconries/${archdeaconry.id}`}
                          className="text-anglican-purple-600 hover:text-anglican-purple-700 hover:underline"
                        >
                          {archdeaconry.name}
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Map Section */}
              {parish.mapUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Map integration would be displayed here</p>
                    </div>
                    {parish.mapUrl && (
                      <div className="mt-4">
                        <Button asChild>
                          <a href={parish.mapUrl} target="_blank" rel="noopener noreferrer">
                            <MapPin className="w-4 h-4 mr-2" />
                            View on Google Maps
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Parish Image */}
              {parish.imageUrl && (
                <Card>
                  <CardContent className="p-0">
                    <img
                      src={parish.imageUrl}
                      alt={parish.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {parish.phone && (
                    <Button asChild className="w-full">
                      <a href={`tel:${parish.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call Parish
                      </a>
                    </Button>
                  )}
                  {parish.email && (
                    <Button asChild variant="outline" className="w-full">
                      <a href={`mailto:${parish.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </a>
                    </Button>
                  )}
                  {parish.mapUrl && (
                    <Button asChild variant="outline" className="w-full">
                      <a href={parish.mapUrl} target="_blank" rel="noopener noreferrer">
                        <MapPin className="w-4 h-4 mr-2" />
                        Get Directions
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
