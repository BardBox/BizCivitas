
<old_str>import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTeamMemberBySlug, getTeamMemberSEOData, getAllTeamMembers } from "@/lib/team";
import { notFound } from "next/navigation";
import { FaLinkedin, FaGlobe } from "react-icons/fa";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Enable ISR with 3600-second (1 hour) revalidation for team members
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    return {
      title: "Team Member Not Found - BizCivitas",
      description: "The requested team member could not be found.",
    };
  }

  const seoData = getTeamMemberSEOData(member);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      type: "profile",
      url: `https://bizcivitas.com/team/${member.slug}`,
      images: [
        {
          url: seoData.ogImage,
          width: 1200,
          height: 630,
          alt: member.name,
        },
      ],
      siteName: "BizCivitas",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.twitterTitle,
      description: seoData.twitterDescription,
      images: [seoData.twitterImage],
    },
    alternates: {
      canonical: `/team/${member.slug}`,
    },
    other: {
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'profile:first_name': member.name.split(' ')[0],
      'profile:last_name': member.name.split(' ').slice(1).join(' '),
      'og:locale': 'en_US',
      'og:site_name': 'BizCivitas',
    },
  };
}

export async function generateStaticParams() {
  const teamMembers = await getAllTeamMembers();
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.designation,
    "description": member.description,
    "image": member.img_url,
    "url": `https://bizcivitas.com/team/${member.slug}`,
    "sameAs": [
      member.website_link,
      member.linkedin_link
    ].filter(Boolean),
    "worksFor": {
      "@type": "Organization",
      "name": member.company_name || "BizCivitas",
      "url": "https://bizcivitas.com"
    },
    "knowsAbout": member.leading_in_domain,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bizcivitas.com/team/${member.slug}`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://bizcivitas.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Team",
          "item": "https://bizcivitas.com/team"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": member.name,
          "item": `https://bizcivitas.com/team/${member.slug}`
        }
      ]
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/team" className="hover:text-blue-600 transition-colors">
                Team
              </Link>
              <span>/</span>
              <span className="text-gray-900">{member.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl">
                  <Image
                    src={member.img_url || '/placeholder-team.jpg'}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                    priority
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {member.name}
                </h1>
                <h2 className="text-2xl text-blue-600 font-semibold mb-6">
                  {member.designation}
                </h2>

                {member.leading_in_domain && (
                  <div className="mb-6">
                    <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      Expert in {member.leading_in_domain}
                    </span>
                  </div>
                )}

                {member.company_name && (
                  <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                    {member.company_logo && (
                      <Image
                        src={member.company_logo}
                        alt={member.company_name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    )}
                    <span className="text-lg text-gray-700 font-medium">
                      {member.company_name}
                    </span>
                  </div>
                )}

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start space-x-4">
                  {member.website_link && (
                    <a
                      href={member.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                      aria-label={`Visit ${member.name}'s website`}
                    >
                      <FaGlobe className="w-6 h-6 text-gray-600" />
                    </a>
                  )}
                  {member.linkedin_link && (
                    <a
                      href={member.linkedin_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                      aria-label={`Connect with ${member.name} on LinkedIn`}
                    >
                      <FaLinkedin className="w-6 h-6 text-blue-600" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        {member.description && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">About {member.name}</h3>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: member.description }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Back to Team */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/team"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Team
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}</old_str>
<new_str>import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTeamMemberBySlug, getTeamMemberSEOData, getAllTeamMembers } from "@/lib/team";
import { notFound } from "next/navigation";
import { FaLinkedin, FaGlobe, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Enable ISR with 3600-second (1 hour) revalidation for team members
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    return {
      title: "Team Member Not Found - BizCivitas",
      description: "The requested team member could not be found.",
    };
  }

  const seoData = getTeamMemberSEOData(member);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      type: "profile",
      url: `https://bizcivitas.com/team/${member.slug}`,
      images: [
        {
          url: seoData.ogImage,
          width: 1200,
          height: 630,
          alt: member.name,
        },
      ],
      siteName: "BizCivitas",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.twitterTitle,
      description: seoData.twitterDescription,
      images: [seoData.twitterImage],
    },
    alternates: {
      canonical: `/team/${member.slug}`,
    },
    other: {
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'profile:first_name': member.name.split(' ')[0],
      'profile:last_name': member.name.split(' ').slice(1).join(' '),
      'og:locale': 'en_US',
      'og:site_name': 'BizCivitas',
    },
  };
}

export async function generateStaticParams() {
  const teamMembers = await getAllTeamMembers();
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.designation,
    "description": member.description,
    "image": member.img_url,
    "url": `https://bizcivitas.com/team/${member.slug}`,
    "sameAs": [
      member.website_link,
      member.linkedin_link
    ].filter(Boolean),
    "worksFor": {
      "@type": "Organization",
      "name": member.company_name || "BizCivitas",
      "url": "https://bizcivitas.com"
    },
    "knowsAbout": member.leading_in_domain,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bizcivitas.com/team/${member.slug}`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://bizcivitas.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Team",
          "item": "https://bizcivitas.com/team"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": member.name,
          "item": `https://bizcivitas.com/team/${member.slug}`
        }
      ]
    }
  };

  return (
    <>
      <style jsx>{`
        .team-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 25px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .team-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          transition: all 0.5s ease;
        }

        .team-card:hover::before {
          animation: shine 0.75s ease-in-out;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .profile-image-container {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto 2rem;
        }

        .profile-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 6px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .profile-image:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .profile-border {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #ff6b6b);
          z-index: -1;
          animation: rotate 3s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .name-title {
          color: white;
          text-align: center;
          margin-bottom: 1rem;
        }

        .name-title h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .name-title h2 {
          font-size: 1.25rem;
          font-weight: 400;
          opacity: 0.9;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          display: inline-block;
        }

        .expertise-badge {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          display: inline-block;
          margin: 1rem 0;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .company-info {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 1rem;
          margin: 1rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .company-logo {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          background: white;
          padding: 0.5rem;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .social-link {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.25rem;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .social-link:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .social-link.linkedin:hover {
          background: #0077b5;
          border-color: #0077b5;
        }

        .social-link.website:hover {
          background: #4285f4;
          border-color: #4285f4;
        }

        .description-section {
          background: white;
          border-radius: 25px;
          padding: 3rem;
          margin: 3rem 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .description-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
        }

        .description-content {
          line-height: 1.8;
          font-size: 1.1rem;
          color: #333;
        }

        .description-content h3 {
          color: #2c3e50;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 1rem;
        }

        .description-content h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        .back-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .back-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
          color: white;
        }

        .breadcrumb {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .breadcrumb a {
          color: #667eea;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .breadcrumb a:hover {
          color: #764ba2;
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .floating-circle:nth-child(1) {
          width: 60px;
          height: 60px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-circle:nth-child(2) {
          width: 40px;
          height: 40px;
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .floating-circle:nth-child(3) {
          width: 80px;
          height: 80px;
          bottom: 20%;
          left: 15%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        @media (max-width: 768px) {
          .team-card {
            margin: 1rem;
            padding: 1.5rem;
          }
          
          .profile-image-container {
            width: 150px;
            height: 150px;
          }
          
          .name-title h1 {
            font-size: 2rem;
          }
          
          .description-section {
            margin: 1rem;
            padding: 2rem;
          }
        }
      `}</style>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="hover:text-purple-600 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/team" className="hover:text-purple-600 transition-colors">
                Team
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{member.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Team Card */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="team-card">
              <div className="floating-elements">
                <div className="floating-circle"></div>
                <div className="floating-circle"></div>
                <div className="floating-circle"></div>
              </div>

              {/* Profile Image */}
              <div className="profile-image-container">
                <div className="profile-border"></div>
                <Image
                  src={member.img_url || '/placeholder-team.jpg'}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="profile-image"
                  priority
                />
              </div>

              {/* Name and Title */}
              <div className="name-title">
                <h1>{member.name}</h1>
                <h2>{member.designation}</h2>
              </div>

              {/* Expertise Badge */}
              {member.leading_in_domain && (
                <div style={{ textAlign: 'center' }}>
                  <div className="expertise-badge">
                    Expert in {member.leading_in_domain}
                  </div>
                </div>
              )}

              {/* Company Info */}
              {member.company_name && (
                <div className="company-info">
                  {member.company_logo && (
                    <Image
                      src={member.company_logo}
                      alt={member.company_name}
                      width={50}
                      height={50}
                      className="company-logo"
                    />
                  )}
                  <span style={{ color: 'white', fontWeight: '600', fontSize: '1.1rem' }}>
                    {member.company_name}
                  </span>
                </div>
              )}

              {/* Social Links */}
              <div className="social-links">
                {member.website_link && (
                  <a
                    href={member.website_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link website"
                    aria-label={`Visit ${member.name}'s website`}
                  >
                    <FaGlobe />
                  </a>
                )}
                {member.linkedin_link && (
                  <a
                    href={member.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link linkedin"
                    aria-label={`Connect with ${member.name} on LinkedIn`}
                  >
                    <FaLinkedin />
                  </a>
                )}
                <a href="#" className="social-link">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        {member.description && (
          <section className="pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="description-section">
                <div className="description-content">
                  <h3>About {member.name}</h3>
                  <div dangerouslySetInnerHTML={{ __html: member.description }} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Back to Team Button */}
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link href="/team" className="back-button">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Team
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}</new_str>
