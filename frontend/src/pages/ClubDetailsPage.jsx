import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClub } from '../data/api';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Users, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

const API_BASE = "http://127.0.0.1:8000/api";

export function ClubDetailsPage() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinStatus, setJoinStatus] = useState(null); // null | 'loading' | 'success' | 'already' | 'error' | 'login'
  const [joinMessage, setJoinMessage] = useState('');

  const handleJoin = async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      setJoinStatus('login');
      setJoinMessage('You must be logged in to join a club.');
      return;
    }
    setJoinStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/clubs/${id}/join/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username }),
      });
      const data = await res.json();
      if (res.status === 201) {
        setJoinStatus('success');
        setJoinMessage('You have successfully joined the club!');
        setClub(prev => prev ? { ...prev, members_count: prev.members_count + 1 } : prev);
      } else if (res.status === 200) {
        setJoinStatus('already');
        setJoinMessage('You are already a member of this club.');
      } else {
        setJoinStatus('error');
        setJoinMessage(data.error || 'Failed to join club.');
      }
    } catch {
      setJoinStatus('error');
      setJoinMessage('Cannot connect to server.');
    }
  };

  useEffect(() => {
    async function loadClub() {
      try {
        const data = await getClub(id);
        setClub(data);
      } catch (error) {
        console.error("Failed to load club", error);
      } finally {
        setLoading(false);
      }
    }
    loadClub();
  }, [id]);

  if (loading) {
    return (
        <div className="container mx-auto py-8 space-y-8">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-64 w-full" />
        </div>
    );
  }

  if (!club) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold">Club not found</h2>
        <Button asChild className="mt-4">
          <Link to="/clubs">Back to Clubs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-4xl font-bold mb-2">{club.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" /> {club.members_count} Members
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> Created {club.created_at}
                    </span>
                </div>
            </div>
            {joinStatus && (
              <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
                joinStatus === 'success' ? 'bg-green-100 text-green-800' :
                joinStatus === 'already' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {joinStatus === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                {joinMessage}
                {joinStatus === 'login' && (
                  <Link to="/login" className="underline font-medium ml-1">Log in</Link>
                )}
              </div>
            )}
            <Button
              size="lg"
              onClick={handleJoin}
              disabled={joinStatus === 'loading' || joinStatus === 'success' || joinStatus === 'already'}
            >
              {joinStatus === 'loading' ? 'Joining…' :
               joinStatus === 'success' ? 'Joined ✓' :
               joinStatus === 'already' ? 'Already a Member' :
               'Join Club'}
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">About</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {club.description}
                </p>
            </div>
            
            {/* Announcements Section (Placeholder for now, could fetch specific announcements later) */}
            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Latest Announcements</h2>
                <p className="text-muted-foreground">No recent announcements.</p>
            </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Club Details</h3>
                <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">President</span>
                        <span className="font-medium">{club.president || "N/A"}</span>
                    </div>
                     <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Budget</span>
                        <span className="font-medium flex items-center"><DollarSign className="h-3 w-3 mr-1"/>{club.budget.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
