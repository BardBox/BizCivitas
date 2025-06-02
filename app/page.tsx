
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - BizCivitas | Business Networking & Events Platform",
  description: "Join BizCivitas, the premier business networking platform. Discover events, connect with professionals, and grow your business through our exclusive memberships and networking opportunities.",
  keywords: ["business networking", "professional events", "entrepreneur community", "corporate networking", "business growth", "networking events"],
  openGraph: {
    title: "BizCivitas - Premier Business Networking Platform",
    description: "Join BizCivitas for exclusive networking events, professional development, and business growth opportunities.",
    type: "website",
  },
};

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Discover BizCivitas', href: '/discover' },
  { name: 'Our Team', href: '/team' },
  { name: 'Insights', href: '/insights' },
  { name: 'Events', href: '/events' },
  { name: 'Memberships', href: '/memberships' },
  { name: 'Contact', href: '/contact' },
];

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Discover Bizcivitas', href: '/discover' },
  { name: 'Our Team', href: '/team' },
  { name: 'Insights', href: '/insights' },
  { name: 'Events', href: '/events' },
  { name: 'Membership', href: '/memberships' },
  { name: 'Contact', href: '/contact' },
  { name: 'Corporate Networking', href: '/corporate-networking' },
  { name: 'Entrepreneur Networking', href: '/entrepreneur-networking' },
  { name: 'Travel Networking', href: '/travel-networking' },
];

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-2"></div>
                <span className="text-xl font-bold text-gray-900">BizCivitas</span>
              </Link>
            </div>
            
            {/* Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                  TURNING VISIONS INTO REALITY, ONE EVENT AT A TIME
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Bringing your vision to life with seamless execution and unforgettable experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/events"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                  >
                    Explore Events
                  </Link>
                  <Link
                    href="/memberships"
                    className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
                  >
                    Join Membership
                  </Link>
                </div>
              </div>
              <div className="lg:text-right">
                <div className="inline-block">
                  <h3 className="text-2xl font-semibold mb-4">STAY IN THE LOOP - JOIN OUR NEWSLETTER!</h3>
                  <div className="flex max-w-md">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      className="bg-gray-800 text-white px-6 py-3 rounded-r-lg hover:bg-gray-700 transition-colors"
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4">GET THE APP</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="#" className="inline-block">
                        <Image
                          src="/app-store.png"
                          alt="Download on the App Store"
                          width={140}
                          height={40}
                          className="h-10 w-auto"
                        />
                      </Link>
                      <Link href="#" className="inline-block">
                        <Image
                          src="/google-play.png"
                          alt="Get it on Google Play"
                          width={140}
                          height={40}
                          className="h-10 w-auto"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose BizCivitas?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive business networking solutions to help you grow, connect, and succeed in your professional journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Networking</h3>
                <p className="text-gray-600">Connect with like-minded professionals and industry leaders in exclusive networking events.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Curated Events</h3>
                <p className="text-gray-600">Attend carefully curated events designed to maximize your learning and networking opportunities.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Business Growth</h3>
                <p className="text-gray-600">Accelerate your business growth through strategic partnerships and valuable insights.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-2"></div>
                <span className="text-xl font-bold">BizCivitas</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                TURNING VISIONS INTO REALITY, ONE EVENT AT A TIME
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Bringing your vision to life with seamless execution and unforgettable experiences.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.slice(0, 5).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.slice(5).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 BizCivitas. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
