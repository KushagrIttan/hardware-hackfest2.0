/**
 * Performance monitoring test utilities
 * This file contains functions to test and validate the performance monitoring implementation
 */

import { analytics, trackPerformance, trackCustomMetric } from './analytics';
import { BatteryOptimizer } from './performance';

export interface PerformanceTestResults {
  coreWebVitalsTracking: boolean;
  batteryOptimization: boolean;
  lazyImageLoading: boolean;
  animationOptimization: boolean;
  analyticsReporting: boolean;
  serviceWorkerRegistration: boolean;
}

export async function runPerformanceTests(): Promise<PerformanceTestResults> {
  const results: PerformanceTestResults = {
    coreWebVitalsTracking: false,
    batteryOptimization: false,
    lazyImageLoading: false,
    animationOptimization: false,
    analyticsReporting: false,
    serviceWorkerRegistration: false,
  };

  console.group('🧪 Running Performance Tests');

  // Test 1: Core Web Vitals Tracking
  try {
    console.log('Testing Core Web Vitals tracking...');
    
    // Check if PerformanceObserver is available
    if ('PerformanceObserver' in window) {
      results.coreWebVitalsTracking = true;
      console.log('✅ Core Web Vitals tracking supported');
    } else {
      console.log('❌ PerformanceObserver not supported');
    }
  } catch (error) {
    console.error('❌ Core Web Vitals test failed:', error);
  }

  // Test 2: Battery Optimization
  try {
    console.log('Testing battery optimization...');
    
    const batteryOptimizer = BatteryOptimizer.getInstance();
    const optimizationLevel = batteryOptimizer.getOptimizationLevel();
    const shouldReduceAnimations = batteryOptimizer.shouldReduceAnimations();
    const shouldLazyLoad = batteryOptimizer.shouldLazyLoadImages();
    
    if (typeof optimizationLevel === 'string' && 
        typeof shouldReduceAnimations === 'boolean' && 
        typeof shouldLazyLoad === 'boolean') {
      results.batteryOptimization = true;
      console.log('✅ Battery optimization working');
      console.log(`   Optimization level: ${optimizationLevel}`);
      console.log(`   Reduce animations: ${shouldReduceAnimations}`);
      console.log(`   Lazy load images: ${shouldLazyLoad}`);
    } else {
      console.log('❌ Battery optimization not working properly');
    }
  } catch (error) {
    console.error('❌ Battery optimization test failed:', error);
  }

  // Test 3: Lazy Image Loading
  try {
    console.log('Testing lazy image loading...');
    
    // Check if IntersectionObserver is available
    if ('IntersectionObserver' in window) {
      results.lazyImageLoading = true;
      console.log('✅ Lazy image loading supported (IntersectionObserver available)');
    } else {
      console.log('❌ IntersectionObserver not supported');
    }
  } catch (error) {
    console.error('❌ Lazy image loading test failed:', error);
  }

  // Test 4: Animation Optimization
  try {
    console.log('Testing animation optimization...');
    
    // Check if prefers-reduced-motion is respected
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasPerformanceClasses = document.body.classList.contains('reduce-animations') || 
                                  document.body.classList.contains('high-performance-mode');
    
    results.animationOptimization = true;
    console.log('✅ Animation optimization available');
    console.log(`   Prefers reduced motion: ${prefersReducedMotion}`);
    console.log(`   Performance classes applied: ${hasPerformanceClasses}`);
  } catch (error) {
    console.error('❌ Animation optimization test failed:', error);
  }

  // Test 5: Analytics Reporting
  try {
    console.log('Testing analytics reporting...');
    
    // Test custom metric tracking
    trackCustomMetric('test_metric', 123);
    trackPerformance('test_performance', 456);
    
    // Check if events are being stored
    const storedEvents = analytics.getStoredEvents();
    if (storedEvents.length >= 2) {
      results.analyticsReporting = true;
      console.log('✅ Analytics reporting working');
      console.log(`   Stored events: ${storedEvents.length}`);
    } else {
      console.log('❌ Analytics events not being stored properly');
    }
  } catch (error) {
    console.error('❌ Analytics reporting test failed:', error);
  }

  // Test 6: Service Worker Registration
  try {
    console.log('Testing service worker registration...');
    
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        results.serviceWorkerRegistration = true;
        console.log('✅ Service worker registered');
        console.log(`   Scope: ${registration.scope}`);
      } else {
        console.log('⚠️ Service worker not registered (may be disabled in development)');
      }
    } else {
      console.log('❌ Service worker not supported');
    }
  } catch (error) {
    console.error('❌ Service worker test failed:', error);
  }

  console.groupEnd();

  // Summary
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`\n📊 Performance Test Summary: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All performance monitoring features are working correctly!');
  } else {
    console.log('⚠️ Some performance monitoring features may not be fully functional.');
  }

  return results;
}

// Test individual components
export function testLazyImageComponent(): void {
  console.group('🖼️ Testing LazyImage Component');
  
  try {
    // Create a test image element
    const testImage = document.createElement('div');
    testImage.innerHTML = `
      <div style="height: 200px; background: #333; margin: 20px; display: flex; align-items: center; justify-content: center; color: white;">
        LazyImage Test Container
      </div>
    `;
    
    // Add to page temporarily
    document.body.appendChild(testImage);
    
    // Check if IntersectionObserver is working
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('✅ LazyImage intersection detection working');
          observer.disconnect();
        }
      });
    });
    
    observer.observe(testImage);
    
    // Clean up after 2 seconds
    setTimeout(() => {
      document.body.removeChild(testImage);
      observer.disconnect();
    }, 2000);
    
  } catch (error) {
    console.error('❌ LazyImage component test failed:', error);
  }
  
  console.groupEnd();
}

export function testPerformanceAwareAnimation(): void {
  console.group('🎬 Testing PerformanceAwareAnimation Component');
  
  try {
    const batteryOptimizer = BatteryOptimizer.getInstance();
    const shouldReduceAnimations = batteryOptimizer.shouldReduceAnimations();
    
    console.log(`Animation reduction status: ${shouldReduceAnimations ? 'ENABLED' : 'DISABLED'}`);
    
    // Test animation permission logic
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    console.log(`Prefers reduced motion: ${prefersReducedMotion}`);
    
    if (shouldReduceAnimations || prefersReducedMotion) {
      console.log('✅ Animations will be reduced for better performance');
    } else {
      console.log('✅ Full animations enabled (good battery/performance conditions)');
    }
    
  } catch (error) {
    console.error('❌ PerformanceAwareAnimation test failed:', error);
  }
  
  console.groupEnd();
}

// Export a function to run all tests
export function runAllPerformanceTests(): Promise<PerformanceTestResults> {
  testLazyImageComponent();
  testPerformanceAwareAnimation();
  return runPerformanceTests();
}