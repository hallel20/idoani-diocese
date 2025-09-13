"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Calendar, MapPin, BarChart3, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Parish, Priest, Event, Archdeaconry } from "@prisma/client";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: parishes = [] } = useQuery<Parish[]>({
    queryKey: ["/api/parishes"],
  });

  const { data: priests = [] } = useQuery<Priest[]>({
    queryKey: ["/api/priests"],
  });

  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const { data: archdeaconries = [] } = useQuery<Archdeaconry[]>({
    queryKey: ["/api/archdeaconries"],
  });

  const stats = [
    {
      title: "Total Parishes",
      value: parishes.length,
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Priests",
      value: priests.length,
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Upcoming Events",
      value: events.length,
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Archdeaconries",
      value: archdeaconries.length,
      icon: MapPin,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Diocese Management Dashboard
        </h1>
        <p className="text-slate-600">
          Manage parishes, priests, events, and archdeaconries for the Diocese of Idoani.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-700">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/parishes"
                className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group"
              >
                <Building2 className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-slate-700">Manage Parishes</h3>
                <p className="text-sm text-slate-500">Add, edit, or view parishes</p>
              </Link>
              
              <Link
                href="/admin/priests"
                className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group"
              >
                <Users className="w-6 h-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-slate-700">Manage Priests</h3>
                <p className="text-sm text-slate-500">Add, edit, or view priests</p>
              </Link>
              
              <Link
                href="/admin/events"
                className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 hover:from-purple-100 hover:to-violet-100 transition-all duration-200 group"
              >
                <Calendar className="w-6 h-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-slate-700">Manage Events</h3>
                <p className="text-sm text-slate-500">Schedule and manage events</p>
              </Link>
              
              <Link
                href="/admin/archdeaconries"
                className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 hover:from-orange-100 hover:to-amber-100 transition-all duration-200 group"
              >
                <MapPin className="w-6 h-6 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-slate-700">Manage Archdeaconries</h3>
                <p className="text-sm text-slate-500">Organize archdeaconries</p>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-700">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-slate-600">System initialized</span>
                </div>
                <span className="text-xs text-slate-400">Just now</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-slate-600">Database connected</span>
                </div>
                <span className="text-xs text-slate-400">1 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
