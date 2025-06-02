
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  img_url?: string;
  website_link?: string;
  linkedin_link?: string;
  company_logo?: string;
  company_name?: string;
  description?: string;
  leading_in_domain?: string;
  position?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching team members:", error);
    return [];
  }

  return data || [];
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching team member by slug:", error);
    return null;
  }

  return data;
}

export function getTeamMemberSEOData(member: TeamMember) {
  const fallbackDescription = `Meet ${member.name}, ${member.designation} at BizCivitas. ${member.leading_in_domain ? `Leading expert in ${member.leading_in_domain}.` : ''} Connect with our team member and learn about their expertise.`;
  const description = member.description || fallbackDescription;
  
  return {
    title: `${member.name} - ${member.designation} | BizCivitas Team`,
    description: description,
    keywords: [
      member.name,
      member.designation,
      member.leading_in_domain || 'business expert',
      "BizCivitas team",
      "business professional",
      "team member",
      member.company_name || 'BizCivitas',
      "business leader"
    ],
    ogTitle: `${member.name} - ${member.designation} | BizCivitas`,
    ogDescription: description,
    ogImage: member.img_url || '/og-team.jpg',
    twitterTitle: `${member.name} - ${member.designation} | BizCivitas`,
    twitterDescription: description,
    twitterImage: member.img_url || '/og-team.jpg',
  };
}
