import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.');
}

const supabase = createClient(
  supabaseUrl || 'placeholder-url', 
  supabaseKey || 'placeholder-key'
);

export interface Event {
  id: string; // UUID in your schema
  slug: string;
  event_name: string;
  date: string;
  location?: string;
  description?: string;
  cover_url?: string;
  type: string; // This matches the enum in your database
  image_urls?: string | string[]; // Can be text or array depending on database response
  youtube_links?: string | string[]; // Can be text or array depending on database response
  created_at?: string;
  updated_at?: string;
}

export async function getAllEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data || [];
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching event by slug:", error);
    return null;
  }

  return data;
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("date", today)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }

  return data || [];
}

export async function getPastEvents(): Promise<Event[]> {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .lt("date", today)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching past events:", error);
    return [];
  }

  return data || [];
}

// SEO helper functions with enhanced dynamic data from database
export function getEventSEOData(event: Event) {
  // Extract clean text from description if it contains HTML
  const cleanDescription = event.description ? 
    event.description.replace(/<[^>]*>/g, '').trim() : '';
  
  // Generate rich description with event details
  const fallbackDescription = `Join us for ${event.event_name}${event.location ? ` at ${event.location}` : ''}${event.date ? ` on ${new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` : ''}. ${event.type ? `This ${event.type.toLowerCase()} event` : 'This event'} brings together business professionals for networking and growth opportunities.`;
  
  const description = cleanDescription || fallbackDescription;
  const shortDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  
  // Generate comprehensive keywords from event data
  const keywords = [
    event.event_name,
    event.type || "business event",
    "networking",
    "BizCivitas",
    event.location || "business networking",
    "professional development",
    "business community",
    new Date(event.date).getFullYear().toString(),
    new Date(event.date).toLocaleDateString('en-US', { month: 'long' }),
  ].filter(Boolean);

  return {
    title: `${event.event_name} | BizCivitas Events`,
    description: shortDescription,
    keywords,
    ogTitle: `${event.event_name} | BizCivitas Events`,
    ogDescription: shortDescription,
    ogImage: event.cover_url || "/og-events.jpg",
    twitterTitle: `${event.event_name} | BizCivitas`,
    twitterDescription: shortDescription,
    twitterImage: event.cover_url || "/og-events.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.event_name,
      description: description,
      startDate: event.date,
      location: event.location ? {
        "@type": "Place",
        name: event.location
      } : undefined,
      organizer: {
        "@type": "Organization",
        name: "BizCivitas",
        url: "https://bizcivitas.com"
      },
      image: event.cover_url,
      url: `https://bizcivitas.com/events/${event.slug}`,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode"
    }
  };
}
