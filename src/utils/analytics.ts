/**
 * Analytics utilities for performance monitoring and user behavior tracking
 * This is a client-side implementation that can be extended with actual analytics services
 */

interface AnalyticsEvent {
  type: 'performance' | 'custom_metric' | 'user_interaction';
  name: string;
  value: number;
  timestamp: number;
  userAgent: string;
  viewport: string;
  batteryLevel?: number;
  connectionType?: string;
}

class Analytics {
  private static instance: Analytics;
  private events: AnalyticsEvent[] = [];
  private maxEvents = 100; // Limit stored events for memory management
  private batchSize = 10;
  private flushInterval = 30000; // 30 seconds
  private flushTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.initializeAnalytics();
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private initializeAnalytics(): void {
    // Start periodic flushing
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.flushInterval);

    // Flush on page unload
    window.addEventListener('beforeunload', () => {
      this.flush(true);
    });

    // Flush on visibility change (when user switches tabs)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush(true);
      }
    });
  }

  public trackPerformanceMetric(name: string, value: number, additionalData?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      type: 'performance',
      name,
      value,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      ...this.getDeviceInfo(),
      ...additionalData,
    };

    this.addEvent(event);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Performance Metric - ${name}:`, value, 'ms');
    }
  }

  public trackCustomMetric(name: string, value: number, additionalData?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      type: 'custom_metric',
      name,
      value,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      ...this.getDeviceInfo(),
      ...additionalData,
    };

    this.addEvent(event);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📈 Custom Metric - ${name}:`, value);
    }
  }

  public trackUserInteraction(interactionName: string, duration: number): void {
    const event: AnalyticsEvent = {
      type: 'user_interaction',
      name: interactionName,
      value: duration,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      ...this.getDeviceInfo(),
    };

    this.addEvent(event);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`👆 User Interaction - ${interactionName}:`, duration, 'ms');
    }
  }

  private addEvent(event: AnalyticsEvent): void {
    this.events.push(event);

    // Limit stored events to prevent memory issues
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Auto-flush if we have enough events
    if (this.events.length >= this.batchSize) {
      this.flush();
    }
  }

  private getDeviceInfo(): Partial<AnalyticsEvent> {
    const info: Partial<AnalyticsEvent> = {};

    // Get battery level if available
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        info.batteryLevel = battery.level;
      }).catch(() => {
        // Battery API not supported
      });
    }

    // Get connection type if available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      info.connectionType = connection.effectiveType || connection.type;
    }

    return info;
  }

  private flush(immediate = false): void {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    if (process.env.NODE_ENV === 'production') {
      // In production, send to actual analytics service
      this.sendToAnalyticsService(eventsToSend, immediate);
    } else {
      // In development, just log the events
      console.group('📊 Analytics Batch');
      eventsToSend.forEach(event => {
        console.log(`${event.type}: ${event.name} = ${event.value}`);
      });
      console.groupEnd();
    }
  }

  private sendToAnalyticsService(events: AnalyticsEvent[], immediate = false): void {
    const payload = {
      events,
      sessionId: this.getSessionId(),
      timestamp: Date.now(),
    };

    const data = JSON.stringify(payload);

    if (immediate && navigator.sendBeacon) {
      // Use sendBeacon for immediate sending (on page unload)
      navigator.sendBeacon('/api/analytics/batch', data);
    } else {
      // Use fetch for regular sending
      fetch('/api/analytics/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }).catch(error => {
        console.warn('Failed to send analytics data:', error);
        // Re-add events to queue for retry
        this.events.unshift(...events);
      });
    }
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  public getStoredEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public clearEvents(): void {
    this.events = [];
  }

  public destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
    this.flush(true);
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance();

// Convenience functions
export const trackPerformance = (name: string, value: number, additionalData?: Record<string, any>) => {
  analytics.trackPerformanceMetric(name, value, additionalData);
};

export const trackCustomMetric = (name: string, value: number, additionalData?: Record<string, any>) => {
  analytics.trackCustomMetric(name, value, additionalData);
};

export const trackInteraction = (name: string, duration: number) => {
  analytics.trackUserInteraction(name, duration);
};

// Core Web Vitals tracking
export const trackWebVital = (name: string, value: number, rating: 'good' | 'needs-improvement' | 'poor') => {
  trackPerformance(`web_vital_${name.toLowerCase()}`, value, { rating });
};