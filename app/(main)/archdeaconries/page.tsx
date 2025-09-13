import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Archdeaconry, type Parish } from "@prisma/client";
import { Building2, Users } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

const prisma = new PrismaClient();

async function getArchdeaconries() {
  try {
    const archdeaconries = await prisma.archdeaconry.findMany({
      include: {
        parishes: true,
      },
      orderBy: { name: "asc" },
    });
    return archdeaconries;
  } catch (error) {
    console.error("Error fetching archdeaconries:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Archdeaconries - Diocese of Idoani",
  description: "Explore the archdeaconries within the Anglican Diocese of Idoani and discover the parishes under their pastoral care.",
  keywords: ["archdeaconries", "anglican", "idoani", "diocese", "parishes", "pastoral care"],
  openGraph: {
    title: "Archdeaconries - Diocese of Idoani",
    description: "Explore the archdeaconries within the Anglican Diocese of Idoani",
    type: "website",
  },
};

export default async function ArchdeaconriesPage() {
  const archdeaconries = await getArchdeaconries();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Archdeaconries
          </h1>
          <p className="text-xl text-orange-100">
            Discover the archdeaconries within our diocese and their parishes
          </p>
        </div>
      </section>

      {/* Archdeaconries Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {archdeaconries.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Archdeaconries Found
              </h3>
              <p className="text-gray-500">
                There are currently no archdeaconries to display.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archdeaconries.map((archdeaconry) => (
                <Link
                  key={archdeaconry.id}
                  href={`/archdeaconries/${archdeaconry.id}`}
                  className="group"
                >
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group-hover:border-orange-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-serif mb-2 group-hover:text-orange-600 transition-colors">
                            {archdeaconry.name}
                          </CardTitle>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          <Building2 className="w-3 h-3 mr-1" />
                          Archdeaconry
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {archdeaconry.description && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                          {archdeaconry.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{archdeaconry.parishes.length} Parishes</span>
                        </div>
                        <span className="text-orange-600 group-hover:text-orange-700 font-medium">
                          Learn more →
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
