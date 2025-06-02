
-- Create events table with SEO fields
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  event_name TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  cover_url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('upcoming', 'past', 'featured')),
  
  -- SEO Meta Tags
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[], -- Array of keywords
  
  -- Open Graph Tags
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  
  -- Twitter Card Tags
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);

-- Create index on type and date for filtering
CREATE INDEX IF NOT EXISTS idx_events_type_date ON events(type, date);

-- Sample data with SEO fields
INSERT INTO events (
  slug, event_name, date, location, description, long_description, cover_url, type,
  meta_title, meta_description, meta_keywords,
  og_title, og_description, og_image,
  twitter_title, twitter_description, twitter_image
) VALUES (
  'quarterly-business-summit-2024',
  'Quarterly Business Summit 2024',
  '2024-03-15',
  'Grand Convention Center, NYC',
  'Join industry leaders for our quarterly business summit featuring keynote speakers, networking sessions, and strategic discussions about the future of business.',
  'Our Quarterly Business Summit brings together the most innovative minds in business for a day of learning, networking, and strategic planning. This premier event features keynote speeches from industry titans, interactive workshops, and unparalleled networking opportunities.',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=480&h=260&fit=crop',
  'upcoming',
  'Quarterly Business Summit 2024 - Premier Networking Event | BizCivitas',
  'Join industry leaders at the Quarterly Business Summit 2024 in NYC. Network with top executives, attend keynote sessions, and discover new business opportunities.',
  ARRAY['business summit', 'networking event', 'keynote speakers', 'NYC business', 'quarterly summit', 'BizCivitas'],
  'Quarterly Business Summit 2024 | BizCivitas',
  'The premier business networking event in NYC featuring industry leaders and strategic discussions.',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=630&fit=crop',
  'Business Summit 2024 - BizCivitas',
  'Join industry leaders for networking and strategic business discussions in NYC.',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=630&fit=crop'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (
  slug, event_name, date, location, description, long_description, cover_url, type,
  meta_title, meta_description, meta_keywords,
  og_title, og_description, og_image,
  twitter_title, twitter_description, twitter_image
) VALUES (
  'entrepreneur-networking-breakfast',
  'Entrepreneur Networking Breakfast',
  '2024-02-20',
  'Downtown Business Hub, San Francisco',
  'Start your day with fellow entrepreneurs over breakfast and meaningful conversations about business growth and innovation.',
  'Join us for an intimate networking breakfast where entrepreneurs share insights, challenges, and opportunities in a relaxed setting. Perfect for early-stage startups and seasoned business owners alike.',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=480&h=260&fit=crop',
  'upcoming',
  'Entrepreneur Networking Breakfast SF - Early Morning Business Networking | BizCivitas',
  'Start your day with fellow entrepreneurs in San Francisco. Join our networking breakfast for meaningful business conversations and growth opportunities.',
  ARRAY['entrepreneur breakfast', 'SF networking', 'startup networking', 'business breakfast', 'entrepreneur meetup', 'BizCivitas'],
  'Entrepreneur Networking Breakfast | BizCivitas SF',
  'Early morning networking for entrepreneurs and startup founders in San Francisco.',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=630&fit=crop',
  'Entrepreneur Breakfast - BizCivitas SF',
  'Network with fellow entrepreneurs over breakfast in San Francisco.',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=630&fit=crop'
) ON CONFLICT (slug) DO NOTHING;
