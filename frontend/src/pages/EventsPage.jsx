import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEvents } from '@/data/mockEvents';

export function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getEvents();
      if (mounted) setEvents(data);
    })();
    return () => { mounted = false; };
  }, []);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Events</h1>
          <p className="text-muted-foreground mt-1">Discover what's happening around campus.</p>
        </div>
        
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search events by name or category..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Sort
          </Button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <div className="absolute top-3 left-3">
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-none font-medium text-xs">
                  {event.category}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="h-4 w-4" />
                <span>{event.date} • {event.time}</span>
              </div>
              
              <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {event.title}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">{event.location}</span>
              </div>

              <div className="mt-auto pt-4 border-t flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  By {event.organizer}
                </span>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0 h-auto font-medium" asChild>
                  <Link to={`/events/${event.id}`}>View Details &rarr;</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          <Button variant="link" onClick={() => setSearchTerm('')} className="mt-2">Clear all filters</Button>
        </div>
      )}
    </div>
  );
}
