
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TeamMember } from '@/lib/team';
import TeamMemberModal from './TeamMemberModal';

interface TeamPageClientProps {
  groupedMembers: Record<string, TeamMember[]>;
  sortedPositions: string[];
  positionDisplayNames: Record<string, string>;
}

export default function TeamPageClient({ 
  groupedMembers, 
  sortedPositions, 
  positionDisplayNames 
}: TeamPageClientProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {sortedPositions.length > 0 ? (
            sortedPositions.map((position) => {
              const members = groupedMembers[position];
              const displayName = positionDisplayNames[position] || position;
              
              return (
                <div key={position} className="mb-20">
                  {/* Position Title */}
                  <div className="text-center mb-12">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                      {displayName}
                    </h2>
                  </div>

                  {/* Members Grid - Centered layout */}
                  <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
                    {members.map((member) => (
                      <div key={member.id} className="group">
                        {/* Clickable card for modal */}
                        <button
                          onClick={() => openModal(member)}
                          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 w-72 text-left"
                        >
                          {/* Circular Image Container */}
                          <div className="flex justify-center pt-6 pb-4">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
                              <Image
                                src={member.img_url || "/placeholder-team.jpg"}
                                alt={member.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="128px"
                              />
                            </div>
                          </div>

                          {/* Member Info */}
                          <div className="px-6 pb-6 text-center">
                            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                              {member.name}
                            </h3>
                            {member.leading_in_domain && (
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {member.leading_in_domain}
                              </p>
                            )}
                            {member.designation && (
                              <p className="text-blue-600 font-medium text-sm mt-2">
                                {member.designation}
                              </p>
                            )}
                          </div>
                        </button>

                        {/* Link to full profile page */}
                        <div className="text-center mt-3">
                          <Link
                            href={`/team/${member.slug}`}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            View Full Profile →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-xl p-8 shadow-sm border max-w-md mx-auto">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="text-lg text-gray-600">
                  Team members will be added soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Team Member Modal */}
      <TeamMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
