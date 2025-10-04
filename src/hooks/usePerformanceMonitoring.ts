import { useEffect, useState, useCallback } from 'react';
import { 
  initializePerformanceMonitoring, 
  getPerformanceMetrics, 
  cleanupPerformanceMonitoring,
  WebVitalsMetrics,
  BatteryOptimizer 
} from '@/utils/performance';

interface PerformanceState {
  metrics: WebVitalsMetrics | null;
  isLowPowerMode: boolean;
  batteryLevel: number;
  optimizationLevel: 'high' | 'medium' | 'low';
  shouldLazyLoad: boolean;
  shouldReduceAnimations: boolean;
}

export const usePerformanceMonitoring = () => {
  const [performanceState, setPerformanceState] = useState<PerformanceState>({
    metrics: null,
    isLowPowerMode: false,
    batteryLevel: 1,
    optimizationLevel: 'low',
    shouldLazyLoad: false,
    shouldReduceAnimations: false,
  });

  const batteryOptimizer = BatteryOptimizer.getInstance();

  const updatePerformanceState = useCallback(() => {
    const metrics = getPerformanceMetrics();
    const optimizationLevel = batteryOptimizer.getOptimizationLevel();
    const shouldLazyLoad = batteryOptimizer.shouldLazyLoadImages();
    const shouldReduceAnimations = batteryOptimizer.shouldReduceAnimations();

    setPerformanceState(prev => ({
      ...prev,
      metrics,
      optimizationLevel,
      shouldLazyLoad,
      shouldReduceAnimations,
      isLowPowerMode: optimizationLevel === 'high',
    }));
  }, [batteryOptimizer]);

  useEffect(() => {
    // Initialize performance monitoring
    initializePerformanceMonitoring();
    
    // Initial state update
    updatePerformanceState();

    // Listen for battery optimization changes
    const handleBatteryOptimization = (event: CustomEvent) => {
      const { isLowPowerMode, batteryLevel } = event.detail;
      setPerformanceState(prev => ({
        ...prev,
        isLowPowerMode,
        batteryLevel,
      }));
      updatePerformanceState();
    };

    window.addEventListener('batteryOptimization', handleBatteryOptimization as EventListener);

    // Update metrics periodically (only on mobile to save battery)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;

    let intervalId: NodeJS.Timeout | null = null;
    
    if (isMobile) {
      intervalId = setInterval(updatePerformanceState, 5000); // Update every 5 seconds
    }

    return () => {
      window.removeEventListener('batteryOptimization', handleBatteryOptimization as EventListener);
      if (intervalId) clearInterval(intervalId);
      cleanupPerformanceMonitoring();
    };
  }, [updatePerformanceState]);

  const reportCustomMetric = useCallback((name: string, value: number) => {
    // Use the analytics system for consistent reporting
    import('@/utils/analytics').then(({ trackCustomMetric }) => {
      trackCustomMetric(name, value, {
        batteryLevel: performanceState.batteryLevel,
        optimizationLevel: performanceState.optimizationLevel,
      });
    });
  }, [performanceState.batteryLevel, performanceState.optimizationLevel]);

  const measureInteraction = useCallback((interactionName: string) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      reportCustomMetric(`interaction_${interactionName}`, duration);
    };
  }, [reportCustomMetric]);

  return {
    ...performanceState,
    reportCustomMetric,
    measureInteraction,
    updatePerformanceState,
  };
};

// Hook for measuring component render performance
export const useRenderPerformance = (componentName: string) => {
  const { reportCustomMetric } = usePerformanceMonitoring();

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      reportCustomMetric(`render_${componentName}`, renderTime);
    };
  }, [componentName, reportCustomMetric]);
};

// Hook for measuring image loading performance
export const useImageLoadPerformance = () => {
  const { reportCustomMetric } = usePerformanceMonitoring();

  const measureImageLoad = useCallback((imageSrc: string) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      reportCustomMetric('image_load_time', loadTime);
      
      // Also report image size for optimization insights
      const img = new Image();
      img.onload = () => {
        reportCustomMetric('image_size', img.naturalWidth * img.naturalHeight);
      };
      img.src = imageSrc;
    };
  }, [reportCustomMetric]);

  return { measureImageLoad };
};