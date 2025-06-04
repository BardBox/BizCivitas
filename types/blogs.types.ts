export interface Blog {
  id: string;
  topic_name: string;
  description: string;
  content: string;
  cover_url: string;
  author_name: string;
  date: string;
  type_of_topic: string;
  slug: string;
  created_at: string;
  updated_at?: string;
}