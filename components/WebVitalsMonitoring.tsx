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

// React component for Web Vitals monitoring
const WebVitalsMonitoring = () => {
  useEffect(() => {
    // Monitor for navigation performance
    const measureNavigationTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        
        if (navigationEntries.length > 0) {
          const entry = navigationEntries[0];
          
          // Calculate key timing metrics
          const metrics = {
            dns: entry.domainLookupEnd - entry.domainLookupStart,
            tcp: entry.connectEnd - entry.connectStart,
            request: entry.responseStart - entry.requestStart,
            response: entry.responseEnd - entry.responseStart,
            dom: entry.domContentLoadedEventEnd - entry.responseEnd,
            load: entry.loadEventEnd - entry.loadEventStart,
            total: entry.loadEventEnd - entry.fetchStart
          };

          console.log('Navigation Timing:', metrics);

          // Send to analytics if total load time is poor (>3s)
          if (metrics.total > 3000) {
            console.warn('Slow page load detected:', metrics.total + 'ms');
          }
        }
      }
    };

    // Monitor resource loading performance
    const measureResourceTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        // Find slow resources (>1s)
        const slowResources = resourceEntries.filter(entry => 
          entry.duration > 1000
        );

        if (slowResources.length > 0) {
          console.warn('Slow resources detected:', slowResources.map(r => ({
            name: r.name,
            duration: r.duration
          })));
        }
      }
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measureNavigationTiming();
      measureResourceTiming();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          measureNavigationTiming();
          measureResourceTiming();
        }, 0);
      });
    }

    // Monitor for layout shifts
    if ('PerformanceObserver' in window) {
      try {
        const layoutShiftObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          let totalShift = 0;
          
          entries.forEach((entry: any) => {
            if (entry.hadRecentInput) return; // Ignore user-initiated shifts
            totalShift += entry.value;
          });

          if (totalShift > 0.1) {
            console.warn('Layout shift detected:', totalShift);
          }
        });

        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });

        // Clean up observer
        return () => {
          layoutShiftObserver.disconnect();
        };
      } catch (error) {
        console.warn('Failed to setup layout shift observer:', error);
      }
    }
  }, []);

  return null; // This is a monitoring component, no UI
};

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

export default WebVitalsMonitoring;
