
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TeamMember } from '@/lib/team';

interface TeamMemberModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamMemberModal({ member, isOpen, onClose }: TeamMemberModalProps) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Member Info */}
          <div className="p-8">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
                <Image
                  src={member.img_url || '/placeholder-team.jpg'}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
            </div>

            {/* Member Details */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {member.name}
              </h2>
              <p className="text-gray-600 font-medium mb-4">
                {member.designation}
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-3 mb-6">
              {member.website_link && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-blue-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                    <span className="text-sm font-medium">Website</span>
                  </div>
                  <Link
                    href={member.website_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm underline transition-colors flex-1"
                  >
                    {member.website_link}
                  </Link>
                </div>
              )}

              {member.linkedin_link && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-blue-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="text-sm font-medium">LinkedIn</span>
                  </div>
                  <Link
                    href={member.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm underline transition-colors flex-1"
                  >
                    {member.linkedin_link}
                  </Link>
                </div>
              )}
            </div>

            {/* Leading Domain */}
            {member.leading_in_domain && (
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Expert in {member.leading_in_domain}
                </span>
              </div>
            )}
          </div>

          {/* Right Column - Company Info & Description */}
          <div className="p-8 bg-gray-50 lg:rounded-r-2xl">
            {/* Company Info */}
            {member.company_name && (
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  {member.company_logo && (
                    <Image
                      src={member.company_logo}
                      alt={member.company_name}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {member.company_name}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {member.description && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">About</h4>
                <div 
                  className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: member.description }}
                />
              </div>
            )}

            {/* View Full Profile Button */}
            <div className="mt-6">
              <Link
                href={`/team/${member.slug}`}
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                onClick={onClose}
              >
                View Full Profile
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
