import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  TrendingUp, 
  Plus, 
  MoreHorizontal,
  Settings,
  DoorOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const API_BASE = "http://127.0.0.1:8000/api";

const STATUS_COLORS = {
  pending:  'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export function DashboardPage() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isProfessor = user?.role === 'professor';

  // Mock data for non-professor stats
  const stats = [
    { title: "Total Events", value: "12", icon: Calendar, trend: "+2 this month" },
    { title: "Total Attendees", value: "1,240", icon: Users, trend: "+12% vs last month" },
    { title: "Revenue", value: "$340", icon: TrendingUp, trend: "+5% vs last month" },
    { title: "Avg. Rating", value: "4.8", icon: BarChart3, trend: "Based on 45 reviews" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Tech Symposium", date: "Mar 15, 2024", registered: 45, status: "Published" },
    { id: 2, title: "Coding Workshop", date: "Mar 20, 2024", registered: 12, status: "Draft" },
    { id: 3, title: "Networking Night", date: "Mar 25, 2024", registered: 89, status: "Published" },
  ];

  // Room reservations for professor
  const [reservations, setReservations] = useState([]);
  const [loadingRes, setLoadingRes] = useState(false);

  useEffect(() => {
    if (!isProfessor || !user?.username) return;
    setLoadingRes(true);
    fetch(`${API_BASE}/reservations/?requester=${encodeURIComponent(user.username)}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setReservations(data);
      })
      .catch(() => {})
      .finally(() => setLoadingRes(false));
  }, [isProfessor, user?.username]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            {isProfessor
              ? `Welcome, ${user?.first_name || user?.username}. Manage your room reservations.`
              : 'Manage your events and view performance.'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/settings"><Settings className="mr-2 h-4 w-4"/> Settings</Link>
          </Button>
          {!isProfessor && (
            <Button asChild>
              <Link to="/create-event"><Plus className="mr-2 h-4 w-4"/> Create Event</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Professor: Room Reservations */}
      {isProfessor ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DoorOpen className="h-5 w-5" /> My Room Reservations
              </CardTitle>
              <CardDescription>
                All room booking requests you have submitted and their current status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingRes ? (
                <div className="flex items-center justify-center h-32 text-muted-foreground">Loading…</div>
              ) : reservations.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  No room reservations found.
                </div>
              ) : (
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Room</th>
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Time Slot</th>
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Requested On</th>
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {reservations.map((res) => (
                        <tr key={res.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">{res.room_name}</td>
                          <td className="p-4 align-middle">{res.date}</td>
                          <td className="p-4 align-middle">{res.time_slot}</td>
                          <td className="p-4 align-middle text-muted-foreground">{res.created_at}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[res.status] || 'bg-gray-100 text-gray-800'}`}>
                              {res.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.trend}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="events" className="space-y-4">
            <TabsList>
              <TabsTrigger value="events">My Events</TabsTrigger>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>
                    Manage your upcoming and past events here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Event Name</th>
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Registered</th>
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {upcomingEvents.map((event) => (
                          <tr key={event.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{event.title}</td>
                            <td className="p-4 align-middle">{event.date}</td>
                            <td className="p-4 align-middle">{event.registered}</td>
                            <td className="p-4 align-middle">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                event.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {event.status}
                              </span>
                            </td>
                            <td className="p-4 align-middle text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                  <DropdownMenuItem>View Attendees</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Cancel Event</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="attendees">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Registrations</CardTitle>
                  <CardDescription>
                    View who's signing up for your events.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-48 text-muted-foreground">
                    No recent registrations found.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
