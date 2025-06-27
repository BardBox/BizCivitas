'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { getMembershipBySlug } from '@/lib/memberships';
import { MembershipPaymentButton } from "@/components/PaymentButton";
import { Users, Globe, BookOpen, MessageSquare, Zap, Crown, Star, Building, CheckCircle } from "lucide-react";
import { notFound } from 'next/navigation';

interface PaymentPageContentProps {
  slug: string;
}

function PaymentPageContent({ slug }: PaymentPageContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [membership, setMembership] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => {
    const membershipData = getMembershipBySlug(slug);
    if (!membershipData) {
      notFound();
    }
    setMembership(membershipData);

    // Get plan from URL parameter
    const planIndex = searchParams.get('plan');
    if (planIndex && membershipData.plans) {
      const plan = membershipData.plans[parseInt(planIndex)];
      setSelectedPlan(plan);
    } else if (membershipData.plans && membershipData.plans.length > 0) {
      // Default to first plan if no plan specified
      setSelectedPlan(membershipData.plans[0]);
    }
  }, [slug, searchParams]);

  // Extract UTM parameters
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  const utmCampaign = searchParams.get('utm_campaign');

  // Create UTM data object to pass to payment button
  const utmData = {
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign
  };

  if (!membership) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Plan type icons
  const planIcons: Record<string, any> = {
    'Registration': Users,
    'Membership': Crown,
    'Meeting': Zap,
    'Community': Star,
    'Launch': Building
  };

  const getPlanIcon = (title: string) => {
    for (const [key, Icon] of Object.entries(planIcons)) {
      if (title.includes(key)) return Icon;
    }
    return Users;
  };

  const PlanIcon = selectedPlan ? getPlanIcon(selectedPlan.title) : Users;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <PlanIcon className="w-4 h-4" />
              {membership.popularBadge || 'Professional Choice'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {membership.name}
              <span className="text-blue-600">{' '}Payment</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {membership.tagline}
            </p>
          </div>

          {/* Plan Selection (if multiple plans) */}
          {membership.plans && membership.plans.length > 1 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Payment Plan</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {membership.plans.map((plan: any, index: number) => {
                  const PlanIconComponent = getPlanIcon(plan.title);
                  const isSelected = selectedPlan?.title === plan.title;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          isSelected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
                        }`}>
                          <PlanIconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">{plan.title}</h3>
                      </div>
                      <div className="mb-3">
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{plan.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">{plan.breakdown}</div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{plan.paragraph}</p>
                      {isSelected && (
                        <div className="mt-3 flex items-center text-sm font-medium text-blue-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Selected
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Main Payment Card */}
          {selectedPlan && (
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-center">
                <div className="text-blue-100 text-lg font-medium mb-2">{selectedPlan.title}</div>
                <div className="text-5xl font-black text-white mb-2">₹{selectedPlan.price.toLocaleString()}</div>
                <div className="text-blue-100 text-sm">{selectedPlan.breakdown}</div>
              </div>

              <div className="p-8 md:p-12">
                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {membership.features.slice(0, 4).map((feature: string, index: number) => {
                    const featureIcons = [Users, Globe, BookOpen, MessageSquare];
                    const IconComponent = featureIcons[index % featureIcons.length];
                    const iconColors = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-orange-600'];
                    const bgColors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-orange-100'];
                    
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-10 h-10 ${bgColors[index % bgColors.length]} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-5 h-5 ${iconColors[index % iconColors.length]}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {feature.split(':')[0] || `Feature ${index + 1}`}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {feature.split(':')[1] || feature}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Benefits Summary */}
                <div className="mb-8 p-6 rounded-2xl bg-blue-50">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">What You Get:</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {membership.benefits.slice(0, 4).map((benefit: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Button */}
                <div className="text-center">
                  <MembershipPaymentButton
                    paymentData={{
                      color: membership.color.primary,
                      amount: selectedPlan.price,
                      paidFor: `${membership.name} - ${selectedPlan.title}`,
                      isEvent: false,
                      ...utmData // Spread UTM parameters
                    }}
                    buttonText={`Purchase ${selectedPlan.title}`}
                    size="lg"
                    fullWidth={false}
                    animateIcon={true}
                  />
                  
                  <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Instant Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-8">Join the BizCivitas community and transform your business network</p>
            <div className="flex items-center justify-center gap-8 opacity-60 flex-wrap">
              <div className="text-sm text-gray-500">Trusted by Entrepreneurs</div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-sm text-gray-500">Secure Payment Gateway</div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-sm text-gray-500">Instant Membership Activation</div>
            </div>
          </div>

          {/* Back to Membership Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Membership Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PaymentPageProps {
  params: Promise<{ slug: string }>;
}

export default function PaymentPage({ params }: PaymentPageProps) {
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    params.then(({ slug }) => setSlug(slug));
  }, [params]);

  if (!slug) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentPageContent slug={slug} />
    </Suspense>
  );
}
