import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClubs } from '../data/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClubs() {
      try {
        const data = await getClubs();
        setClubs(data);
      } catch (error) {
        console.error("Failed to load clubs", error);
      } finally {
        setLoading(false);
      }
    }
    loadClubs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Student Clubs</h1>
      
      {clubs.length === 0 ? (
        <p className="text-center text-muted-foreground">No clubs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <Card key={club.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{club.name}</CardTitle>
                    <Badge variant="secondary">{club.members_count} Members</Badge>
                </div>
                <CardDescription className="line-clamp-2 mt-2">
                  {club.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <div className="h-32 rounded-md overflow-hidden mb-4 bg-muted flex items-center justify-center">
                    {club.logo ? (
                      <img src={club.logo} alt={`${club.name} logo`} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-muted-foreground text-sm">No Logo</span>
                    )}
                 </div>
                 <p className="text-sm text-muted-foreground">
                    President: <span className="font-medium text-foreground">{club.president || "N/A"}</span>
                 </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/clubs/${club.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
