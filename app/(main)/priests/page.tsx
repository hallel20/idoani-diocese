"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Priest, type Parish } from "@prisma/client";
import { User, MapPin, Building2 } from "lucide-react";
import Image from "next/image";

type PriestWithParish = Priest & {
  parish?: Parish;
};

export default function PriestsPage() {
  const { data: priests = [], isLoading } = useQuery<Priest[]>({
    queryKey: ["/api/priests"],
  });

  const { data: parishes = [] } = useQuery<Parish[]>({
    queryKey: ["/api/parishes"],
  });

  // Combine priests with their parish information
  const priestsWithParishes: PriestWithParish[] = priests.map(priest => ({
    ...priest,
    parish: parishes.find(p => p.id === priest.parishId)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Our Priests
          </h1>
          <p className="text-xl text-green-100">
            Meet the dedicated clergy serving our diocese
          </p>
        </div>
      </section>

      {/* Priests Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : priestsWithParishes.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Priests Found
              </h3>
              <p className="text-gray-500">
                There are currently no priests to display.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {priestsWithParishes.map((priest) => (
                <Card key={priest.id} className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                  <CardHeader className="text-center pb-3">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      {priest.imageUrl ? (
                        <Image
                          src={priest.imageUrl}
                          alt={priest.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                          <User className="w-12 h-12 text-green-600" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg font-serif mb-1">
                      {priest.name}
                    </CardTitle>
                    {priest.title && (
                      <Badge variant="secondary" className="mb-2">
                        {priest.title}
                      </Badge>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-3">
                    {priest.parish && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{priest.parish.name}</span>
                      </div>
                    )}
                    
                    {priest.parish?.address && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{priest.parish.address}</span>
                      </div>
                    )}

                    {priest.bio && (
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {priest.bio}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
