"use client";

import { useEffect } from "react";

export default function AutoPixelEvents() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;

    // Always fire PageView on mount (just in case)
    window.fbq("track", "PageView");

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Traverse up to find the nearest actionable element
      let element = target.closest("button, a");

      if (element) {
        const tag = element.tagName;
        const text = (element.textContent || "").trim();

        const eventName = tag === "A" ? "LinkClick" : "ButtonClick";

        window.fbq("trackCustom", eventName, {
          tag,
          text,
          href: (element as HTMLAnchorElement).href || undefined,
        });

        console.log(`[MetaPixel] Tracked ${eventName}:`, text);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
