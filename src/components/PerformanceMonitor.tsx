import React, { useState, useEffect } from 'react';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';
import { analytics } from '@/utils/analytics';
import { runAllPerformanceTests } from '@/utils/performanceTest';
import { runAllMobileTests } from '@/utils/mobileParallaxTest';

interface PerformanceMonitorProps {
  showInProduction?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showInProduction = false,
  position = 'bottom-right',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const {
    metrics,
    batteryLevel,
    optimizationLevel,
    shouldLazyLoad,
    shouldReduceAnimations,
  } = usePerformanceMonitoring();

  // Only show in development unless explicitly enabled for production
  const shouldShow = process.env.NODE_ENV === 'development' || showInProduction;

  useEffect(() => {
    if (!shouldShow) return;

    const updateEvents = () => {
      setEvents(analytics.getStoredEvents().slice(-10)); // Show last 10 events
    };

    updateEvents();
    const interval = setInterval(updateEvents, 1000);

    return () => clearInterval(interval);
  }, [shouldShow]);

  if (!shouldShow) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  const getMetricColor = (name: string, value: number | null) => {
    if (value === null) return 'text-muted-foreground';
    
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'text-neon';

    if (value <= threshold.good) return 'text-green-400';
    if (value <= threshold.poor) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBatteryColor = (level: number) => {
    if (level > 0.5) return 'text-green-400';
    if (level > 0.2) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-[9999] font-mono text-xs`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-background/90 border border-neon/30 text-neon px-2 py-1 rounded mb-2 hover:border-neon transition-colors"
      >
        📊 {isVisible ? 'Hide' : 'Show'} Performance
      </button>

      {/* Performance Panel */}
      {isVisible && (
        <div className="bg-background/95 border border-neon/30 rounded-lg p-4 max-w-sm backdrop-blur-sm">
          <h3 className="text-neon font-bold mb-3">Performance Monitor</h3>
          
          {/* Core Web Vitals */}
          <div className="mb-4">
            <h4 className="text-neon/80 font-semibold mb-2">Core Web Vitals</h4>
            <div className="space-y-1">
              {Object.entries(metrics || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className={getMetricColor(key, value)}>
                    {value !== null ? `${Math.round(value)}${key === 'CLS' ? '' : 'ms'}` : 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Battery & Optimization */}
          <div className="mb-4">
            <h4 className="text-neon/80 font-semibold mb-2">Battery & Optimization</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Battery:</span>
                <span className={getBatteryColor(batteryLevel)}>
                  {Math.round(batteryLevel * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Optimization:</span>
                <span className={
                  optimizationLevel === 'high' ? 'text-red-400' :
                  optimizationLevel === 'medium' ? 'text-yellow-400' : 'text-green-400'
                }>
                  {optimizationLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lazy Load:</span>
                <span className={shouldLazyLoad ? 'text-green-400' : 'text-muted-foreground'}>
                  {shouldLazyLoad ? 'ON' : 'OFF'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reduce Animations:</span>
                <span className={shouldReduceAnimations ? 'text-green-400' : 'text-muted-foreground'}>
                  {shouldReduceAnimations ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div>
            <h4 className="text-neon/80 font-semibold mb-2">Recent Events</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {events.length === 0 ? (
                <div className="text-muted-foreground text-center py-2">No events yet</div>
              ) : (
                events.map((event, index) => (
                  <div key={index} className="text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground truncate">
                        {event.name}
                      </span>
                      <span className="text-neon ml-2">
                        {Math.round(event.value)}{event.type === 'performance' ? 'ms' : ''}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 pt-3 border-t border-neon/20 space-y-2">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => analytics.clearEvents()}
                className="text-xs text-muted-foreground hover:text-neon transition-colors"
              >
                Clear Events
              </button>
              <button
                onClick={() => runAllPerformanceTests()}
                className="text-xs text-muted-foreground hover:text-neon transition-colors"
              >
                Run Tests
              </button>
              <button
                onClick={() => runAllMobileTests()}
                className="text-xs text-muted-foreground hover:text-neon transition-colors"
              >
                Mobile Tests
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;