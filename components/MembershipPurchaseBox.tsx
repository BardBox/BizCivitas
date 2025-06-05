import { MembershipPlan } from "@/lib/memberships";
import { PhoneIcon, EmailIcon, WebsiteIcon } from "./Icons";

interface MembershipPurchaseBoxProps {
  membership: MembershipPlan;
}

export default function MembershipPurchaseBox({ membership }: MembershipPurchaseBoxProps) {
  const AnimatedButton = ({ 
    href, 
    children, 
    className = ''
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          group relative overflow-hidden
          inline-flex items-center justify-center 
          w-full py-4 px-6 rounded-2xl 
          font-bold text-base text-white
          transition-all duration-500 ease-out
          transform hover:scale-[1.02] active:scale-[0.98]
          shadow-lg hover:shadow-2xl
          focus:outline-none focus:ring-4 focus:ring-opacity-50
          ${className}
        `}
        style={{ 
          backgroundColor: membership.color.primary,
        }}
      >
        {/* Animated background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, ${membership.color.primary}, ${membership.color.primary}dd, ${membership.color.primary})`
          }}
        />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Pulse effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 group-hover:animate-pulse"
          style={{ backgroundColor: membership.color.primary }}
        />
        
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

  const PlanCard = ({ plan, index }: { plan: any, index: number }) => (
    <div 
      className={`
        group relative overflow-hidden
        bg-gradient-to-br from-white to-gray-50
        rounded-3xl border-2 p-8
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:-translate-y-2
        transform-gpu
        ${index === 0 ? 'ring-2 ring-opacity-20' : ''}
      `}
      style={{ 
        borderColor: membership.color.primary
      }}
    >
      {/* Decorative background pattern */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 group-hover:rotate-45 transition-transform duration-700"
        style={{ backgroundColor: membership.color.primary }}
      />
      
      {/* Featured badge for first plan */}
      {index === 0 && (
        <div 
          className="absolute -top-3 -right-3 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300"
          style={{ backgroundColor: membership.color.primary }}
        >
          ⭐ Featured
        </div>
      )}

      {/* Plan Icon */}
      <div className="flex items-center justify-center mb-6">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: membership.color.secondary }}
        >
          <div 
            className="w-8 h-8 rounded-lg"
            style={{ backgroundColor: membership.color.primary }}
          />
        </div>
      </div>

      {/* Plan Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-gray-700 transition-colors duration-300">
        {plan.title}
      </h3>

      {/* Price Display */}
      <div className="text-center mb-6">
        <div 
          className="text-4xl font-bold mb-2 transform group-hover:scale-105 transition-transform duration-300"
          style={{ color: membership.color.primary }}
        >
          ₹{plan.price.toLocaleString()}
        </div>
        {plan.breakdown && (
          <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl">
            {plan.breakdown}
          </div>
        )}
      </div>

      {/* Description */}
      {plan.paragraph && (
        <p className="text-gray-700 text-center mb-8 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
          {plan.paragraph}
        </p>
      )}

      {/* Key Features for this plan type */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: membership.color.primary }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900">What's Included</span>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {getFeaturesByPlanType(plan.title, membership).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: membership.color.primary }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <span className="text-gray-700 leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <AnimatedButton href={plan.url}>
        {getButtonText(plan.title)}
      </AnimatedButton>

      {/* Security badge */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Secure Payment</span>
      </div>
    </div>
  );

  const ContactInfo = () => (
    <address className="not-italic space-y-3 text-sm text-gray-600">
      <div className="flex items-center justify-center gap-3">
        <PhoneIcon className="flex-shrink-0" size={16} aria-hidden="true" />
        <a 
          href={`tel:${membership.id === 'digital' || membership.id === 'industria' ? '+918160679917' : '+918000023786'}`}
          className="hover:text-gray-800 transition-colors font-medium"
          aria-label="Call us"
        >
          {membership.id === 'digital' || membership.id === 'industria' ? '+91 81606 79917' : '+91 80000 23786'}
        </a>
      </div>
      <div className="flex items-center justify-center gap-3">
        <EmailIcon className="flex-shrink-0" size={16} aria-hidden="true" />
        <a 
          href="mailto:info@bizcivitas.com"
          className="hover:text-gray-800 transition-colors font-medium"
          aria-label="Send us an email"
        >
          info@bizcivitas.com
        </a>
      </div>
      <div className="flex items-center justify-center gap-3">
        <WebsiteIcon className="flex-shrink-0" size={16} aria-hidden="true" />
        <a 
          href="https://www.bizcivitas.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800 transition-colors font-medium"
          aria-label="Visit our website"
        >
          www.bizcivitas.com
        </a>
      </div>
    </address>
  );

  return (
    <aside className="sticky top-8" role="complementary" aria-label="Membership purchase options">
      <div className="space-y-8">
        {/* Header Section */}
        <div 
          className="bg-gradient-to-r from-white to-gray-50 rounded-3xl shadow-xl border-2 p-8"
          style={{ borderColor: membership.color.primary }}
        >
          {/* Popular Badge */}
          {membership.popularBadge && (
            <div 
              className="text-center text-white px-6 py-3 rounded-2xl mb-6 font-bold text-sm shadow-lg transform hover:scale-105 transition-transform duration-300"
              style={{ 
                background: `linear-gradient(135deg, ${membership.color.primary}, ${membership.color.primary}dd)`
              }}
              role="banner"
            >
              🏆 {membership.popularBadge}
            </div>
          )}

          {/* Header */}
          <header className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{membership.name}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{membership.tagline}</p>
          </header>

          {/* Total Investment */}
          <div className="text-center mb-6">
            <div className="text-sm text-gray-600 mb-2">Total Investment</div>
            <div 
              className="text-5xl font-bold tracking-tight transform hover:scale-105 transition-transform duration-300"
              style={{ color: membership.color.primary }}
            >
              {membership.price.currency}{membership.price.amount.toLocaleString()}
            </div>
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {membership.highlights.slice(0, 4).map((highlight, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                <div className="text-xs text-gray-600 font-medium">{highlight}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Plans Grid */}
        {membership.plans && membership.plans.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Choose Your Payment Plan
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {membership.plans.map((plan, index) => (
                <PlanCard key={index} plan={plan} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Contact Footer */}
        <footer 
          className="bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg border p-6"
          style={{ borderColor: membership.color.primary + '30' }}
        >
          <div className="text-center space-y-4">
            <h4 className="font-bold text-gray-900 mb-4">Need Help?</h4>
            <ContactInfo />
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>100% Secure & Trusted Platform</span>
            </div>
          </div>
        </footer>
      </div>
    </aside>
  );
}

// Helper functions
function getFeaturesByPlanType(planTitle: string, membership: MembershipPlan): string[] {
  const baseFeatures = membership.features.slice(0, 3);
  
  if (planTitle.includes('Registration')) {
    return [
      'Complete onboarding process',
      'Access to member directory',
      'Welcome orientation session',
      'Membership credentials & materials'
    ];
  } else if (planTitle.includes('Membership')) {
    return [
      'Full access to all events',
      'Annual networking retreats',
      'Expert-led workshops',
      'Business collaboration opportunities'
    ];
  } else if (planTitle.includes('Meeting') || planTitle.includes('Event')) {
    return [
      'Monthly networking sessions',
      'Structured business meetings',
      'Industry expert interactions',
      'Referral opportunities'
    ];
  } else if (planTitle.includes('Community Launch')) {
    return [
      'Launch your own community',
      '2-year validity period',
      'Leadership opportunities',
      'Brand visibility & recognition'
    ];
  }
  
  return baseFeatures;
}

function getButtonText(planTitle: string): string {
  if (planTitle.includes('Registration')) {
    return 'Complete Registration';
  } else if (planTitle.includes('Membership')) {
    return 'Join Membership';
  } else if (planTitle.includes('Meeting') || planTitle.includes('Event')) {
    return 'Book Events';
  } else if (planTitle.includes('Community Launch')) {
    return 'Launch Community';
  }
  
  return 'Get Started';
}