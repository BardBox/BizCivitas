
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export interface Event {
  id: number;
  slug: string;
  event_name: string;
  date: string;
  location: string;
  description: string;
  cover_url: string;
  type: 'upcoming' | 'past' | 'featured';
  long_description?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
}

export async function getAllEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });
  
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  
  return data || [];
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching event by slug:', error);
    return null;
  }
  
  return data;
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .in('type', ['upcoming', 'featured'])
    .order('date', { ascending: true });
  
  if (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
  
  return data || [];
}

export async function getPastEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('type', 'past')
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching past events:', error);
    return [];
  }
  
  return data || [];
}

// SEO helper functions
export function getEventSEOData(event: Event) {
  return {
    title: event.meta_title || `${event.event_name} | BizCivitas Events`,
    description: event.meta_description || event.description,
    keywords: event.meta_keywords || [`${event.event_name}`, "business event", "networking", "BizCivitas", event.location],
    ogTitle: event.og_title || event.meta_title || `${event.event_name} | BizCivitas`,
    ogDescription: event.og_description || event.meta_description || event.description,
    ogImage: event.og_image || event.cover_url,
    twitterTitle: event.twitter_title || event.meta_title || `${event.event_name} | BizCivitas`,
    twitterDescription: event.twitter_description || event.meta_description || event.description,
    twitterImage: event.twitter_image || event.og_image || event.cover_url,
  };
}
