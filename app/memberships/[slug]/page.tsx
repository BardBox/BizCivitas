import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMembershipBySlug, getAllMemberships, MembershipPlan } from "@/lib/memberships";
import MembershipPurchaseBox from "@/components/MembershipPurchaseBox";
import { PhoneIcon, EmailIcon, WebsiteIcon } from "@/components/Icons";
import { PageProps, Notes } from "@/types/membership.types";
import { insertCampaign } from "@/lib/campaign";
import {
  Check,
  Globe,
  Users,
  BookOpen,
  Smartphone,
  Briefcase,
  BarChart3,
  Handshake,
  Mail,
  Settings,
  Zap,
  CheckCircle,
  Play,
  ArrowRight
} from "lucide-react";



export async function generateStaticParams() {
  const memberships = getAllMemberships();
  return memberships.map((membership) => ({
    slug: membership.slug,
  }));
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  console.log("Generating metadata for membership slug:", slug);
  const membership = getMembershipBySlug(slug);
  if (!membership) {
    return {
      title: "Membership Not Found - BizCivitas",
      description: "The requested membership plan could not be found.",
    };
  }

  return {
    title: `${membership.name} - BizCivitas`,
    description: membership.description,
    keywords: [`${membership.name}`, "BizCivitas membership", "business networking", "entrepreneur community"],
    openGraph: {
      title: `${membership.name} - BizCivitas`,
      description: membership.description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/memberships/${slug}`,
      images: [
        {
          url: membership.images[0] || "/og-memberships.jpg",
          width: 1200,
          height: 630,
          alt: membership.name,
        },
      ],
    },
  };
}


// Real Digital Membership Features Display
function DigitalMembershipFeatures({ features, colors }: { features: string[]; colors: { primary: string; secondary: string } }) {
  const featureHighlights = [
    { key: 'online', label: 'Online Events', icon: Globe },
    { key: 'directory', label: 'Member Directory', icon: Users },
    { key: 'workshops', label: 'Monthly Workshops', icon: BookOpen }
  ];

  return (
    <div className="grid grid-cols-3 gap-8 text-center">
      {featureHighlights.map((highlight, index) => {
        const IconComponent = highlight.icon;
        return (
          <div key={highlight.key} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex justify-center mb-2">
              <IconComponent size={32} className="text-white" />
            </div>
            <div className="text-white/90 text-sm font-medium">{highlight.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// Premium Feature Card with Icon
function PremiumFeatureCard({ feature, index, colors }: { feature: string; index: number; colors: { primary: string; secondary: string } }) {
  const icons = [Globe, Smartphone, Briefcase, BarChart3, Handshake, Mail, Settings, Zap];

  const IconComponent = icons[index % icons.length];

  return (
    <div className="group relative">
      <div className="absolute inset-0 transition-all duration-300 rounded-3xl" style={{ backgroundColor: `${colors.primary}08` }}>
      </div>

      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
        <div className="absolute top-4 right-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: colors.primary }}>
            <IconComponent size={24} className="text-white" />
          </div>
        </div>

        <div className="pr-20">
          <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: colors.primary }}></div>
          <p className="text-gray-800 font-medium leading-relaxed text-lg">{feature}</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: colors.primary }}></div>
      </div>
    </div>
  );
}

// Flat Green Benefit Card
function GlassBenefitCard({ title, description, IconComponent, colors }: { title: string; description: string; IconComponent: any; colors: { primary: string; secondary: string } }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 rounded-3xl blur-xl group-hover:transition-all duration-500" style={{ backgroundColor: `${colors.secondary}/80` }}>
      </div>

      <div className="relative bg-white/80 backdrop-blur-lg rounded-b-3xl p-8 border shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2" style={{ borderColor: `${colors.secondary}` }}>
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-2xl backdrop-blur-sm flex items-center justify-center border shadow-lg" style={{ backgroundColor: colors.secondary, borderColor: `${colors.secondary}` }}>
            <IconComponent size={24} style={{ color: colors.primary }} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">{title}</h3>
            <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors">{description}</p>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: colors.primary }}>
        </div>
      </div>
    </div>
  );
}

// Sticky Bottom CTA - Flat Green
function StickyBottomCTA({ membership, paymentUrl }: { membership: MembershipPlan, paymentUrl?: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-2xl border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="hidden md:block">
            <div className="font-bold text-gray-800 text-lg">Ready to Start Your Digital Journey?</div>
            <div className="text-gray-600 text-sm">{membership.tagline}</div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-3xl font-black" style={{ color: membership.color.primary }}>
                ₹{membership.plans?.[0]?.price.toLocaleString() || membership.price.amount.toLocaleString()}
              </div>
              <div className="text-gray-500 text-xs">+ 18% GST</div>
            </div>
            <Link
              href={paymentUrl || membership.plans?.[0]?.url || '#'}
              className="text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: membership.color.primary }}
            >
              {membership.ctaText} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface N {
  notes?: Notes;
}


function DigitalMembershipPage({notes} : N) {
  const membership = getMembershipBySlug('digital-membership');
  console.log('Hello ', notes)
  if (!membership) {
    notFound();
  }

  // Create UTM parameter string for payment URL
  const utmParams = new URLSearchParams();
  if (notes?.utm_source) utmParams.set('utm_source', notes.utm_source.toString());
  if (notes?.utm_medium) utmParams.set('utm_medium', notes.utm_medium.toString());
  if (notes?.utm_campaign) utmParams.set('utm_campaign', notes.utm_campaign.toString());
  
  const paymentUrl = `/memberships/digital-membership/payment${utmParams.toString() ? `?${utmParams.toString()}` : ''}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": membership.name,
    "description": membership.tagline,
    "offers": {
      "@type": "Offer",
      "price": membership.price.amount,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "BizCivitas",
      "url": "https://bizcivitas.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section - Using m  embership colors */}
      <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: membership.color.primary }}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full "></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: `${membership.color.primary}40` }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: `${membership.color.primary}30`, animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 flex items-center min-h-screen">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: membership.color.secondary }}></div>
                <span className="text-white/90 text-sm font-medium">Perfect for Emerging Entrepreneurs</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Digital
                <span className="block" style={{ color: membership.color.secondary }}>
                  Membership
                </span>
              </h1>

              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
                {membership.tagline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href={paymentUrl}
                  className="text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-center"
                  style={{ backgroundColor: membership.color.secondary, color: membership.color.primary }}
                >
                  Start Your Journey →
                </Link>
              </div>

              <DigitalMembershipFeatures features={membership.features} colors={membership.color} />
            </div>

            {/* Right Column - Visual Element with Real Features */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">

                <Image
                  src={membership.images[0] || "/placeholder-membership.jpg"}
                  alt={membership.name}
                  width={800}
                  height={800}

                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Flat Green Theme */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-800 mb-6">
              Everything You Need to
              <span className="block" style={{ color: membership.color.primary }}>
                Scale Your Business
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get access to premium networking tools, exclusive workshops, and a thriving community of entrepreneurs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {membership.features.map((feature, index) => (
              <PremiumFeatureCard key={index} feature={feature} index={index} colors={membership.color} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Using membership colors */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: membership.color.secondary }}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${membership.color.primary}20` }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${membership.color.primary}20` }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-800 mb-6">
              Why Choose
              <span className="block" style={{ color: membership.color.primary }}>
                Digital Membership?
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {membership.benefits.map((benefit, index) => {
              const benefitIcons = [Handshake, BookOpen, Zap, ArrowRight, CheckCircle];
              const IconComponent = benefitIcons[index % benefitIcons.length];

              return (
                <GlassBenefitCard
                  key={index}
                  title={benefit}
                  description={membership.features[index] || benefit}
                  IconComponent={IconComponent}
                  colors={membership.color}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section - Modern Design */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-800 mb-6">
              Simple,
              <span style={{ color: membership.color.primary }}>
                Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              One membership, unlimited possibilities
            </p>
          </div>

          <div className="max-w-lg mx-auto mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500" style={{ backgroundColor: membership.color.primary }}></div>

              <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 rounded-full px-6 py-2 mb-6" style={{ backgroundColor: membership.color.secondary }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: membership.color.primary }}></span>
                    <span className="font-semibold text-sm" style={{ color: membership.color.primary }}>Perfect for Emerging Entrepreneurs</span>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{membership.name}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">{membership.description}</p>

                  <div className="mb-8">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-6xl font-black" style={{ color: membership.color.primary }}>
                        ₹{membership.plans?.[0]?.price.toLocaleString() || membership.price.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="font-medium" style={{ color: membership.color.primary }}>{membership.plans?.[0]?.breakdown || '+ 18% GST • One-time payment'}</div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {membership.highlights.slice(0, 3).map((highlight, index) => (
                      <div key={index} className="flex items-center justify-center gap-3 text-sm text-gray-600">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: membership.color.primary }}></div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href={paymentUrl}
              className="inline-flex items-center gap-3 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: membership.color.primary }}
            >
              <span>Start Your Journey Today</span>
              <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What Happens Section - Flat Green Theme */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              What Happens When
              <span className="block" style={{ color: membership.color.secondary }}>
                You Join Today?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: membership.color.primary }}>
                <Zap size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant Digital Access</h3>
              <p className="text-gray-300 leading-relaxed">
                Get immediate access to digital business directory and member connections
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: membership.color.primary, opacity: 0.8 }}>
                <BookOpen size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Business Resources</h3>
              <p className="text-gray-300 leading-relaxed">
                Access business growth resources, templates, and community forum for peer learning
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: membership.color.primary, opacity: 0.6 }}>
                <Globe size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Online Networking</h3>
              <p className="text-gray-300 leading-relaxed">
                Join exclusive online networking events and monthly virtual workshops
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Use membership colors */}
      <section className="py-20 text-white text-center relative overflow-hidden" style={{ backgroundColor: membership.color.primary }}>
        <div className="relative max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            {membership.tagline} - Join the BizCivitas Digital Membership and start your journey today
          </p>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-12 border border-white/20 max-w-md mx-auto">
            <div className="text-5xl font-black mb-2">₹{membership.plans?.[0]?.price.toLocaleString() || membership.price.amount.toLocaleString()}</div>
            <div className="opacity-75 mb-6">{membership.plans?.[0]?.breakdown || '+ 18% GST • One-time payment'}</div>
            <Link
              href={paymentUrl}
              className="block bg-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              style={{ color: membership.color.primary }}
            >
              {membership.ctaText}
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm opacity-75">
            {membership.highlights.slice(0, 3).map((highlight, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StickyBottomCTA membership={membership} paymentUrl={paymentUrl} />
    </>
  );
}



export default async function MembershipPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const s = await searchParams;
  console.log(s);
  const utm_source = (await searchParams)?.utm_source;
  const utm_medium = (await searchParams)?.utm_medium;
  const utm_campaign = (await searchParams)?.utm_campaign;

  let notes: Notes | undefined = {
    utm_campaign :'',
    utm_source :'',
    utm_medium :'',
  };

  if (utm_campaign?.length && utm_medium && utm_source) {
    notes = {
      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_campaign: utm_campaign,
    };

    // Track campaign with rate limiting (only for digital membership)
    if (slug === 'digital-membership') {
      try {
        const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/memberships/${slug}`;
        const campaignResult = await insertCampaign(notes);
        
        if (campaignResult.success) {
          console.log('Campaign tracked successfully');
        } else {
          console.log('Campaign tracking skipped:', campaignResult.error);
        }
      } catch (error) {
        console.error('Error tracking campaign:', error);
        // Don't block page render if campaign tracking fails
      }
    }
  }
  else{
    console.log("No UTM parameters found in search params");
  }
  console.log(utm_source, utm_medium, utm_campaign);
  const membership = getMembershipBySlug(slug);

  if (!membership) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: membership.name,
    description: membership.description,
    offers: {
      "@type": "Offer",
      price: membership.price.amount,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Organization",
      name: "BizCivitas",
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com',
      sameAs: [
        "https://www.youtube.com/@BizCivitas",
        "https://www.linkedin.com/company/bizcivitas/",
        "https://www.facebook.com/bizcivitas/",
        "https://www.instagram.com/bizcivitas/"
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {
        membership.id === 'digital' ? (
          <DigitalMembershipPage notes={notes} />
        ) : (

          <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section
              className="relative py-20 bg-gradient-to-r text-white"
              style={{ background: `linear-gradient(135deg, ${membership.color.primary}, ${membership.color.primary}dd)` }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  <div className="lg:w-1/2">
                    <div className="mb-4">
                      <Link
                        href="/memberships"
                        className="text-white/80 hover:text-white inline-flex items-center transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Memberships
                      </Link>
                    </div>
                    <h1 className="text-5xl font-bold mb-4">{membership.name}</h1>
                    <p className="text-2xl text-white/90 mb-6">{membership.tagline}</p>
                    <p className="text-lg text-white/80 mb-8">{membership.description}</p>
                    <div className="flex items-center gap-6">

                    </div>

                    {/* Contact Info for all memberships */}
                    <div className="mt-6 space-y-2 text-white/90">
                      <p className="flex items-center">
                        <PhoneIcon className="mr-2" size={18} />
                        {membership.id === 'digital' || membership.id === 'industria' ? '+91 81606 79917' : '+91 80000 23786'}
                      </p>
                      <p className="flex items-center">
                        <EmailIcon className="mr-2" size={18} />
                        info@bizcivitas.com
                      </p>
                      <p className="flex items-center">
                        <WebsiteIcon className="mr-2" size={18} />
                        www.bizcivitas.com
                      </p>
                      {membership.id === 'digital' && (
                        <div className="mt-4">
                          <p className="text-white/80 mb-2">Follow us:</p>
                          <p className="text-white/90">Instagram | LinkedIn | Facebook | YouTube</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="relative">
                      <Image
                        src={membership.images[0] || "/placeholder-membership.jpg"}
                        alt={membership.name}
                        width={600}
                        height={400}
                        className="rounded-2xl shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12">
                  {/* Main Content */}
                  <div className="w-full">
                    {/* Key Benefits */}
                    {/* Enhanced Benefits Grid Section */}
                    <div className="mb-16">
                      <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Membership Overview</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                          Discover all the benefits, features, and opportunities that come with your {membership.name} membership
                        </p>
                      </div>

                      <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Key Benefits Card */}
                        <div className="bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl border-2 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full"
                          style={{ borderColor: membership.color.primary + '20' }}>
                          <div className="flex items-center mb-8">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-md"
                              style={{ backgroundColor: membership.color.secondary }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                style={{ color: membership.color.primary }}>
                                <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
                                <path d="m21 2-9.6 9.6" />
                                <circle cx="7.5" cy="15.5" r="5.5" />
                              </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">Key Benefits</h3>
                          </div>
                          <ul className="space-y-4">
                            {membership.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start group hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                                <div className="w-7 h-7 rounded-full mr-4 flex items-center justify-center mt-0.5 shadow-sm group-hover:scale-110 transition-transform duration-300"
                                  style={{ backgroundColor: membership.color.primary }}>
                                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                                <span className="text-gray-700 text-lg leading-relaxed font-medium">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Why Choose Card */}
                        <div className="bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl border-2 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full"
                          style={{ borderColor: membership.color.primary + '20' }}>
                          <div className="flex items-center mb-8">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-md"
                              style={{ backgroundColor: membership.color.secondary }}>
                              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
                                style={{ color: membership.color.primary }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">Why Choose {membership.name}?</h3>
                          </div>
                          <div className="space-y-4">
                            {membership.highlights.map((highlight, index) => (
                              <div key={index}
                                className="p-5 rounded-2xl border-l-4 hover:shadow-md transition-all duration-300 hover:-translate-x-1"
                                style={{
                                  borderLeftColor: membership.color.primary,
                                  backgroundColor: membership.color.secondary + '40'
                                }}>
                                <p className="text-gray-700 leading-relaxed font-medium">{highlight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Meeting Structure (if exists) */}
                      {membership.meetingStructure && (
                        <div className="mb-12">
                          <div className="bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl border-2 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            style={{ borderColor: membership.color.primary + '20' }}>
                            <div className="flex items-center mb-8">
                              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-md"
                                style={{ backgroundColor: membership.color.secondary }}>
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
                                  style={{ color: membership.color.primary }}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                              </div>
                              <h3 className="text-3xl font-bold text-gray-900">Meeting Structure</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                              {membership.meetingStructure.map((structure, index) => (
                                <div key={index} className="flex items-start group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300">
                                  <div className="w-8 h-8 rounded-full mr-4 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm group-hover:scale-110 transition-transform duration-300"
                                    style={{ backgroundColor: membership.color.primary }}>
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <span className="text-gray-700 leading-relaxed font-medium">{structure}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Features Included */}
                      <div className="bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl border-2 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        style={{ borderColor: membership.color.primary + '20' }}>
                        <div className="flex items-center mb-8">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-md"
                            style={{ backgroundColor: membership.color.secondary }}>
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
                              style={{ color: membership.color.primary }}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <h3 className="text-3xl font-bold text-gray-900">Features Included</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {membership.features.map((feature, index) => (
                            <div key={index} className="flex items-start group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300">
                              <div className="w-7 h-7 rounded-full mr-4 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: membership.color.primary }}>
                                <Check className="w-4 h-4 text-white" strokeWidth={3} />
                              </div>
                              <span className="text-gray-700 leading-relaxed font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Who Should Join (for Industria) */}
                    {membership.eligibility && (
                      <div className="mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Who Should Join?</h3>
                        <ul className="space-y-4">
                          {membership.eligibility.map((requirement, index) => (
                            <li key={index} className="flex items-start">
                              <div
                                className="w-6 h-6 rounded-full mr-3 flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: membership.color.primary }}
                              >
                                <Check className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-gray-700">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Leadership Opportunities (for Industria) */}
                    {membership.id === 'industria' && (
                      <div className="mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Leadership Opportunities</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div
                            className="p-6 rounded-lg border-l-4"
                            style={{
                              borderLeftColor: membership.color.primary,
                              backgroundColor: membership.color.secondary
                            }}
                          >
                            <h4 className="font-semibold text-gray-900 mb-2">Regional Chapter</h4>
                            <p className="text-gray-700">Launch your own regional Bizcivitas chapter</p>
                          </div>
                          <div
                            className="p-6 rounded-lg border-l-4"
                            style={{
                              borderLeftColor: membership.color.primary,
                              backgroundColor: membership.color.secondary
                            }}
                          >
                            <h4 className="font-semibold text-gray-900 mb-2">Growth Council</h4>
                            <p className="text-gray-700">Join the Civitas Growth Council</p>
                          </div>
                          <div
                            className="p-6 rounded-lg border-l-4"
                            style={{
                              borderLeftColor: membership.color.primary,
                              backgroundColor: membership.color.secondary
                            }}
                          >
                            <h4 className="font-semibold text-gray-900 mb-2">Community Growth</h4>
                            <p className="text-gray-700">Earn by leading industrial community growth</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Image Gallery */}
                  </div>

                  {/* Sticky Purchase Box */}
                  <div className="w-full">
                    <div className="lg:sticky lg:top-8">
                      <MembershipPurchaseBox membership={membership} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Special message for Core membership */}
            {membership.id === 'core' && (
              <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Join a tribe of passionate entrepreneurs on a mission
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    To travel, transform, and grow. BizCivitas is where your network becomes your net worth.
                  </p>
                </div>
              </section>
            )}

            {/* Special message for Flagship membership */}
            {membership.id === 'flagship' && (
              <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Ready to grow with purpose?
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    BizCivitas is ideal for growth-oriented entrepreneurs and professionals who value trust-based networking, fresh perspectives, and opportunities that go beyond borders.
                  </p>
                </div>
              </section>
            )}

            {/* Special message for Digital membership */}
            {membership.id === 'digital' && (
              <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Start small. Grow big. Stay connected.
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    Apply now or book a discovery call to begin your journey in the Bizcivitas ecosystem.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="tel:+918160679917"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                    >
                      <PhoneIcon className="mr-2" size={18} />
                      Call +91 81606 79917
                    </a>
                    <a
                      href="mailto:info@bizcivitas.com"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition-colors"
                    >
                      <EmailIcon className="mr-2" size={18} />
                      Email Us
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* Special message for Industria membership */}
            {membership.id === 'industria' && (
              <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Apply now or schedule a discovery call
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    Join an exclusive network of industrial leaders and accelerate your business growth.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <a
                      href="tel:+918160679917"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors"
                    >
                      <PhoneIcon className="mr-2" size={18} />
                      Call +91 81606 79917
                    </a>
                    <a
                      href="mailto:info@bizcivitas.com"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-orange-600 text-orange-600 font-semibold hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      <EmailIcon className="mr-2" size={18} />
                      Email Us
                    </a>
                  </div>
                  <div className="text-gray-600">
                    <p className="mb-2 flex items-center justify-center">
                      <WebsiteIcon className="mr-2" size={16} />
                      www.bizcivitas.com
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <span className="text-sm font-medium text-gray-700">Follow us:</span>
                      <a
                        href="https://www.instagram.com/bizcivitas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-600 transition-colors"
                        aria-label="Follow BizCivitas on Instagram"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/bizcivitas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        aria-label="Connect with BizCivitas on LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.facebook.com/bizcivitas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-700 transition-colors"
                        aria-label="Follow BizCivitas on Facebook"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.youtube.com/@bizcivitas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-red-600 transition-colors"
                        aria-label="Subscribe to BizCivitas on YouTube"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* CTA Section */}
            <section
              className="py-16 text-white"
              style={{ background: `linear-gradient(135deg, ${membership.color.primary}, ${membership.color.primary}dd)` }}
            >
              <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-6">Ready to Get Into {membership.name}?</h2>
                <p className="text-xl text-white/90 mb-8">
                  Join our community of successful entrepreneurs and take your business to the next level.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
                    style={{ color: membership.color.primary }}
                  >
                    {membership.ctaText}
                  </button>
                  <Link
                    href="/contact"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    Have Questions?
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}

    </>
  );
}