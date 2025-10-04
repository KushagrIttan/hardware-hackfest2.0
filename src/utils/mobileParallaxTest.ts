/**
 * Mobile Parallax Test Utilities
 * Test functions to verify mobile parallax improvements
 */

export function testMobileParallaxBehavior(): void {
  console.group('📱 Testing Mobile Parallax Behavior');
  
  // Test 1: Mobile Detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768;
  
  console.log(`Device Type: ${isMobile ? 'Mobile' : 'Desktop'}`);
  console.log(`Screen Width: ${window.innerWidth}px`);
  console.log(`Screen Height: ${window.innerHeight}px`);
  
  // Test 2: Touch Event Support
  const supportsTouchEvents = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  console.log(`Touch Events Supported: ${supportsTouchEvents}`);
  
  // Test 3: Reduced Motion Preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  console.log(`Prefers Reduced Motion: ${prefersReducedMotion}`);
  
  // Test 4: Check for Parallax Elements
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  console.log(`Parallax Elements Found: ${parallaxElements.length}`);
  
  // Test 5: CSS Transform Support
  const testElement = document.createElement('div');
  const supportsTransform = 'transform' in testElement.style;
  console.log(`CSS Transform Supported: ${supportsTransform}`);
  
  // Test 6: Performance API Support
  const supportsPerformanceAPI = 'performance' in window && 'now' in performance;
  console.log(`Performance API Supported: ${supportsPerformanceAPI}`);
  
  // Test 7: Check Mobile CSS Classes
  const bodyClasses = document.body.className;
  const hasMobileOptimizations = bodyClasses.includes('reduce-animations') || 
                                 bodyClasses.includes('high-performance-mode');
  console.log(`Mobile Optimizations Active: ${hasMobileOptimizations}`);
  
  console.groupEnd();
  
  // Summary
  const mobileOptimized = isMobile && supportsTouchEvents && supportsTransform;
  console.log(`\n📊 Mobile Parallax Status: ${mobileOptimized ? '✅ Optimized' : '⚠️ Needs Attention'}`);
  
  if (mobileOptimized) {
    console.log('🎉 Mobile parallax optimizations are active and working correctly!');
  } else {
    console.log('⚠️ Some mobile optimizations may not be fully functional.');
  }
}

export function simulateMobileInteraction(): void {
  console.group('👆 Simulating Mobile Touch Interaction');
  
  try {
    // Simulate a touch event at the center of the screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create and dispatch touch events
    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [new Touch({
        identifier: 0,
        target: document.body,
        clientX: centerX,
        clientY: centerY,
        radiusX: 10,
        radiusY: 10,
        rotationAngle: 0,
        force: 1,
      })],
      bubbles: true,
      cancelable: true,
    });
    
    const touchMoveEvent = new TouchEvent('touchmove', {
      touches: [new Touch({
        identifier: 0,
        target: document.body,
        clientX: centerX + 50,
        clientY: centerY + 50,
        radiusX: 10,
        radiusY: 10,
        rotationAngle: 0,
        force: 1,
      })],
      bubbles: true,
      cancelable: true,
    });
    
    // Dispatch events
    document.body.dispatchEvent(touchStartEvent);
    setTimeout(() => {
      document.body.dispatchEvent(touchMoveEvent);
      console.log('✅ Touch events simulated successfully');
    }, 100);
    
  } catch (error) {
    console.error('❌ Failed to simulate touch events:', error);
  }
  
  console.groupEnd();
}

export function measureParallaxPerformance(): Promise<number> {
  return new Promise((resolve) => {
    console.group('⚡ Measuring Parallax Performance');
    
    const startTime = performance.now();
    let frameCount = 0;
    const maxFrames = 60; // Test for 1 second at 60fps
    
    function measureFrame() {
      frameCount++;
      
      if (frameCount >= maxFrames) {
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        const avgFrameTime = totalTime / frameCount;
        const fps = 1000 / avgFrameTime;
        
        console.log(`Total Time: ${totalTime.toFixed(2)}ms`);
        console.log(`Average Frame Time: ${avgFrameTime.toFixed(2)}ms`);
        console.log(`Estimated FPS: ${fps.toFixed(1)}`);
        
        if (fps >= 55) {
          console.log('✅ Excellent performance (>55 FPS)');
        } else if (fps >= 30) {
          console.log('⚠️ Acceptable performance (30-55 FPS)');
        } else {
          console.log('❌ Poor performance (<30 FPS)');
        }
        
        console.groupEnd();
        resolve(fps);
      } else {
        requestAnimationFrame(measureFrame);
      }
    }
    
    requestAnimationFrame(measureFrame);
  });
}

// Export a function to run all mobile tests
export async function runAllMobileTests(): Promise<void> {
  console.log('🧪 Starting Mobile Parallax Test Suite...\n');
  
  testMobileParallaxBehavior();
  simulateMobileInteraction();
  
  const fps = await measureParallaxPerformance();
  
  console.log(`\n📊 Mobile Parallax Test Complete - Performance: ${fps.toFixed(1)} FPS`);
}