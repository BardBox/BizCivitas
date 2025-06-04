
import Image from 'next/image';
import Link from 'next/link';

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

const services = [
  { name: 'Corporate Networking', href: '/corporate-networking' },
  { name: 'Entrepreneur Networking', href: '/entrepreneur-networking' },
  { name: 'Travel Networking', href: '/travel-networking' },
  { name: 'Business Events', href: '/events' },
  { name: 'Professional Development', href: '/insights' },
];

export default function Footer() {
  return (
    <footer className="bg-[#6E81BD] text-white font-[raleway]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                <Image
                src={"/bizcivitas.svg"}
                alt="BizCivitas Logo"
                width={150}
                height={40}
                className="object-contain"
                />
              </span>
            </div>
            <h3 className="font-semibold text-2xl mb-4 max-w-md">
              TURNING VISIONS INTO REALITY, ONE EVENT AT A TIME
            </h3>
            <p className="text-white mb-6 max-w-md leading-relaxed">
              Bringing your vision to life with seamless execution and unforgettable experiences. Join our community of professionals for networking, growth, and success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.slice(0, 7).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">
            © 2024 BizCivitas. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-white hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-white hover:text-blue-400 text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
