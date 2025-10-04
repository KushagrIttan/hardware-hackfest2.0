/**
 * Performance monitoring utilities for Core Web Vitals and mobile optimization
 */

// Core Web Vitals metrics interface
export interface WebVitalsMetrics {
  CLS: number | null; // Cumulative Layout Shift
  FID: number | null; // First Input Delay
  FCP: number | null; // First Contentful Paint
  LCP: number | null; // Largest Contentful Paint
  TTFB: number | null; // Time to First Byte
}

// Performance observer for Core Web Vitals
class PerformanceMonitor {
  private metrics: WebVitalsMetrics = {
    CLS: null,
    FID: null,
    FCP: null,
    LCP: null,
    TTFB: null,
  };

  private observers: PerformanceObserver[] = [];
  private isMobile: boolean;

  constructor() {
    this.isMobile = this.detectMobile();
    this.initializeObservers();
  }

  private detectMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;
  }

  private initializeObservers(): void {
    // Only monitor on mobile devices for battery optimization
    if (!this.isMobile) return;

    try {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            renderTime?: number;
            loadTime?: number;
          };
          
          if (lastEntry) {
            this.metrics.LCP = lastEntry.renderTime || lastEntry.loadTime || 0;
            this.reportMetric('LCP', this.metrics.LCP);
          }
        });
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as PerformanceEntry & { processingStart?: number };
            this.metrics.FID = fidEntry.processingStart ? 
              fidEntry.processingStart - entry.startTime : 0;
            this.reportMetric('FID', this.metrics.FID);
          }
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);

      // Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'layout-shift') {
            const layoutShiftEntry = entry as PerformanceEntry & { 
              value?: number; 
              hadRecentInput?: boolean; 
            };
            
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value || 0;
            }
          }
        });
        
        this.metrics.CLS = clsValue;
        this.reportMetric('CLS', this.metrics.CLS);
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);

      // First Contentful Paint (FCP) and TTFB
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            this.metrics.FCP = entry.startTime;
            this.reportMetric('FCP', this.metrics.FCP);
          }
        });
      });
      
      navigationObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(navigationObserver);

      // TTFB from navigation timing
      this.measureTTFB();

    } catch (error) {
      console.warn('Performance monitoring not supported:', error);
    }
  }

  private measureTTFB(): void {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0];
        this.metrics.TTFB = navEntry.responseStart - navEntry.requestStart;
        this.reportMetric('TTFB', this.metrics.TTFB);
      }
    }
  }

  private reportMetric(name: string, value: number): void {
    // Only log performance issues on mobile to conserve battery
    if (this.isMobile && this.isMetricPoor(name, value)) {
      console.warn(`Poor ${name} performance detected:`, value);
      
      // Send to analytics in production (placeholder)
      if (process.env.NODE_ENV === 'production') {
        this.sendToAnalytics(name, value);
      }
    }
  }

  private isMetricPoor(name: string, value: number): boolean {
    const thresholds = {
      LCP: 2500, // ms
      FID: 100,  // ms
      CLS: 0.1,  // score
      FCP: 1800, // ms
      TTFB: 800, // ms
    };

    return value > (thresholds[name as keyof typeof thresholds] || Infinity);
  }

  private sendToAnalytics(metric: string, value: number): void {
    // Import analytics dynamically to avoid circular dependencies
    import('./analytics').then(({ trackPerformance }) => {
      const rating = this.getMetricRating(metric, value);
      trackPerformance(`web_vital_${metric.toLowerCase()}`, value, { rating });
    });
  }

  private getMetricRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  public getMetrics(): WebVitalsMetrics {
    return { ...this.metrics };
  }

  public disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Battery usage optimization utilities
export class BatteryOptimizer {
  private static instance: BatteryOptimizer;
  private isLowPowerMode: boolean = false;
  private batteryLevel: number = 1;

  private constructor() {
    this.initializeBatteryMonitoring();
  }

  public static getInstance(): BatteryOptimizer {
    if (!BatteryOptimizer.instance) {
      BatteryOptimizer.instance = new BatteryOptimizer();
    }
    return BatteryOptimizer.instance;
  }

  private async initializeBatteryMonitoring(): Promise<void> {
    try {
      // Check if Battery API is available
      if ('getBattery' in navigator) {
        const battery = await (navigator as any).getBattery();
        
        this.batteryLevel = battery.level;
        this.isLowPowerMode = battery.level < 0.2; // Below 20%

        // Listen for battery changes
        battery.addEventListener('levelchange', () => {
          this.batteryLevel = battery.level;
          this.isLowPowerMode = battery.level < 0.2;
          this.adjustPerformanceSettings();
        });

        battery.addEventListener('chargingchange', () => {
          this.adjustPerformanceSettings();
        });
      }
    } catch (error) {
      console.warn('Battery API not supported:', error);
    }

    // Fallback: Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.isLowPowerMode = true;
    }
  }

  private adjustPerformanceSettings(): void {
    const event = new CustomEvent('batteryOptimization', {
      detail: {
        isLowPowerMode: this.isLowPowerMode,
        batteryLevel: this.batteryLevel,
      }
    });
    
    window.dispatchEvent(event);
  }

  public shouldReduceAnimations(): boolean {
    return this.isLowPowerMode || 
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  public shouldLazyLoadImages(): boolean {
    return this.isLowPowerMode || this.batteryLevel < 0.5;
  }

  public getOptimizationLevel(): 'high' | 'medium' | 'low' {
    if (this.isLowPowerMode) return 'high';
    if (this.batteryLevel < 0.5) return 'medium';
    return 'low';
  }
}

// Initialize performance monitoring
let performanceMonitor: PerformanceMonitor | null = null;

export const initializePerformanceMonitoring = (): void => {
  if (typeof window !== 'undefined' && !performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
};

export const getPerformanceMetrics = (): WebVitalsMetrics | null => {
  return performanceMonitor?.getMetrics() || null;
};

export const cleanupPerformanceMonitoring = (): void => {
  if (performanceMonitor) {
    performanceMonitor.disconnect();
    performanceMonitor = null;
  }
};