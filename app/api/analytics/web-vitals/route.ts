// API endpoint for receiving Core Web Vitals data
import { NextRequest, NextResponse } from 'next/server';

interface WebVitalsData {
  type: 'metric' | 'report';
  metric?: {
    name: string;
    value: number;
    delta: number;
    id: string;
    rating: 'good' | 'needs-improvement' | 'poor';
  };
  report?: {
    lcp?: number;
    fid?: number;
    cls?: number;
    fcp?: number;
    ttfb?: number;
    url: string;
    timestamp: number;
    userAgent: string;
  };
  url?: string;
  timestamp?: number;
  userAgent?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: WebVitalsData = await request.json();

    // Validate data
    if (!data.type || (data.type !== 'metric' && data.type !== 'report')) {
      return NextResponse.json(
        { error: 'Invalid data type' },
        { status: 400 }
      );
    }

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals Data:', JSON.stringify(data, null, 2));
    }

    // In production, you would typically:
    // 1. Store in database (e.g., PostgreSQL, MongoDB)
    // 2. Send to analytics service (e.g., Google Analytics, DataDog)
    // 3. Create alerts for poor performance
    
    if (data.type === 'metric' && data.metric) {
      // Process individual metric
      await processMetric(data.metric, data.url, data.userAgent);
    } else if (data.type === 'report' && data.report) {
      // Process complete report
      await processReport(data.report);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing Web Vitals data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Process individual metric
async function processMetric(
  metric: WebVitalsData['metric'],
  url?: string,
  userAgent?: string
) {
  if (!metric) return;

  // Example: Send to external analytics service
  try {
    // You could send to services like:
    // - Google Analytics Measurement Protocol
    // - DataDog
    // - New Relic
    // - Custom analytics service
    
    console.log(`${metric.name}: ${metric.value} (${metric.rating})`);
    
    // Alert for poor performance
    if (metric.rating === 'poor') {
      await sendPerformanceAlert(metric, url, userAgent);
    }
  } catch (error) {
    console.error('Error processing metric:', error);
  }
}

// Process complete performance report
async function processReport(report: WebVitalsData['report']) {
  if (!report) return;

  try {
    // Calculate performance score
    const score = calculatePerformanceScore(report);
    
    console.log(`Performance Score for ${report.url}: ${score}/100`);
    
    // Store in database (example structure)
    const performanceRecord = {
      url: report.url,
      timestamp: new Date(report.timestamp),
      userAgent: report.userAgent,
      metrics: {
        lcp: report.lcp,
        fid: report.fid,
        cls: report.cls,
        fcp: report.fcp,
        ttfb: report.ttfb
      },
      score: score
    };

    // Here you would typically save to your database
    // await savePerformanceRecord(performanceRecord);
    
    // Send alerts for consistently poor performance
    if (score < 50) {
      await sendPerformanceAlert(null, report.url, report.userAgent);
    }
  } catch (error) {
    console.error('Error processing report:', error);
  }
}

// Calculate performance score (0-100)
function calculatePerformanceScore(report: WebVitalsData['report']): number {
  if (!report) return 0;

  let score = 0;
  let metrics = 0;

  // LCP (Largest Contentful Paint)
  if (report.lcp !== undefined) {
    if (report.lcp <= 2500) score += 25;
    else if (report.lcp <= 4000) score += 15;
    else score += 5;
    metrics++;
  }

  // FID (First Input Delay)
  if (report.fid !== undefined) {
    if (report.fid <= 100) score += 25;
    else if (report.fid <= 300) score += 15;
    else score += 5;
    metrics++;
  }

  // CLS (Cumulative Layout Shift)
  if (report.cls !== undefined) {
    if (report.cls <= 0.1) score += 25;
    else if (report.cls <= 0.25) score += 15;
    else score += 5;
    metrics++;
  }

  // FCP (First Contentful Paint)
  if (report.fcp !== undefined) {
    if (report.fcp <= 1800) score += 25;
    else if (report.fcp <= 3000) score += 15;
    else score += 5;
    metrics++;
  }

  return metrics > 0 ? Math.round(score) : 0;
}

// Send performance alert
async function sendPerformanceAlert(
  metric: WebVitalsData['metric'] | null,
  url?: string,
  userAgent?: string
) {
  try {
    // In production, you might:
    // - Send email alerts
    // - Post to Slack/Discord
    // - Create tickets in issue tracking
    // - Send push notifications to admin
    
    const alertData = {
      type: 'performance_alert',
      timestamp: new Date().toISOString(),
      url: url,
      userAgent: userAgent,
      metric: metric ? {
        name: metric.name,
        value: metric.value,
        rating: metric.rating
      } : null
    };

    console.warn('Performance Alert:', alertData);

    // Example: Send to monitoring service
    // await fetch('https://your-monitoring-service.com/alerts', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(alertData)
    // });
  } catch (error) {
    console.error('Error sending performance alert:', error);
  }
}

// Optional: GET endpoint to retrieve performance data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const days = parseInt(searchParams.get('days') || '7');

    // In production, you would query your database
    // const performanceData = await getPerformanceData(url, days);

    // Mock response for now
    const mockData = {
      url: url || 'all',
      period: `${days} days`,
      averageScores: {
        lcp: 2100,
        fid: 80,
        cls: 0.08,
        fcp: 1600,
        overall: 85
      },
      trends: {
        improving: ['FCP', 'LCP'],
        declining: [],
        stable: ['FID', 'CLS']
      }
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Error retrieving performance data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
