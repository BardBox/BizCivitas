import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMembershipBySlug, MembershipPlan } from "@/lib/memberships";
import { notFound } from "next/navigation";
import {
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

export const metadata: Metadata = {
  title: "Digital Membership | BizCivitas - Your Gateway to Smart Business Growth",
  description: "Join BizCivitas Digital Membership - perfect for emerging entrepreneurs. Access online networking, virtual workshops, business resources, and community support for just ₹6,999.",
  keywords: [
    "digital membership",
    "online networking",
    "virtual business community",
    "entrepreneur membership",
    "affordable business networking",
    "digital business growth",
    "online workshops",
    "business resources",
    "startup community",
    "BizCivitas digital"
  ],
  openGraph: {
    title: "Digital Membership | BizCivitas - Your Gateway to Smart Business Growth",
    description: "Perfect for emerging entrepreneurs. Access online networking, virtual workshops, and business resources.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'}/memberships/digital-membership`,
    images: [
      {
        url: "/digital-1.jpg",
        width: 1200,
        height: 630,
        alt: "BizCivitas Digital Membership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Membership | BizCivitas",
    description: "Perfect for emerging entrepreneurs. Access online networking, virtual workshops, and business resources.",
  },
};

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
    <div className="group relative ">
      <div className="absolute inset-0 transition-all duration-300 rounded-3xl" style={{ backgroundColor: `${colors.primary}08` }}>
      </div>

      <div className="relative bg-white/80 backdrop-blur-sm rounded-t-3xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
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
function StickyBottomCTA({ membership }: { membership: MembershipPlan }) {
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
                ₹{ membership.price.amount.toLocaleString()}
              </div>
              <div className="text-gray-500 text-xs">+ 18% GST</div>
            </div>
            <Link
              href={membership.plans?.[0]?.url || '#'}
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

export default async function DigitalMembershipPage() {
  const membership = getMembershipBySlug('digital-membership');

  if (!membership) {
    notFound();
  }

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
                  href={membership.plans?.[0]?.url || '#'}
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
              href={membership.plans?.[0]?.url || '#'}
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
              href={membership.plans?.[0]?.url || '#'}
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

      <StickyBottomCTA membership={membership} />
    </>
  );
}
