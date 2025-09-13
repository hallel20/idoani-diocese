import { Card, CardContent, CardMetric } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Building, Star } from "lucide-react";
import Link from "next/link";
import { Parish, Archdeaconry } from "@prisma/client";

type ParishWithArchdeaconry = Parish & {
  archdeaconry?: Archdeaconry | null;
};

interface DirectorySectionProps {
  parishes: ParishWithArchdeaconry[];
}

export default function DirectorySection({ parishes }: DirectorySectionProps) {
  // Extract unique archdeaconries from parishes
  const archdeaconries = Array.from(
    new Map(
      parishes
        .filter(p => p.archdeaconry)
        .map(p => [p.archdeaconry!.id, p.archdeaconry!])
    ).values()
  );

  const stats = {
    parishes: parishes.length,
    archdeaconries: archdeaconries.length,
    totalMembers: 5000 // Static for now
  };

  return (
    <section id="directory" className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 rounded-full px-6 py-2 mb-6">
            <span className="text-sm font-semibold text-purple-700">🏰 Diocese Directory</span>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Find Your <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Anglican Home</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover parishes, connect with priests, and explore archdeaconries throughout the 
            <strong> Diocese of Idoani</strong> in Ondo State, Nigeria.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <CardMetric>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Building className="w-8 h-8 text-purple-600" />
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Active</Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.parishes}</div>
              <div className="text-sm text-gray-600 font-medium">Parishes</div>
            </CardContent>
          </CardMetric>
          
          <CardMetric>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Star className="w-8 h-8 text-purple-600" />
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Regional</Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.archdeaconries}</div>
              <div className="text-sm text-gray-600 font-medium">Archdeaconries</div>
            </CardContent>
          </CardMetric>
          
          <CardMetric>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-purple-600" />
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Community</Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalMembers.toLocaleString()}+</div>
              <div className="text-sm text-gray-600 font-medium">Members</div>
            </CardContent>
          </CardMetric>
        </div>

        {/* Featured Parishes */}
        <div className="text-center mb-12">
          <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Featured Parishes
          </h3>
          <p className="text-gray-600 mb-8">
            Discover some of our vibrant parish communities
          </p>
          <Link href="/parishes">
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
              View All Parishes
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {parishes.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Parishes Found</h3>
              <p className="text-gray-500">No parishes are currently available.</p>
            </div>
          ) : (
            parishes.map((parish) => (
              <Card 
                key={parish.id} 
                className="group overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {parish.imageUrl ? (
                  <div className="h-32 overflow-hidden">
                    <img
                      src={parish.imageUrl}
                      alt={parish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-purple-100 via-purple-200 to-yellow-100 flex items-center justify-center">
                    <Building className="w-12 h-12 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                )}
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2">
                      {parish.name}
                    </h3>
                  </div>
                  
                  {parish.address && (
                    <div className="flex items-start mb-3">
                      <MapPin className="w-3 h-3 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{parish.address}</p>
                    </div>
                  )}
                  
                  {parish.archdeaconry && (
                    <Badge variant="secondary" className="text-xs mb-3">
                      {parish.archdeaconry.name}
                    </Badge>
                  )}
                  
                  <Link href={`/parish/${parish.id}`}>
                    <Button 
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                    >
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}