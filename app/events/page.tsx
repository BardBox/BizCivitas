
import type { Metadata } from "next";
import EventsPageClient from "./EventsPageClient";

export const metadata: Metadata = {
  title: "Events - BizCivitas | Business Networking Events",
  description: "Discover upcoming and past business networking events at BizCivitas. Join our exclusive events to connect with industry leaders and grow your professional network.",
  keywords: ["business events", "networking events", "professional development", "corporate events", "entrepreneur meetups", "business conferences"],
  openGraph: {
    title: "Events - BizCivitas | Business Networking Events",
    description: "Discover upcoming and past business networking events at BizCivitas. Join our exclusive events to connect with industry leaders.",
    type: "website",
    url: "https://bizcivitas.com/events",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events - BizCivitas | Business Networking Events",
    description: "Discover upcoming and past business networking events at BizCivitas.",
  },
};

// Mock data - replace with actual database calls
const mockEvents = [
  {
    id: 1,
    slug: "quarterly-business-summit-2024",
    event_name: "Quarterly Business Summit 2024",
    date: "2024-03-15",
    location: "Grand Convention Center, NYC",
    description: "Join industry leaders for our quarterly business summit featuring keynote speakers, networking sessions, and strategic discussions about the future of business.",
    cover_url: "https://via.placeholder.com/480x260?text=Business+Summit",
    type: "upcoming"
  },
  {
    id: 2,
    slug: "entrepreneur-networking-breakfast",
    event_name: "Entrepreneur Networking Breakfast",
    date: "2024-02-28",
    location: "Downtown Business Club",
    description: "Start your day with fellow entrepreneurs over breakfast. Share insights, discuss challenges, and build meaningful connections.",
    cover_url: "https://via.placeholder.com/480x260?text=Networking+Breakfast",
    type: "upcoming"
  },
  {
    id: 3,
    slug: "annual-gala-2023",
    event_name: "Annual Business Gala 2023",
    date: "2023-12-15",
    location: "Metropolitan Hotel Ballroom",
    description: "Our annual gala celebrating business achievements and recognizing outstanding contributions to the business community.",
    cover_url: "https://via.placeholder.com/480x260?text=Annual+Gala",
    type: "past"
  }
];

export default function EventsPage() {
  const upcomingEvents = mockEvents.filter(event => event.type === 'upcoming' || event.type === 'featured');
  const pastEvents = mockEvents.filter(event => event.type === 'past');

  return <EventsPageClient upcomingEvents={upcomingEvents} pastEvents={pastEvents} />;
}
