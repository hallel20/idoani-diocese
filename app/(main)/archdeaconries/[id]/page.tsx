import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Parish, type Archdeaconry } from "@prisma/client";
import { Building2, MapPin, Phone, Mail, ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

type ArchdeaconryWithParishes = Archdeaconry & {
  parishes: Parish[];
};

async function getArchdeaconry(id: string): Promise<ArchdeaconryWithParishes | null> {
  try {
    const archdeaconry = await prisma.archdeaconry.findUnique({
      where: { id },
      include: {
        parishes: {
          orderBy: { name: "asc" },
        },
      },
    });
    return archdeaconry;
  } catch (error) {
    console.error("Error fetching archdeaconry:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const archdeaconry = await getArchdeaconry(params.id);
  
  if (!archdeaconry) {
    return {
      title: "Archdeaconry Not Found - Diocese of Idoani",
    };
  }

  return {
    title: `${archdeaconry.name} - Diocese of Idoani`,
    description: `Explore ${archdeaconry.name} and its ${archdeaconry.parishes.length} parishes within the Anglican Diocese of Idoani.`,
    keywords: [archdeaconry.name, "archdeaconry", "anglican", "idoani", "diocese", "parishes"],
    openGraph: {
      title: archdeaconry.name,
      description: `Archdeaconry with ${archdeaconry.parishes.length} parishes in the Diocese of Idoani`,
      type: "website",
    },
  };
}

export default async function ArchdeaconryDetailPage({ params }: { params: { id: string } }) {
  const archdeaconry = await getArchdeaconry(params.id);

  if (!archdeaconry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/archdeaconries">
            <Button variant="outline" className="mb-6 text-white border-white hover:bg-white hover:text-orange-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Archdeaconries
            </Button>
          </Link>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            {archdeaconry.name}
          </h1>
        </div>
      </section>

      {/* Archdeaconry Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {archdeaconry.description && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="w-5 h-5 mr-2" />
                      About This Archdeaconry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {archdeaconry.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Parishes in this Archdeaconry */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Parishes ({archdeaconry.parishes.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {archdeaconry.parishes.length === 0 ? (
                    <div className="text-center py-8">
                      <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">
                        No parishes found in this archdeaconry.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {archdeaconry.parishes.map((parish) => (
                        <Link
                          key={parish.id}
                          href={`/parish/${parish.id}`}
                          className="group"
                        >
                          <div className="border rounded-lg p-4 hover:shadow-md hover:border-orange-200 transition-all duration-200">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg group-hover:text-orange-600 transition-colors">
                                  {parish.name}
                                </h3>
                                {parish.address && (
                                  <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {parish.address}
                                  </div>
                                )}
                              </div>
                              <Badge variant="secondary" className="ml-4">
                                Parish
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                {parish.phone && (
                                  <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-1" />
                                    {parish.phone}
                                  </div>
                                )}
                                {parish.email && (
                                  <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-1" />
                                    {parish.email}
                                  </div>
                                )}
                              </div>
                              <span className="text-orange-600 group-hover:text-orange-700 font-medium text-sm">
                                View Details →
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Type</h4>
                    <Badge variant="secondary">
                      <Building2 className="w-3 h-3 mr-1" />
                      Archdeaconry
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Parishes</h4>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {archdeaconry.parishes.length} {archdeaconry.parishes.length === 1 ? 'Parish' : 'Parishes'}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Explore</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/archdeaconries">
                    <Button variant="outline" className="w-full justify-start">
                      <Building2 className="w-4 h-4 mr-2" />
                      All Archdeaconries
                    </Button>
                  </Link>
                  <Link href="/parishes">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      All Parishes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}