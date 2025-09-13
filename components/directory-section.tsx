"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardHighlight, CardMetric } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Phone, User, MapPin, Search, Mail, Users, Building, Calendar, Star, Filter } from "lucide-react";
import Link from "next/link";
import { Parish, Archdeaconry, Priest } from "@prisma/client";

export default function DirectorySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("parishes");
  const [locationFilter, setLocationFilter] = useState("all");

  const { data: parishes = [], isLoading: parishesLoading } = useQuery<Parish[]>({
    queryKey: ["/api/parishes", searchQuery],
  });

  const { data: archdeaconries = [] } = useQuery<Archdeaconry[]>({
    queryKey: ["/api/archdeaconries"],
  });

  const { data: priests = [] } = useQuery<Priest[]>({
    queryKey: ["/api/priests", searchQuery],
  });

  const filteredParishes = parishes.filter(parish => {
    const matchesSearch = !searchQuery || 
      parish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parish.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = locationFilter === "all" || parish.archdeaconryId === locationFilter;
    
    return matchesSearch && matchesLocation;
  });

  const filteredPriests = priests.filter(priest => {
    return !searchQuery || 
      priest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      priest.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const stats = {
    parishes: parishes.length,
    priests: priests.length,
    archdeaconries: archdeaconries.length,
    totalMembers: parishes.reduce((acc, parish) => acc + (parish.memberCount || 0), 0) || 5000
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <CardMetric>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Building className="w-8 h-8 text-purple-600" />
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Active</Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.parishes}+</div>
              <div className="text-sm text-gray-600 font-medium">Parishes</div>
            </CardContent>
          </CardMetric>
          
          <CardMetric>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <User className="w-8 h-8 text-purple-600" />
                <Badge variant="secondary" className="bg-green-100 text-green-700">Serving</Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.priests}+</div>
              <div className="text-sm text-gray-600 font-medium">Priests</div>
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
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalMembers.toLocaleString()+" +"}</div>
              <div className="text-sm text-gray-600 font-medium">Members</div>
            </CardContent>
          </CardMetric>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <CardHighlight className="mb-16">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Filter className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="font-serif text-2xl font-bold text-gray-900">Search & Filter Directory</h3>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Search Directory
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search parishes, priests, or locations in Idoani Diocese..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 text-base"
                    data-testid="input-search"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Filter by Type
                </label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger data-testid="select-filter-type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="parishes">Parishes Only</SelectItem>
                    <SelectItem value="priests">Priests Only</SelectItem>
                    <SelectItem value="archdeaconries">Archdeaconries Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Location Filter
                </label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger data-testid="select-location">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {archdeaconries.map((arch) => (
                      <SelectItem key={arch.id} value={arch.id}>
                        {arch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </CardHighlight>

        {/* Enhanced Directory Tabs */}
        <div className="flex flex-wrap justify-center mb-12 bg-white rounded-2xl p-2 shadow-lg border-2 border-purple-100">
          {[
            { id: "parishes", label: "Parishes", icon: Building, count: stats.parishes },
            { id: "priests", label: "Priests", icon: User, count: stats.priests },
            { id: "archdeaconries", label: "Archdeaconries", icon: Star, count: stats.archdeaconries }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 px-6 py-4 font-semibold rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                }`}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`tab-${tab.id}`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                <Badge 
                  variant={activeTab === tab.id ? "secondary" : "outline"}
                  className={activeTab === tab.id ? "bg-white/20 text-white border-white/30" : ""}
                >
                  {tab.count}
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Enhanced Parishes Grid */}
        {activeTab === "parishes" && (
          <div className="space-y-8">
            {filteredParishes.length > 0 && (
              <div className="text-center">
                <p className="text-lg text-gray-600">
                  Found <span className="font-bold text-purple-700">{filteredParishes.length}</span> parishes
                  {locationFilter !== "all" && ` in ${archdeaconries.find(a => a.id === locationFilter)?.name}`}
                </p>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {parishesLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-300 rounded-t-2xl" />
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-300 rounded mb-3" />
                      <div className="h-4 bg-gray-300 rounded mb-4" />
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-300 rounded" />
                        <div className="h-4 bg-gray-300 rounded" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : filteredParishes.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Parishes Found</h3>
                  <p className="text-gray-500">
                    {searchQuery || locationFilter !== "all" 
                      ? "Try adjusting your search or filter criteria." 
                      : "No parishes are currently available."}
                  </p>
                </div>
              ) : (
                filteredParishes.map((parish) => (
                  <Card 
                    key={parish.id} 
                    className="group overflow-hidden"
                    data-testid={`card-parish-${parish.id}`}
                  >
                    <div className="h-48 bg-gradient-to-br from-purple-100 via-purple-200 to-yellow-100 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent" />
                      <Building className="w-16 h-16 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                          {parish.name}
                        </h3>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          Parish
                        </Badge>
                      </div>
                      
                      <div className="flex items-start mb-4">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                        <p className="text-gray-600 text-sm leading-relaxed">{parish.address}</p>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        {parish.serviceTimes && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-3 text-purple-500" />
                            <span className="font-medium">Services:</span>
                            <span className="ml-2">{parish.serviceTimes}</span>
                          </div>
                        )}
                        {parish.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-3 text-purple-500" />
                            <span className="font-medium">Phone:</span>
                            <span className="ml-2">{parish.phone}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        <Link href={`/parish/${parish.id}`} className="flex-1">
                          <Button 
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            data-testid={`button-view-parish-${parish.id}`}
                          >
                            View Details
                          </Button>
                        </Link>
                        {parish.mapUrl && (
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                            className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300"
                          >
                            <a href={parish.mapUrl} target="_blank" rel="noopener noreferrer">
                              <MapPin className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Enhanced Priests Grid */}
        {activeTab === "priests" && (
          <div className="space-y-8">
            {filteredPriests.length > 0 && (
              <div className="text-center">
                <p className="text-lg text-gray-600">
                  Found <span className="font-bold text-purple-700">{filteredPriests.length}</span> priests serving in Idoani Diocese
                </p>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPriests.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Priests Found</h3>
                  <p className="text-gray-500">
                    {searchQuery ? "Try adjusting your search criteria." : "No priests are currently available."}
                  </p>
                </div>
              ) : (
                filteredPriests.map((priest) => (
                  <Card key={priest.id} className="group">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-6">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mr-4 group-hover:shadow-lg transition-shadow">
                            <User className="w-7 h-7 text-purple-600" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">✝</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                            {priest.title} {priest.name}
                          </h3>
                          {priest.parishId && (
                            <p className="text-sm text-purple-600 font-medium">
                              {parishes.find(p => p.id === priest.parishId)?.name || 'Parish Ministry'}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {priest.bio && (
                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                          {priest.bio}
                        </p>
                      )}
                      
                      <div className="space-y-3">
                        {priest.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-3 text-purple-500" />
                            <span className="font-medium">Phone:</span>
                            <span className="ml-2">{priest.phone}</span>
                          </div>
                        )}
                        {priest.email && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-3 text-purple-500" />
                            <span className="font-medium">Email:</span>
                            <span className="ml-2 text-purple-600 hover:text-purple-800 transition-colors">{priest.email}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Enhanced Archdeaconries Grid */}
        {activeTab === "archdeaconries" && (
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-lg text-gray-600">
                Exploring <span className="font-bold text-purple-700">{archdeaconries.length}</span> archdeaconries in Idoani Diocese
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {archdeaconries.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Archdeaconries Found</h3>
                  <p className="text-gray-500">No archdeaconries are currently available.</p>
                </div>
              ) : (
                archdeaconries.map((archdeaconry) => (
                  <CardHighlight key={archdeaconry.id}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <Star className="w-8 h-8 text-purple-600" />
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          Archdeaconry
                        </Badge>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-gray-900 mt-4">
                        {archdeaconry.name}
                      </h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {archdeaconry.description && (
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {archdeaconry.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 text-purple-500 mr-2" />
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                            {parishes.filter(p => p.archdeaconryId === archdeaconry.id).length} Parishes
                          </Badge>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-purple-300 text-purple-600 hover:bg-purple-50"
                        >
                          View Parishes
                        </Button>
                      </div>
                    </CardContent>
                  </CardHighlight>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}