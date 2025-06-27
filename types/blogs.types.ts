export interface Blog {
  id: string;
  slug: string;
  topic_name: string;
  description: string;
  content: string;
  cover_url: string;
  author_name: string;
  date: string;
  type_of_topic: string;
  created_at: string;
  updated_at?: string;
}


export interface Paragraph {
  title: string;
  contentTop : string;
  contentBottom: string;
  imageUrl_1 : string;
  imageUrl_2 : string;
  listItems: string[];
  listItemIcon : string;
} 