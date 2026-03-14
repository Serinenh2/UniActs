const API_BASE = "http://127.0.0.1:8000/api";

// --- Events ---
export async function getEvents() {
  try {
    const res = await fetch(`${API_BASE}/events/`);
    if (!res.ok) throw new Error("Failed to fetch events");
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.map((e) => {
        let imageUrl = e.image || "";
        if (imageUrl && imageUrl.startsWith("/")) {
          imageUrl = `http://127.0.0.1:8000${imageUrl}`;
        }
        return {
          ...e,
          image: imageUrl,
          price: e.price ?? "Free",
          organizer: e.organizer || "UniActs",
          attendees: e.attendees ?? 0,
          capacity: e.capacity ?? 100,
          tags: e.tags ?? [],
          description: e.description || "",
          category: e.category || "General",
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function getEvent(id) {
  try {
    const res = await fetch(`${API_BASE}/events/${id}/`);
    if (!res.ok) return null;
    const data = await res.json();
    let imageUrl = data.image || "";
    if (imageUrl && imageUrl.startsWith("/")) {
      imageUrl = `http://127.0.0.1:8000${imageUrl}`;
    }
    return {
      ...data,
      image: imageUrl,
      price: data.price ?? "Free",
      category: data.category || "General",
    };
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

// --- Clubs ---
export async function getClubs() {
  try {
    const res = await fetch(`${API_BASE}/clubs/`);
    if (!res.ok) throw new Error("Failed to fetch clubs");
    const data = await res.json();
    return data.map((club) => ({
      ...club,
      logo: club.logo && club.logo.startsWith("/")
        ? `http://127.0.0.1:8000${club.logo}`
        : club.logo || "",
    }));
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return [];
  }
}

export async function getClub(id) {
  try {
    const res = await fetch(`${API_BASE}/clubs/${id}/`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching club:", error);
    return null;
  }
}

// --- Rooms ---
export async function getRooms() {
  try {
    const res = await fetch(`${API_BASE}/rooms/`);
    if (!res.ok) throw new Error("Failed to fetch rooms");
    return await res.json();
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

export async function createReservation(reservationData) {
  try {
    const res = await fetch(`${API_BASE}/reservations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create reservation");
    }
    return await res.json();
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
}

// --- Announcements ---
export async function getAnnouncements() {
  try {
    const res = await fetch(`${API_BASE}/announcements/`);
    if (!res.ok) throw new Error("Failed to fetch announcements");
    return await res.json();
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}

// --- Reports ---
export async function getReports() {
  try {
    const res = await fetch(`${API_BASE}/reports/`);
    if (!res.ok) throw new Error("Failed to fetch reports");
    return await res.json();
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
}
