import { supabase } from './db'


export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  img_url?: string;
  website_link?: string;
  linkedin_link?: string;
  company_logo?: string;
  company_logo_url?: string;
  company_name?: string;
  description?: string;
  leading_in_domain?: string;
  position?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching team members:", error);
    return [];
  }

  return data || [];
}

export async function getTeamMemberBySlug(
  slug: string,
): Promise<TeamMember | null> {
  const { data, error } = await supabase
    .from("teams")
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
  // Clean HTML from description if present
  const cleanDescription = member.description ? 
    member.description.replace(/<[^>]*>/g, '').trim() : '';
  
  // Generate rich description with member details
  const fallbackDescription = `Meet ${member.name}, ${member.designation} at ${member.company_name || 'BizCivitas'}. ${member.leading_in_domain ? `Leading expert in ${member.leading_in_domain}.` : ""} ${member.company_name && member.company_name !== 'BizCivitas' ? `Currently working at ${member.company_name}.` : ''} Connect with our team member and learn about their expertise in business development and professional growth.`;
  
  const description = cleanDescription || fallbackDescription;
  const shortDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  
  // Generate comprehensive keywords
  const keywords = [
    member.name,
    member.designation,
    member.leading_in_domain || "business expert",
    "BizCivitas team",
    "business professional",
    "team member",
    member.company_name || "BizCivitas",
    "business leader",
    "networking professional",
    "business mentor"
  ].filter(Boolean);

  return {
    title: `${member.name} - ${member.designation} | BizCivitas Team`,
    description: shortDescription,
    keywords,
    ogTitle: `${member.name} - ${member.designation} | BizCivitas`,
    ogDescription: shortDescription,
    ogImage: member.img_url || "/og-team.jpg",
    twitterTitle: `${member.name} - ${member.designation} | BizCivitas`,
    twitterDescription: shortDescription,
    twitterImage: member.img_url || "/og-team.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: member.name,
      jobTitle: member.designation,
      description: description,
      image: member.img_url,
      url: `https://bizcivitas.com/team/${member.slug}`,
      worksFor: member.company_name ? {
        "@type": "Organization",
        name: member.company_name,
        logo: member.company_logo || member.company_logo_url,
        url: member.website_link || "https://bizcivitas.com"
      } : {
        "@type": "Organization",
        name: "BizCivitas",
        url: "https://bizcivitas.com"
      },
      sameAs: [
        member.linkedin_link,
        member.website_link
      ].filter(Boolean),
      knowsAbout: member.leading_in_domain
    }
  };
}
