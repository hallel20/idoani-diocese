import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Phone, User, MapPin, Search } from "lucide-react";
import { Link } from "wouter";
import { Parish, Archdeaconry, Priest } from "@shared/schema";

export default function DirectorySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("parishes");

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
    if (!searchQuery) return true;
    return parish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           parish.address.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <section id="directory" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-anglican-purple-700 mb-4">
            Diocesan Directory
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find parishes, priests, and archdeaconries throughout our diocese.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search parishes, priests, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger data-testid="select-filter-type">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="parishes">Parishes</SelectItem>
                  <SelectItem value="priests">Priests</SelectItem>
                  <SelectItem value="archdeaconries">Archdeaconries</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <Select>
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
        </div>

        {/* Directory Tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium border-b-2 ${
              activeTab === "parishes"
                ? "text-anglican-purple-600 border-anglican-purple-600"
                : "text-gray-500 border-transparent hover:text-anglican-purple-600"
            }`}
            onClick={() => setActiveTab("parishes")}
            data-testid="tab-parishes"
          >
            Parishes
          </button>
          <button
            className={`px-6 py-3 font-medium border-b-2 ${
              activeTab === "priests"
                ? "text-anglican-purple-600 border-anglican-purple-600"
                : "text-gray-500 border-transparent hover:text-anglican-purple-600"
            }`}
            onClick={() => setActiveTab("priests")}
            data-testid="tab-priests"
          >
            Priests
          </button>
          <button
            className={`px-6 py-3 font-medium border-b-2 ${
              activeTab === "archdeaconries"
                ? "text-anglican-purple-600 border-anglican-purple-600"
                : "text-gray-500 border-transparent hover:text-anglican-purple-600"
            }`}
            onClick={() => setActiveTab("archdeaconries")}
            data-testid="tab-archdeaconries"
          >
            Archdeaconries
          </button>
        </div>

        {/* Parishes Grid */}
        {activeTab === "parishes" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {parishesLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-lg" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-2" />
                    <div className="h-4 bg-gray-300 rounded mb-4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded" />
                      <div className="h-4 bg-gray-300 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : filteredParishes.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">
                  {searchQuery ? "No parishes found matching your search." : "No parishes available."}
                </p>
              </div>
            ) : (
              filteredParishes.map((parish) => (
                <Card 
                  key={parish.id} 
                  className="overflow-hidden hover:shadow-xl transition-shadow"
                  data-testid={`card-parish-${parish.id}`}
                >
                  <div className="h-48 bg-gradient-to-r from-anglican-purple-100 to-anglican-purple-200 flex items-center justify-center">
                    <svg className="w-16 h-16 text-anglican-purple-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-anglican-purple-700 mb-2">
                      {parish.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{parish.address}</p>
                    
                    <div className="space-y-2 mb-4">
                      {parish.serviceTimes && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-anglican-purple-500" />
                          <span>{parish.serviceTimes}</span>
                        </div>
                      )}
                      {parish.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2 text-anglican-purple-500" />
                          <span>{parish.phone}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href={`/parish/${parish.id}`} className="flex-1">
                        <Button 
                          className="w-full bg-anglican-purple-500 hover:bg-anglican-purple-600 text-sm"
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
                          className="border-anglican-purple-500 text-anglican-purple-500 hover:bg-anglican-purple-50"
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
        )}

        {/* Priests Grid */}
        {activeTab === "priests" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {priests.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No priests available.</p>
              </div>
            ) : (
              priests.map((priest) => (
                <Card key={priest.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-anglican-purple-100 rounded-full flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-anglican-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-anglican-purple-700">
                          {priest.title} {priest.name}
                        </h3>
                        {priest.parishId && (
                          <p className="text-sm text-gray-600">
                            {parishes.find(p => p.id === priest.parishId)?.name || 'Parish'}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {priest.bio && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{priest.bio}</p>
                    )}
                    
                    <div className="space-y-2">
                      {priest.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2 text-anglican-purple-500" />
                          <span>{priest.phone}</span>
                        </div>
                      )}
                      {priest.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="w-4 h-4 mr-2 text-anglican-purple-500" />
                          <span>{priest.email}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Archdeaconries Grid */}
        {activeTab === "archdeaconries" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archdeaconries.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No archdeaconries available.</p>
              </div>
            ) : (
              archdeaconries.map((archdeaconry) => (
                <Card key={archdeaconry.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <h3 className="font-serif text-xl font-semibold text-anglican-purple-700">
                      {archdeaconry.name}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    {archdeaconry.description && (
                      <p className="text-gray-600 mb-4">{archdeaconry.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-anglican-purple-100 text-anglican-purple-700">
                        {parishes.filter(p => p.archdeaconryId === archdeaconry.id).length} Parishes
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Parishes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
