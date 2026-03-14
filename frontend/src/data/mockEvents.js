export const events = [
  {
    id: 1,
    title: "Cyber Security Event",
    date: "March 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Innovation Hub, Security Lab",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    price: "Free",
    organizer: "Cyber Security Club",
    attendees: 150,
    capacity: 200,
    tags: ["Security", "Hacking", "Workshop", "Cyber", "Defense"],
    description: "Dive into the world of ethical hacking and network defense. Learn from industry experts about the latest threats and how to protect against them. Perfect for beginners and advanced students alike."
  },
  {
    id: 2,
    title: "Web Development Event",
    date: "April 02, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Computer Lab 4",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    price: "Free",
    organizer: "Dev Society",
    attendees: 120,
    capacity: 150,
    tags: ["Web", "React", "Frontend", "Backend", "Coding"],
    description: "Master the modern web stack! Join us for a hands-on session building responsive websites using React and Tailwind CSS. Bring your laptop and get ready to code."
  },
  {
    id: 3,
    title: "Faculty of Science Event",
    date: "April 10, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "Science Building, Main Hall",
    category: "Science",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    price: "Free",
    organizer: "Science Faculty",
    attendees: 300,
    capacity: 500,
    tags: ["Science", "Research", "Innovation", "Lab", "Discovery"],
    description: "Explore the latest breakthroughs in scientific research. From biology to physics, witness demonstrations and presentations from our top researchers and students."
  },
  {
    id: 4,
    title: "Hackathon: Code for Good",
    date: "May 20, 2024",
    time: "8:00 AM - 8:00 PM",
    location: "Engineering Block, Lab 3",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&w=1200&q=80",
    price: "Free",
    organizer: "Hack Club",
    attendees: 80,
    capacity: 100,
    tags: ["Coding", "Hackathon", "Social Impact", "Programming", "Teamwork"],
    description: "A 12-hour hackathon focused on building solutions for social good. Form a team, build a project, and pitch your idea to a panel of judges. Prizes for the best projects!"
  },
  {
    id: 4,
    title: "Hackathon: Code for Good",
    date: "May 20, 2024",
    time: "8:00 AM - 8:00 PM",
    location: "Engineering Block, Lab 3",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&w=1200&q=80",
    price: "Free",
    organizer: "Hack Club",
    attendees: 80,
    capacity: 100,
    tags: ["Coding", "Hackathon", "Social Impact", "Programming", "Teamwork"],
    description: "A 12-hour hackathon focused on building solutions for social good. Form a team, build a project, and pitch your idea to a panel of judges. Prizes for the best projects!"
  },
  {
    id: 4,
    title: "Hackathon: Code for Good",
    date: "May 20, 2024",
    time: "8:00 AM - 8:00 PM",
    location: "Engineering Block, Lab 3",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&w=1200&q=80",
    price: "Free",
    organizer: "Hack Club",
    attendees: 80,
    capacity: 100,
    tags: ["Coding", "Hackathon", "Social Impact", "Programming", "Teamwork"],
    description: "A 12-hour hackathon focused on building solutions for social good. Form a team, build a project, and pitch your idea to a panel of judges. Prizes for the best projects!"
  },
];

const API_BASE = "http://127.0.0.1:8000/api";

export async function getEvents() {
  try {
    const res = await fetch(`${API_BASE}/events/`);
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      return data.map((e) => {
        let imageUrl = e.image || "";
        if (imageUrl && imageUrl.startsWith("/")) {
          imageUrl = `http://127.0.0.1:8000${imageUrl}`;
        }
        if (!imageUrl) {
          imageUrl = "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1200&q=80";
        }
        return {
          id: e.id,
          title: e.title,
          date: e.date,
          time: e.time,
          location: e.location,
          category: e.category || "General",
          image: imageUrl,
          price: e.price ?? "Free",
          organizer: e.organizer || "UniActs",
          attendees: e.attendees ?? 0,
          capacity: e.capacity ?? 100,
          tags: e.tags ?? [],
          description: e.description || "",
        };
      });
    }
    return events;
  } catch {
    return events;
  }
}

export async function createEvent(payload) {
  const res = await fetch(`${API_BASE}/events/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateEvent(id, payload) {
  const res = await fetch(`${API_BASE}/events/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/events/${id}/`, {
    method: "DELETE",
  });
  return res.ok;
}
