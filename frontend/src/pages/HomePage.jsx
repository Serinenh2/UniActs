import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Users, ArrowRight, Star } from 'lucide-react';
import { getEvents } from '@/data/mockEvents';

export function HomePage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getEvents();
      if (mounted) setEvents(data);
    })();
    return () => { mounted = false; };
  }, []);
  const featuredEvents = events.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
            Discover Your Campus Life
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of students connecting through events, clubs, and shared passions. 
            The ultimate platform for university engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all" asChild>
              <Link to="/events">Browse Events</Link>
            </Button>
            <Button size="lg" variant="outline" className="font-bold text-lg px-8 py-6 rounded-full bg-white text-black hover:bg-gray-100 border-transparent" asChild>
              <Link to="/register">Join a Club</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Why UniActs?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We bring the entire university ecosystem to your fingertips.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Event Discovery</h3>
              <p className="text-gray-600">
                Find workshops, parties, and seminars happening near you. Filter by date, category, or club.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Club Management</h3>
              <p className="text-gray-600">
                Run your student organization smoothly. Manage members, events, and announcements in one place.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Engage & Lead</h3>
              <p className="text-gray-600">
                Track your participation, earn certificates, and build your leadership portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Preview */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
            <p className="text-gray-600">Don't miss out on what's happening this week.</p>
          </div>
          <Link to="/events" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`} className="group border rounded-xl overflow-hidden hover:shadow-lg transition-all bg-white block">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                  {event.price}
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">{event.category}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {event.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {event.description || "Join us for this amazing event!"}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {event.date}
                  </span>
                  <span className="truncate max-w-[120px]">{event.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get involved?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Create an account today to register for events, join clubs, and start your journey.
          </p>
          <Button size="lg" className="px-8 py-6 text-lg rounded-full bg-blue-600 hover:bg-blue-700" asChild>
            <Link to="/register">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
