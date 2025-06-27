"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

export default function AutoPixelEvents() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Always track initial page view on mount (failsafe)
    if (window.fbq) window.fbq("track", "PageView");

    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = target.closest("a, button");

      if (!element) return;

      const tag = element.tagName;
      const text = (element.textContent || "").trim();
      const href = (element as HTMLAnchorElement).href || undefined;

      // 🚀 Fire Meta Pixel custom event
      if (window.fbq) {
        const eventName = tag === "A" ? "LinkClick" : "ButtonClick";
        window.fbq("trackCustom", eventName, { tag, text, href });
        console.log(`[MetaPixel] ${eventName}:`, text);
      }

      // 🚀 Fire Google Analytics event
      if (window.gtag) {
        window.gtag("event", "interaction_click", {
          event_category: tag === "A" ? "Link" : "Button",
          event_label: text,
          value: 1,
        });
        console.log(`[GA4] interaction_click:`, text);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
