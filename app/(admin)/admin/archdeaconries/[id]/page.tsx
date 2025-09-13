"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Parish, type Archdeaconry } from "@prisma/client";
import { Building2, MapPin, Phone, Mail, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ArchdeaconryDetailPage() {
  const params = useParams();
  const archdeaconryId = params.id as string;

  const { data: archdeaconries = [] } = useQuery<Archdeaconry[]>({
    queryKey: ["/api/archdeaconries"],
  });

  const { data: parishes = [], isLoading } = useQuery<Parish[]>({
    queryKey: ["/api/parishes"],
  });

  const archdeaconry = archdeaconries.find((a: any) => a.id === archdeaconryId);
  const archdeaconryParishes = parishes.filter(p => p.archdeaconryId === archdeaconryId);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!archdeaconry) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Archdeaconry not found</h3>
          <Link href="/admin/archdeaconries">
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Archdeaconries
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/archdeaconries">
          <Button variant="ghost" size="sm" className="hover:bg-orange-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            {archdeaconry.name}
          </h1>
          <p className="text-slate-600 mt-1">
            Archdeaconry Details & Parishes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-700">
              <MapPin className="w-5 h-5 mr-2 text-orange-600" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-700 mb-2">Total Parishes</h3>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                {archdeaconryParishes.length}
              </div>
            </div>
            
            {archdeaconry.description && (
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Description</h3>
                <p className="text-slate-600 text-sm">{archdeaconry.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-700">Parishes in {archdeaconry.name}</h2>
            <Link href="/admin/parishes">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                Manage Parishes
              </Button>
            </Link>
          </div>

          {archdeaconryParishes.length === 0 ? (
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No parishes assigned</h3>
                <p className="text-slate-500 mb-4">This archdeaconry doesn't have any parishes assigned yet.</p>
                <Link href="/admin/parishes">
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-500">
                    Add Parishes
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {archdeaconryParishes.map((parish) => (
                <Card key={parish.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-slate-700 mb-1">
                          {parish.name}
                        </CardTitle>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                          <Building2 className="w-3 h-3 mr-1" />
                          Parish
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {parish.imageUrl && (
                      <div className="w-full h-32 rounded-lg overflow-hidden">
                        <img 
                          src={parish.imageUrl} 
                          alt={parish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2 text-sm">
                      {parish.address && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600">{parish.address}</span>
                        </div>
                      )}
                      
                      {parish.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-600">{parish.phone}</span>
                        </div>
                      )}
                      
                      {parish.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-600">{parish.email}</span>
                        </div>
                      )}
                      
                      {parish.serviceTimes && (
                        <div className="flex items-start space-x-2">
                          <Clock className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600">{parish.serviceTimes}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
