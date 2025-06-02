import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export interface Event {
  id: string; // UUID in your schema
  slug: string;
  event_name: string;
  date: string;
  location?: string;
  description?: string;
  cover_url?: string;
  type: "upcoming" | "past" | "featured";
  image_urls?: string | string[]; // Your schema has this field
  youtube_links?: string | string[]; // Your schema has this field
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
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .in("type", ["upcoming", "featured"])
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }

  return data || [];
}

export async function getPastEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("type", "past")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching past events:", error);
    return [];
  }

  return data || [];
}

// SEO helper functions - simplified since your schema doesn't have dedicated SEO fields
export function getEventSEOData(event: Event) {
  return {
    title: `${event.event_name} | BizCivitas Events`,
    description:
      event.description ||
      `Join us for ${event.event_name} at ${event.location || "our venue"}.`,
    keywords: [
      event.event_name,
      "business event",
      "networking",
      "BizCivitas",
      event.location || "business networking",
    ],
    ogTitle: `${event.event_name} | BizCivitas`,
    ogDescription:
      event.description ||
      `Join us for ${event.event_name} at ${event.location || "our venue"}.`,
    ogImage: event.cover_url || "/og-events.jpg",
    twitterTitle: `${event.event_name} | BizCivitas`,
    twitterDescription:
      event.description ||
      `Join us for ${event.event_name} at ${event.location || "our venue"}.`,
    twitterImage: event.cover_url || "/og-events.jpg",
  };
}
