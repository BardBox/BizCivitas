import { MembershipPlan } from "@/lib/memberships";
import { PhoneIcon, EmailIcon, WebsiteIcon } from "./Icons";
import { Check, Star, Crown, Zap, Users } from "lucide-react";

interface MembershipPurchaseBoxProps {
  membership: MembershipPlan;
}

export default function MembershipPurchaseBox({ membership }: MembershipPurchaseBoxProps) {
  const AnimatedButton = ({ 
    href, 
    children, 
    className = '',
    variant = 'primary'
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary';
  }) => {
    const isPrimary = variant === 'primary';
    
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          group relative overflow-hidden
          inline-flex items-center justify-center 
          w-full py-4 px-6 rounded-2xl 
          font-bold text-base transition-all duration-500 ease-out
          transform hover:scale-[1.02] active:scale-[0.98]
          shadow-lg hover:shadow-2xl
          focus:outline-none focus:ring-4 focus:ring-opacity-50
          ${isPrimary 
            ? 'text-white' 
            : `border-2 text-gray-700 hover:text-white bg-white hover:bg-gray-800`
          }
          ${className}
        `}
        style={isPrimary ? { 
          backgroundColor: membership.color.primary,
          
        } : {
          borderColor: membership.color.primary + '30'
        }}
      >
        {/* Animated background for primary buttons */}
        {isPrimary && (
          <>
            <div 
              className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(45deg, ${membership.color.primary}, ${membership.color.primary}dd, ${membership.color.primary})`
              }}
            />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </>
        )}
        
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <svg 
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </a>
    );
  };

  const PlanCard = ({ plan, index, isRecommended = false }: { 
    plan: any, 
    index: number,
    isRecommended?: boolean 
  }) => {
    const cardIcons = {
      'Registration': Users,
      'Membership': Crown,
      'Meeting': Zap,
      'Community': Star
    };
    
    const getIconForPlan = (title: string) => {
      for (const [key, Icon] of Object.entries(cardIcons)) {
        if (title.includes(key)) return Icon;
      }
      return Users;
    };
    
    const IconComponent = getIconForPlan(plan.title);
    
    return (
      <div 
        className={`
          group relative 
          bg-gradient-to-br from-white via-white to-gray-50
          rounded-3xl border-2 p-8
          transition-all duration-500 ease-out
          hover:shadow-2xl hover:-translate-y-3
          transform-gpu
          flex flex-col
          min-h-[580px]
          w-full
          ${isRecommended ? ' ring-opacity-20 scale-[1.0]' : ''}
        `}
        style={{
          borderColor: isRecommended ? membership.color.primary : membership.color.primary + '30',
          
        }}
      >
        {/* Recommended Badge
        {isRecommended && (
          <div 
            className="absolute w -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg z-10"
            style={{ backgroundColor: membership.color.primary }}
          >
            ⭐ Recommended
          </div>
        )} */}

        {/* Decorative elements */}
        {/* <div 
          className="absolute -top-6 -right-6 w-24 h-24 opacity-5 transform rotate-12 group-hover:rotate-45 transition-transform duration-700 rounded-2xl"
          style={{ backgroundColor: membership.color.primary }}
        />
         */}
        {/* Plan Icon and Title */}
        <div className="text-center mb-6">
          <div 
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
            style={{ backgroundColor: membership.color.secondary }}
          >
            <IconComponent 
              size={32} 
              style={{ color: membership.color.primary }}
              className="transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300 min-h-[64px] flex items-center justify-center">
            {plan.title}
          </h3>
        </div>

        {/* Price Display */}
        <div className="text-center mb-6">
          <div 
            className="text-3xl font-bold mb-3 transform group-hover:scale-105 transition-transform duration-300"
            style={{ color: membership.color.primary }}
          >
            ₹{plan.price.toLocaleString()}
          </div>
          {plan.breakdown && (
            <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl font-medium min-h-[36px] flex items-center justify-center">
              {plan.breakdown}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="flex-grow mb-8">
          {plan.paragraph && (
            <p className="text-gray-700 text-center leading-relaxed group-hover:text-gray-800 transition-colors duration-300 min-h-[60px] flex items-center justify-center">
              {plan.paragraph}
            </p>
          )}
        </div>

        {/* Key Features */}
        <div className="mb-8 flex-grow">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: membership.color.primary }}
            >
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <span className="font-bold text-gray-900">What's Included</span>
          </div>
          
          <div className="space-y-3 min-h-[140px]">
            {getFeaturesByPlanType(plan.title, membership).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: membership.color.primary }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <span className="text-gray-700 leading-relaxed font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button - Always at bottom */}
        <div className="mt-auto">
          <AnimatedButton href={plan.url}>
            {getButtonText(plan.title)}
          </AnimatedButton>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure Payment Gateway</span>
        </div>
      </div>
    );
  };

  const ContactSection = () => (
    <div 
      className="bg-gradient-to-r from-gray-50 to-white rounded-3xl shadow-xl border-2 p-8 text-center"
      style={{ borderColor: membership.color.primary + '30' }}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Need Assistance?</h3>
        <p className="text-gray-600">Our team is here to help you choose the right plan</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <a 
          href={`tel:${membership.id === 'digital' || membership.id === 'industria' ? '+918160679917' : '+918000023786'}`}
          className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
        >
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: membership.color.secondary }}
          >
            <PhoneIcon size={20} className={`${membership.color.primary }`} />
          </div>
          <span className="font-semibold text-gray-900 text-sm">
            {membership.id === 'digital' || membership.id === 'industria' ? '+91 81606 79917' : '+91 80000 23786'}
          </span>
        </a>
        
        <a 
          href="mailto:info@bizcivitas.com"
          className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
        >
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: membership.color.secondary }}
          >
            <EmailIcon size={20} className={`${membership.color.primary }`} />
          </div>
          <span className="font-semibold text-gray-900 text-sm">info@bizcivitas.com</span>
        </a>
        
        <a 
          href="https://www.bizcivitas.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
        >
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: membership.color.secondary }}
          >
            <WebsiteIcon size={20} className={`${membership.color.primary }`}/>
          </div>
          <span className="font-semibold text-gray-900 text-sm">www.bizcivitas.com</span>
        </a>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-200">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>100% Secure & Trusted Platform</span>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Membership Overview Header */}
      <div 
        className="bg-gradient-to-r from-white via-white to-gray-50 rounded-3xl shadow-2xl border-2 p-8 mb-12 text-center"
        style={{ borderColor: membership.color.primary }}
      >
        {/* Popular Badge */}
        {membership.popularBadge && (
          <div 
            className="inline-block text-white px-8 py-3 rounded-2xl mb-6 font-bold text-sm shadow-lg transform hover:scale-105 transition-transform duration-300"
            style={{ 
              background: `linear-gradient(135deg, ${membership.color.primary}, ${membership.color.primary}dd)`
            }}
          >
            🏆 {membership.popularBadge}
          </div>
        )}

        <h2 className="text-4xl font-bold text-gray-900 mb-4">{membership.name}</h2>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
          {membership.tagline}
        </p>

        {/* Total Investment Highlight */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border mb-8 max-w-md mx-auto">
          <div className="text-sm text-gray-600 mb-2 font-medium">Complete Investment</div>
          <div 
            className="text-4xl font-bold mb-4 tracking-tight"
            style={{ color: membership.color.primary }}
          >
            {membership.price.currency}{membership.price.amount.toLocaleString()}
          </div>
          <div className="text-gray-600">
            {membership.id === 'digital' 
              ? '+ 18% GST' 
              : '+ 18% GST'
            }
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {membership.highlights.slice(0, 4).map((highlight, index) => (
            <div 
              key={index} 
              className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-sm font-medium text-gray-700 leading-tight">
                {highlight}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Plans Section */}
      {membership.plans && membership.plans.length > 0 && (
        <div className="mb-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Payment Plan
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the payment option that works best for your business needs
            </p>
          </div>
          
          {/* Enhanced responsive grid with consistent card sizing */}
          <div className="flex flex-wrap justify-center gap-8 max-w-none">
            {membership.plans.map((plan, index) => (
              <div 
                key={index}
                className="w-full sm:w-[450px] flex-shrink-0"
              >
                <PlanCard 
                  plan={plan} 
                  index={index} 
                  isRecommended={index === 1 && (membership.plans?.length ?? 0) > 2}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact and Support Section */}
      <ContactSection />
    </div>
  );
}

// Enhanced helper functions with better feature mapping
function getFeaturesByPlanType(planTitle: string, membership: MembershipPlan): string[] {
  if (planTitle.includes('Registration')) {
    return [
      'Complete onboarding & orientation',
      'Digital membership credentials',
      'Access to member directory',
      'Welcome kit & resources',
      'Platform access setup'
    ];
  } else if (planTitle.includes('Membership')) {
    return [
      'Full access to all events & meetings',
      'Annual networking retreats & trips',
      'Expert-led workshops & masterclasses',
      'Business collaboration opportunities',
      'Premium member benefits'
    ];
  } else if (planTitle.includes('Meeting') || planTitle.includes('Event')) {
    return [
      'Monthly structured meetings',
      'Industry expert sessions',
      'Referral & collaboration opportunities',
      'Networking dinner events',
      'Business development activities'
    ];
  } else if (planTitle.includes('Community Launch')) {
    return [
      'Launch your regional chapter',
      '2-year leadership opportunity',
      'Brand visibility & recognition',
      'Growth council participation',
      'Revenue sharing opportunities'
    ];
  }
  
  return membership.features.slice(0, 4);
}

function getButtonText(planTitle: string): string {
  if (planTitle.includes('Registration')) {
    return 'Complete Registration Now';
  } else if (planTitle.includes('Membership')) {
    return 'Activate Membership';
  } else if (planTitle.includes('Meeting') || planTitle.includes('Event')) {
    return 'Book Event Access';
  } else if (planTitle.includes('Community Launch')) {
    return 'Launch My Community';
  }
  
  return 'Get Started Today';
}