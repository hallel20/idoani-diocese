import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Mail, ArrowLeft, Building2 } from "lucide-react";
import { Parish, Archdeaconry } from "@prisma/client";
import { Church } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

type ParishWithArchdeaconry = Parish & {
  archdeaconry?: Archdeaconry;
};

async function getParish(id: string): Promise<ParishWithArchdeaconry | null> {
  try {
    const parish = await prisma.parish.findUnique({
      where: { id },
      include: {
        archdeaconry: true,
      },
    });
    return parish;
  } catch (error) {
    console.error("Error fetching parish:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const parish = await getParish(params.id);
  
  if (!parish) {
    return {
      title: "Parish Not Found - Diocese of Idoani",
    };
  }

  return {
    title: `${parish.name} - Diocese of Idoani`,
    description: `Visit ${parish.name} located at ${parish.address}. Service times, contact information, and more details about this Anglican parish in the Diocese of Idoani.`,
    keywords: [parish.name, "parish", "anglican", "church", "idoani", "diocese", parish.address],
    openGraph: {
      title: parish.name,
      description: `Anglican parish located at ${parish.address}`,
      type: "place",
      images: parish.imageUrl ? [parish.imageUrl] : undefined,
    },
  };
}

export default async function ParishDetail({ params }: { params: { id: string } }) {
  const parish = await getParish(params.id);

  if (!parish) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-anglican-purple-600 to-anglican-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/parishes">
            <Button variant="outline" className="mb-6 text-white border-white hover:bg-white hover:text-anglican-purple-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Parishes
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

                  {parish.archdeaconry && (
                    <div className="flex items-start">
                      <Building2 className="w-5 h-5 text-anglican-purple-500 mt-1 mr-3" />
                      <div>
                        <h4 className="font-semibold">Archdeaconry</h4>
                        <Link 
                          href={`/archdeaconries/${parish.archdeaconry.id}`}
                          className="text-anglican-purple-600 hover:text-anglican-purple-700 hover:underline"
                        >
                          {parish.archdeaconry.name}
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
    </div>
  );
}
