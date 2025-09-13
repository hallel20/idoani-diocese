"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Event } from "@prisma/client";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { format, isAfter, isBefore, startOfDay } from "date-fns";
import Image from "next/image";

export default function EventsPage() {
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const now = new Date();
  const today = startOfDay(now);

  // Separate events into upcoming and past
  const upcomingEvents = events
    .filter(event => isAfter(new Date(event.date), today))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events
    .filter(event => isBefore(new Date(event.date), today))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
      <CardHeader className="pb-3">
        {/* {event.imageUrl && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )} */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-serif mb-2">
              {event.title}
            </CardTitle>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
            </div>
            {event.time && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                {event.time}
              </div>
            )}
            {event.location && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}
              </div>
            )}
          </div>
          <Badge 
            variant={isAfter(new Date(event.date), today) ? "default" : "secondary"}
            className="ml-2"
          >
            {isAfter(new Date(event.date), today) ? "Upcoming" : "Past"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {event.description && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
            {event.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>Diocese Event</span>
          </div>
          {/* {event.registrationRequired && (
            <Badge variant="outline" className="text-xs">
              Registration Required
            </Badge>
          )} */}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Events & Activities
          </h1>
          <p className="text-xl text-purple-100">
            Join us for worship, fellowship, and community events
          </p>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Events Found
              </h3>
              <p className="text-gray-500">
                There are currently no events to display.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-purple-600" />
                    Upcoming Events
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-gray-500" />
                    Past Events
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}

              {/* If only upcoming or only past events exist */}
              {upcomingEvents.length === 0 && pastEvents.length > 0 && (
                <div className="text-center py-8 bg-purple-50 rounded-lg">
                  <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">
                    No Upcoming Events
                  </h3>
                  <p className="text-purple-600">
                    Check back soon for new events and activities.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
