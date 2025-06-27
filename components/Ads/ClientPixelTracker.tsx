// @/components/ClientPixelTracker.tsx
"use client";

import dynamic from "next/dynamic";

const PixelTracker = dynamic(() => import("@/lib/FacebookPixelTracker"), {
  ssr: false,
});

export default function ClientPixelTracker() {
  return <PixelTracker />;
}