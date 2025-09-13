"use client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Calendar, Star, ArrowRight, Users } from "lucide-react";
import { Event } from "@prisma/client";
import { format } from "date-fns";

export default function EventsSection() {
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const featuredEvent = events.find(event => event.isFeatured);
  const regularEvents = events.filter(event => !event.isFeatured);

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "youth": return "bg-blue-50 text-blue-700 border border-blue-200";
      case "outreach": return "bg-green-50 text-green-700 border border-green-200";
      case "education": return "bg-purple-50 text-purple-700 border border-purple-200";
      case "music": return "bg-pink-50 text-pink-700 border border-pink-200";
      default: return "bg-anglican-purple-50 text-anglican-purple-700 border border-anglican-purple-200";
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case "youth": return "Youth Ministry";
      case "outreach": return "Community Outreach";
      case "education": return "Christian Education";
      case "music": return "Music & Worship";
      default: return "General";
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "youth": return <Users className="w-3 h-3" />;
      case "outreach": return <Star className="w-3 h-3" />;
      case "education": return <Calendar className="w-3 h-3" />;
      case "music": return <Star className="w-3 h-3" />;
      default: return <Calendar className="w-3 h-3" />;
    }
  };

  return (
    <section id="events" className="py-24 bg-gradient-to-b from-white via-anglican-purple-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-anglican-purple-100 text-anglican-purple-700 font-medium text-sm mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            Join Our Community
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-anglican-purple-800 mb-6 leading-tight">
            Upcoming Events
          </h2>
          <p className="text-xl text-anglican-purple-600 max-w-3xl mx-auto leading-relaxed font-light">
            Join us for worship, fellowship, and community service opportunities that strengthen our faith and serve our neighbors.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {/* Featured Event Skeleton */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl h-80 animate-pulse shadow-lg" />
            
            {/* Regular Events Skeleton */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl h-64 animate-pulse shadow-md" />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Event */}
            {featuredEvent && (
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-anglican-purple-600 via-anglican-purple-700 to-anglican-purple-800" />
                <div className="absolute inset-0 bg-black/10" />
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-anglican-gold/10 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
                
                <div className="relative p-8 lg:p-12 text-white">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <Badge className="bg-anglican-gold text-anglican-purple-800 font-semibold px-4 py-2 shadow-lg">
                      <Star className="w-3 h-3 mr-2" />
                      Featured Event
                    </Badge>
                    <div className="flex items-center text-white/90 font-medium">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(featuredEvent.date), "EEEE, MMMM d, yyyy")}
                    </div>
                  </div>
                  
                  <div className="max-w-3xl">
                    <h3 className="font-serif text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                      {featuredEvent.title}
                    </h3>
                    {featuredEvent.description && (
                      <p className="text-lg text-white/90 mb-8 leading-relaxed font-light">
                        {featuredEvent.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-6 text-white/90 mb-8">
                      {featuredEvent.time && (
                        <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="font-medium">{featuredEvent.time}</span>
                        </div>
                      )}
                      {featuredEvent.location && (
                        <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="font-medium">{featuredEvent.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="bg-anglican-gold text-anglican-purple-800 hover:bg-yellow-300 font-semibold px-8 py-3 text-base shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                      data-testid={`button-register-${featuredEvent.id}`}
                    >
                      Learn More & Register
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Events Grid */}
            {regularEvents.length === 0 && !featuredEvent ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-anglican-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-12 h-12 text-anglican-purple-400" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-anglican-purple-700 mb-4">
                  No Events Scheduled
                </h3>
                <p className="text-anglican-purple-500 text-lg max-w-md mx-auto">
                  Check back soon for upcoming worship services, community events, and fellowship opportunities.
                </p>
              </div>
            ) : (
              <div>
                {regularEvents.length > 0 && (
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-2xl font-semibold text-anglican-purple-700 mb-2">
                      More Upcoming Events
                    </h3>
                    <p className="text-anglican-purple-500">
                      Additional opportunities to connect and grow in faith
                    </p>
                  </div>
                )}
                
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {regularEvents.map((event) => (
                    <Card 
                      key={event.id} 
                      className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden"
                      data-testid={`card-event-${event.id}`}
                    >
                      {/* Card Header with gradient */}
                      <div className="h-2 bg-gradient-to-r from-anglican-purple-500 to-anglican-purple-700" />
                      
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-serif text-xl font-semibold text-anglican-purple-800 mb-2 group-hover:text-anglican-purple-900 transition-colors">
                              {event.title}
                            </h4>
                            <p className="text-sm text-anglican-purple-600 font-medium mb-1">
                              {format(new Date(event.date), "EEEE, MMMM d")}
                            </p>
                            <p className="text-xs text-anglican-purple-500">
                              {format(new Date(event.date), "yyyy")}
                            </p>
                          </div>
                          <Badge className={`${getCategoryColor(event.category)} font-medium px-3 py-1 flex items-center gap-1.5`}>
                            {getCategoryIcon(event.category)}
                            {getCategoryLabel(event.category)}
                          </Badge>
                        </div>
                        
                        {event.description && (
                          <p className="text-anglican-purple-600 mb-6 line-clamp-3 leading-relaxed">
                            {event.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            {event.time && (
                              <div className="flex items-center text-sm text-anglican-purple-500">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>{event.time}</span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center text-sm text-anglican-purple-500">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-anglican-purple-600 border-anglican-purple-200 hover:bg-anglican-purple-50 hover:border-anglican-purple-300 font-medium"
                          >
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* View All Events Button */}
        {events.length > 0 && (
          <div className="text-center mt-16">
            <Button 
              variant="outline" 
              className="text-anglican-purple-600 border-anglican-purple-300 hover:bg-anglican-purple-50 hover:border-anglican-purple-400 px-8 py-3 text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}