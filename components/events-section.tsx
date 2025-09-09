"use client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Calendar } from "lucide-react";
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
      case "youth": return "bg-blue-100 text-blue-600";
      case "outreach": return "bg-green-100 text-green-600";
      case "education": return "bg-purple-100 text-purple-600";
      case "music": return "bg-pink-100 text-pink-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case "youth": return "Youth";
      case "outreach": return "Outreach";
      case "education": return "Education";
      case "music": return "Music";
      default: return "General";
    }
  };

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-anglican-purple-700 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for worship, fellowship, and community service opportunities.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {/* Featured Event Skeleton */}
            <div className="bg-gray-200 rounded-2xl h-64 animate-pulse" />
            
            {/* Regular Events Skeleton */}
            <div className="grid lg:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-48 animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Featured Event */}
            {featuredEvent && (
              <div className="lg:col-span-2 bg-gradient-to-r from-anglican-purple-600 to-anglican-purple-700 rounded-2xl overflow-hidden text-white">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center mb-4">
                    <Badge className="bg-anglican-gold text-anglican-purple-800 mr-4">
                      Featured
                    </Badge>
                    <span className="text-anglican-purple-100">
                      {format(new Date(featuredEvent.date), "MMMM d, yyyy")}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-4">
                    {featuredEvent.title}
                  </h3>
                  {featuredEvent.description && (
                    <p className="text-lg text-anglican-purple-100 mb-6 leading-relaxed">
                      {featuredEvent.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-anglican-purple-100 mb-6">
                    {featuredEvent.time && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{featuredEvent.time}</span>
                      </div>
                    )}
                    {featuredEvent.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{featuredEvent.location}</span>
                      </div>
                    )}
                  </div>
                  <Button 
                    className="bg-anglican-gold text-anglican-purple-800 hover:bg-yellow-300"
                    data-testid={`button-register-${featuredEvent.id}`}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            )}

            {/* Regular Events */}
            {regularEvents.length === 0 && !featuredEvent ? (
              <div className="lg:col-span-2 text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No events scheduled at this time.</p>
              </div>
            ) : (
              regularEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="border border-gray-200 hover:shadow-lg transition-shadow"
                  data-testid={`card-event-${event.id}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-serif text-lg font-semibold text-anglican-purple-700 mb-1">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                        </p>
                      </div>
                      <Badge className={getCategoryColor(event.category)}>
                        {getCategoryLabel(event.category)}
                      </Badge>
                    </div>
                    
                    {event.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {event.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {event.time && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-anglican-purple-600 hover:text-anglican-purple-800"
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {events.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" className="text-anglican-purple-600 hover:text-anglican-purple-800">
              View All Events
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
