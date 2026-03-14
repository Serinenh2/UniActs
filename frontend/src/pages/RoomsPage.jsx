import React, { useEffect, useState } from 'react';
import { getRooms, createReservation } from '../data/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  // Form State
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [username, setUsername] = useState(""); // Mock user for now

  useEffect(() => {
    loadRooms();
  }, []);

  async function loadRooms() {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      console.error("Failed to load rooms", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReservation() {
    if (!selectedRoom || !date || !timeSlot || !username) {
        toast.error("Please fill in all fields");
        return;
    }

    try {
        await createReservation({
            room_id: selectedRoom.id,
            requester: username,
            date: date,
            time_slot: timeSlot
        });
        toast.success("Reservation request sent successfully!");
        setSelectedRoom(null); // Close dialog
        // Reset form
        setDate("");
        setTimeSlot("");
        setUsername("");
    } catch (error) {
        toast.error(`Reservation failed: ${error.message}`);
    }
  }

  if (loading) return <div className="container mx-auto py-8">Loading rooms...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Room Booking</h1>
      <p className="text-muted-foreground mb-8">Reserve a room for your club activities or study sessions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className={!room.is_available ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex justify-between items-center">
                  <CardTitle>{room.name}</CardTitle>
                  <Badge variant={room.is_available ? "default" : "destructive"}>
                    {room.is_available ? "Available" : "Unavailable"}
                  </Badge>
              </div>
              <CardDescription>Capacity: {room.capacity} people</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button 
                    className="w-full" 
                    disabled={!room.is_available}
                    onClick={() => setSelectedRoom(room)}
                >
                    Book Now
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedRoom} onOpenChange={(open) => !open && setSelectedRoom(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Book {selectedRoom?.name}</DialogTitle>
                <DialogDescription>
                    Enter your details to request a reservation.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">Username</Label>
                    <Input 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="col-span-3" 
                        placeholder="e.g. john_doe"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">Date</Label>
                    <Input 
                        id="date" 
                        type="date"
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        className="col-span-3" 
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">Time Slot</Label>
                    <Input 
                        id="time" 
                        value={timeSlot} 
                        onChange={(e) => setTimeSlot(e.target.value)} 
                        className="col-span-3" 
                        placeholder="e.g. 14:00 - 16:00"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleReservation}>Submit Request</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
