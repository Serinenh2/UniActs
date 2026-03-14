import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Share2, Heart, ArrowLeft, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getEvents } from '@/data/mockEvents';

export function EventDetailsPage() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const event = events.find(e => e.id == id);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getEvents();
      if (mounted) setEvents(data);
    })();
    return () => { mounted = false; };
  }, []);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Event not found</h1>
        <p className="text-muted-foreground mb-8">The event you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/events">Back to Events</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link to="/events" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-lg">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="text-sm px-3 py-1">{event.category}</Badge>
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="prose max-w-none dark:prose-invert">
              <h3 className="text-xl font-semibold mb-3">About this Event</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">What to Expect</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Keynote speeches from industry veterans</li>
                <li>Hands-on workshops</li>
                <li>Networking sessions with refreshments</li>
                <li>Exclusive swag for early registrants</li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">#{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
           

            <Button size="lg" className="w-full mb-3 text-lg font-semibold">
              Register Now
            </Button>
            <Button variant="outline" className="w-full mb-6">
              <Heart className="mr-2 h-4 w-4" /> Save for Later
            </Button>

            <div className="space-y-4 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Organizer</span>
                <span className="font-medium">{event.organizer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Attendees</span>
                <span className="font-medium">{event.attendees} / {event.capacity}</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full" 
                  style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {event.capacity - event.attendees} spots remaining
              </p>
            </div>

            <div className="mt-6 pt-4 border-t flex justify-center">
               <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                 <Share2 className="mr-2 h-4 w-4" /> Share Event
               </Button>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm">
             <h3 className="font-semibold mb-4">Organizer</h3>
             <div className="flex items-center gap-3 mb-3">
               <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                 <User className="h-5 w-5" />
               </div>
               <div>
                 <div className="font-medium">{event.organizer}</div>
                 <div className="text-xs text-muted-foreground">Verified Club</div>
               </div>
             </div>
             <Button variant="link" className="px-0 text-primary">View Club Profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
