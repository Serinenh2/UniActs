import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Target, Heart } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About UniActs</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're on a mission to transform university life by connecting students, clubs, and events in one seamless platform.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-card rounded-xl border shadow-sm">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Community First</h3>
          <p className="text-muted-foreground">Building stronger campus communities through meaningful connections.</p>
        </div>
        <div className="text-center p-6 bg-card rounded-xl border shadow-sm">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Empowering Leaders</h3>
          <p className="text-muted-foreground">Giving student leaders the tools they need to organize successful events.</p>
        </div>
        <div className="text-center p-6 bg-card rounded-xl border shadow-sm">
          <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Passion Driven</h3>
          <p className="text-muted-foreground">Helping students discover and pursue their passions outside the classroom.</p>
        </div>
      </div>

      <div className="prose max-w-none dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          UniActs started as a simple idea in a dorm room: why is it so hard to find out what's happening on campus? 
          We realized that while universities are bustling with activity, students often miss out simply because information 
          is scattered across bulletin boards, social media, and emails.
        </p>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Today, UniActs serves as the digital heartbeat of campus life. We provide a centralized platform where 
          clubs can showcase their activities, and students can discover events that align with their interests.
        </p>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Join the Community</h2>
          <Button size="lg" asChild>
            <Link to="/register">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
