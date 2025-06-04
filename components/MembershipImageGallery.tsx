
"use client";

import { useState } from "react";
import Image from "next/image";

interface MembershipImageGalleryProps {
  images: string[];
  membershipName: string;
}

export default function MembershipImageGallery({ images, membershipName }: MembershipImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h3>
      
      {/* Main Image */}
      <div className="mb-4">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src={images[selectedImage] || "/placeholder-membership.jpg"}
            alt={`${membershipName} - Image ${selectedImage + 1}`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image || "/placeholder-membership.jpg"}
                alt={`${membershipName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
