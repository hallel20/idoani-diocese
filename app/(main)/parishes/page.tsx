import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Parish, type Archdeaconry } from "@prisma/client";
import { Building2, MapPin, Phone, Mail, Users } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

const prisma = new PrismaClient();

type ParishWithArchdeaconry = Parish & {
  archdeaconry?: Archdeaconry | null;
};

async function getParishes(): Promise<ParishWithArchdeaconry[]> {
  try {
    const parishes = await prisma.parish.findMany({
      include: {
        archdeaconry: true,
      },
      orderBy: { name: "asc" },
    });
    return parishes;
  } catch (error) {
    console.error("Error fetching parishes:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Parishes - Diocese of Idoani",
  description: "Explore all parishes within the Anglican Diocese of Idoani. Find contact information, service times, and locations for each parish church.",
  keywords: ["parishes", "churches", "anglican", "idoani", "diocese", "worship", "service times"],
  openGraph: {
    title: "Parishes - Diocese of Idoani",
    description: "Explore all parishes within the Anglican Diocese of Idoani",
    type: "website",
  },
};

export default async function ParishesPage() {
  const parishes = await getParishes();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Our Parishes
          </h1>
          <p className="text-xl text-blue-100">
            Discover the vibrant parish communities across our diocese
          </p>
        </div>
      </section>

      {/* Parishes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {parishes.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Parishes Found
              </h3>
              <p className="text-gray-500">
                There are currently no parishes to display.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parishes.map((parish) => (
                <Link
                  key={parish.id}
                  href={`/parish/${parish.id}`}
                  className="group"
                >
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group-hover:border-blue-200">
                    {parish.imageUrl && (
                      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={parish.imageUrl}
                          alt={parish.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-serif mb-2 group-hover:text-blue-600 transition-colors">
                            {parish.name}
                          </CardTitle>
                          {parish.address && (
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              {parish.address}
                            </div>
                          )}
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          <Building2 className="w-3 h-3 mr-1" />
                          Parish
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm">
                        {parish.archdeaconry && (
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{parish.archdeaconry.name}</span>
                          </div>
                        )}
                        
                        {parish.phone && (
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>{parish.phone}</span>
                          </div>
                        )}
                        
                        {parish.email && (
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            <span className="truncate">{parish.email}</span>
                          </div>
                        )}
                        
                        {parish.serviceTimes && (
                          <div className="text-gray-600 text-xs mt-2 p-2 bg-gray-50 rounded">
                            <strong>Service Times:</strong> {parish.serviceTimes}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-blue-600 group-hover:text-blue-700 font-medium text-sm">
                          View Details →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
