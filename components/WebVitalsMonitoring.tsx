'use client';

import { useEffect } from 'react';

// Core Web Vitals monitoring and reporting
// Tracks LCP, INP, CLS, FCP, TTFB for SEO optimization

interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

interface PerformanceReport {
  lcp?: number;
  inp?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  url: string;
  timestamp: number;
  userAgent: string;
}

class WebVitalsMonitor {
  private metrics: Map<string, WebVitalsMetric> = new Map();
  private reportingEndpoint: string = '/api/analytics/web-vitals';

  constructor() {
    this.initializeWebVitals();
  }

  // Initialize Core Web Vitals monitoring
  private async initializeWebVitals() {
    if (typeof window === 'undefined') return;

    try {
      // Dynamic import to avoid SSR issues
      const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals');

      // Largest Contentful Paint (LCP)
      onLCP(this.handleMetric.bind(this));

      // Interaction to Next Paint (INP) - replaces FID
      onINP(this.handleMetric.bind(this));

      // Cumulative Layout Shift (CLS)
      onCLS(this.handleMetric.bind(this));

      // First Contentful Paint (FCP)
      onFCP(this.handleMetric.bind(this));

      // Time to First Byte (TTFB)
      onTTFB(this.handleMetric.bind(this));

      console.log('Core Web Vitals monitoring initialized');
    } catch (error) {
      console.warn('Failed to initialize Core Web Vitals:', error);
    }
  }

  // Handle individual metric
  private handleMetric(metric: WebVitalsMetric) {
    this.metrics.set(metric.name, metric);
    
    // Log poor performing metrics
    if (metric.rating === 'poor') {
      console.warn(`Poor ${metric.name} score:`, metric.value);
    }

    // Send metric to analytics
    this.sendMetric(metric);

    // Send complete report when we have all metrics
    if (this.metrics.size >= 4) { // LCP, INP, CLS, FCP (TTFB is optional)
      this.sendReport();
    }
  }

  // Send individual metric
  private sendMetric(metric: WebVitalsMetric) {
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
        custom_map: {
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
          metric_rating: metric.rating
        }
      });
    }

    // Send to custom analytics endpoint
    this.sendToEndpoint({
      type: 'metric',
      metric: metric,
      url: window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    });
  }

  // Send complete performance report
  private sendReport() {
    const report: PerformanceReport = {
      url: window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    };

    // Add metrics to report
    this.metrics.forEach((metric, name) => {
      switch (name) {
        case 'LCP':
          report.lcp = metric.value;
          break;
        case 'INP':
          report.inp = metric.value;
          break;
        case 'CLS':
          report.cls = metric.value;
          break;
        case 'FCP':
          report.fcp = metric.value;
          break;
        case 'TTFB':
          report.ttfb = metric.value;
          break;
      }
    });

    this.sendToEndpoint({
      type: 'report',
      report: report
    });

    console.log('Core Web Vitals Report:', report);
  }

  // Send data to analytics endpoint
  private async sendToEndpoint(data: any) {
    try {
      // Use beacon API for reliable delivery
      if ('sendBeacon' in navigator) {
        navigator.sendBeacon(
          this.reportingEndpoint,
          JSON.stringify(data)
        );
      } else {
        // Fallback to fetch
        fetch(this.reportingEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          keepalive: true
        }).catch(error => {
          console.warn('Failed to send analytics data:', error);
        });
      }
    } catch (error) {
      console.warn('Failed to send analytics data:', error);
    }
  }

  // Get current metrics summary
  getMetricsSummary() {
    const summary: any = {};
    this.metrics.forEach((metric, name) => {
      summary[name.toLowerCase()] = {
        value: metric.value,
        rating: metric.rating
      };
    });
    return summary;
  }

  // Check if page performance is good
  isPerformanceGood(): boolean {
    const poorMetrics = Array.from(this.metrics.values())
      .filter(metric => metric.rating === 'poor');
    
    return poorMetrics.length === 0;
  }
}

// Create singleton instance
const webVitalsMonitor = new WebVitalsMonitor();

// Hook for accessing Web Vitals data
export const useWebVitals = () => {
  return {
    getMetricsSummary: () => webVitalsMonitor.getMetricsSummary(),
    isPerformanceGood: () => webVitalsMonitor.isPerformanceGood()
  };
};

// Performance optimization recommendations
export const getPerformanceRecommendations = (metrics: any): string[] => {
  const recommendations: string[] = [];

  if (metrics.lcp?.rating === 'poor') {
    recommendations.push('Optimize Largest Contentful Paint: Consider lazy loading images, optimizing server response times, and reducing resource load times.');
  }

  if (metrics.inp?.rating === 'poor') {
    recommendations.push('Improve First Input Delay: Reduce JavaScript execution time, break up long tasks, and use web workers for heavy computations.');
  }

  if (metrics.cls?.rating === 'poor') {
    recommendations.push('Fix Cumulative Layout Shift: Add size attributes to images and videos, avoid inserting content above existing content, and use CSS aspect-ratio.');
  }

  if (metrics.fcp?.rating === 'poor') {
    recommendations.push('Optimize First Contentful Paint: Improve server response times, eliminate render-blocking resources, and optimize critical rendering path.');
  }

  if (metrics.ttfb?.rating === 'poor') {
    recommendations.push('Reduce Time To First Byte: Optimize server performance, use CDN, and implement proper caching strategies.');
  }

  return recommendations;
};
