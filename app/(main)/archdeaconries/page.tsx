"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Archdeaconry } from "@prisma/client";
import { Building2, MapPin, Users } from "lucide-react";
import Link from "next/link";

export default function ArchdeaconriesPage() {
  const { data: archdeaconries = [], isLoading } = useQuery<Archdeaconry[]>({
    queryKey: ["/api/archdeaconries"],
  });

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
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : archdeaconries.length === 0 ? (
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
                          <span>View Parishes</span>
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
