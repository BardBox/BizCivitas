"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head"; // Import next/head
import { usePathname } from "next/navigation";

const footerLinks = [
  { name: "Home", href: "/", title: "BizCivitas Home Page" },
  {
    name: "Discover BizCivitas",
    href: "/discover",
    title: "Discover Business Networking with BizCivitas",
  },
  { name: "Our Team", href: "/team", title: "Meet the BizCivitas Team" },
  {
    name: "Insights",
    href: "/insights",
    title: "Business Insights and Resources",
  },
  { name: "Events", href: "/events", title: "Business and Networking Events" },
  {
    name: "Membership",
    href: "/memberships",
    title: "Join BizCivitas Membership",
  },
  { name: "Contact", href: "/contact", title: "Contact BizCivitas Support" },
  // {
  //   name: "Corporate Networking",
  //   href: "/corporate-networking",
  //   title: "Corporate Networking Opportunities",
  // },
  // {
  //   name: "Entrepreneur Networking",
  //   href: "/entrepreneur-networking",
  //   title: "Entrepreneur Networking Events",
  // },
  // {
  //   name: "Travel Networking",
  //   href: "/travel-networking",
  //   title: "Travel Networking for Professionals",
  // },
  // {
  //   name: "Privacy Policy",
  //   href: "/privacy",
  //   title: "BizCivitas Privacy Policy",
  // },
  // {
  //   name: "Terms & Conditions",
  //   href: "/terms",
  //   title: "BizCivitas Terms and Conditions",
  // },
];

const services = [
  {
    name: "Corporate Networking",
    href: "/corporate-networking",
    title: "Corporate Networking Services",
  },
  {
    name: "Entrepreneur Networking",
    href: "/entrepreneur-networking",
    title: "Networking for Entrepreneurs",
  },
  {
    name: "Travel Networking",
    href: "/travel-networking",
    title: "Travel Networking Events",
  },
  {
    name: "Business Events",
    href: "/events",
    title: "Professional Business Events",
  },
  {
    name: "Professional Development",
    href: "/blogs",
    title: "Professional Development Resources",
  },
];

const greenRoutes = [
  "/discover",
  "/blogs",
  "/memberships",
  "/corporate-networking",
  "/privacy",
  "/terms",
];
const greenBg = "#50C26F";
const purpleBg = "#6E81BD";

export default function Footer() {
  const pathname = usePathname();
  const shouldUseGreen = greenRoutes.includes(pathname);
  const bgColor = shouldUseGreen ? greenBg : purpleBg;

  // JSON-LD Schema Markup
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "BizCivitas",
        url: "https://www.bizcivitas.com",
        logo: "https://www.bizcivitas.com/bizcivitas.svg",
        sameAs: [
          "https://www.instagram.com/bizcivitas/",
          "https://www.linkedin.com/company/bizcivitas/",
          "https://www.facebook.com/bizcivitas/",
          "https://www.youtube.com/@BizCivitas",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          url: "https://www.bizcivitas.com/contact",
          email: "support@bizcivitas.com",
        },
        description:
          "BizCivitas connects professionals through business networking, corporate events, and travel networking opportunities.",
      },
      {
        "@type": "WebSite",
        url: "https://www.bizcivitas.com",
        name: "BizCivitas",
        description: "Business networking and professional events platform",
        publisher: {
          "@id": "https://www.bizcivitas.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.bizcivitas.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: footerLinks.map((link, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: link.name,
          item: `https://www.bizcivitas.com${link.href}`,
        })),
      },
    ],
  };

  return (
    <>
      {/* Inject JSON-LD into <head> */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <footer
        className="text-white font-[raleway] bg-opacity-90"
        style={{ backgroundColor: bgColor }}
        aria-label="Site Footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Company Info */}
            <section className="lg:col-span-1" aria-labelledby="company-info">
              <div className="flex items-center mb-6">
                <Image
                  src="/bizcivitas.svg"
                  alt="BizCivitas Logo - Business Networking and Events"
                  width={150}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <h2
                id="company-info"
                className="font-normal text-2xl mb-4 max-w-md leading-tight"
              >
                Turning Business Visions into Reality
              </h2>
              <p className="text-white/90 mb-8 max-w-md leading-relaxed text-sm">
                Empowering professionals with seamless business networking,
                corporate events, and unforgettable experiences.
              </p>
            </section>

            {/* Newsletter Section */}
            <section
              className="lg:col-span-1 lg:text-center"
              aria-labelledby="newsletter"
            >
              <h2 id="newsletter" className="text-lg font-medium mb-4">
                Join Our Business Networking Newsletter
              </h2>
              <form
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                action="/subscribe"
                method="POST"
              >
                <label htmlFor="email-input" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="Enter your email for updates"
                  className="flex-1 px-4 py-2 rounded-md text-gray-900 bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                  aria-required="true"
                />
                <button
                  type="submit"
                  className="mx-2 px-6 py-2 bg-white text-orange-500 rounded-md font-bold text-sm hover:bg-gray-100 transition-colors"
                  aria-label="Subscribe to BizCivitas Newsletter"
                >
                  Subscribe
                </button>
              </form>
            </section>

            {/* App Download Section */}
            <section
              className="lg:col-span-1 lg:text-right"
              aria-labelledby="app-download"
            >
              <h2 id="app-download" className="text-lg font-medium mb-4">
                Download Our App
              </h2>
              <div className="flex flex-col gap-3 lg:items-end">
                <a
                  href="https://www.apple.com/app-store/"
                  className="bg-black rounded-lg px-4 py-2 flex items-center gap-3 w-fit"
                  aria-label="Download BizCivitas on the App Store"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <span className="text-xs text-gray-300">
                      Coming Soon on
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      {" "}
                      Apple Store
                    </span>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store"
                  className="bg-black rounded-lg px-4 py-2 flex items-center gap-3 w-fit"
                  aria-label="Download BizCivitas on Google Play"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div>
                    <span className="text-xs text-gray-300">
                      Coming Soon on
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            </section>
          </div>

          {/* Footer Navigation */}
          <nav
            className="border-t border-white/20 mt-8 pt-8  flex flex-wrap gap-x-6 gap-y-2 text-md font-semibold mt-8"
            aria-label="Footer Navigation"
          >
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                title={link.title}
                className="text-white/80 hover:text-white transition-colors"
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Copyright and Social Icons */}
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between w-full">
              <p className="text-white/80 text-sm">
                © BardBox DigiGrowth LLP 2025, All rights reserved.
              </p>
              <nav className="flex space-x-4" aria-label="Social Media Links">
                <a
                  href="https://www.youtube.com/@BizCivitas"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Follow BizCivitas on YouTube"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/bizcivitas/"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Follow BizCivitas on Instagram"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/bizcivitas/"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Connect with BizCivitas on LinkedIn"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/bizcivitas/"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Follow BizCivitas on Facebook"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}