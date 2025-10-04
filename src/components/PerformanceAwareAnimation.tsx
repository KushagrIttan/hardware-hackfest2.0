import React, { useEffect, useState, ReactNode } from 'react';
import { BatteryOptimizer } from '@/utils/performance';

interface PerformanceAwareAnimationProps {
  children: ReactNode;
  className?: string;
  animationType?: 'slide' | 'fade' | 'scale' | 'rotate' | 'float' | 'glitch';
  intensity?: 'low' | 'medium' | 'high';
  delay?: number;
  duration?: number;
  disabled?: boolean;
}

const PerformanceAwareAnimation: React.FC<PerformanceAwareAnimationProps> = ({
  children,
  className = '',
  animationType = 'fade',
  intensity = 'medium',
  delay = 0,
  duration = 500,
  disabled = false,
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const batteryOptimizer = BatteryOptimizer.getInstance();

  useEffect(() => {
    const checkAnimationPermission = () => {
      const optimizationLevel = batteryOptimizer.getOptimizationLevel();
      const shouldReduceAnimations = batteryOptimizer.shouldReduceAnimations();
      
      // Disable animations based on battery optimization
      if (shouldReduceAnimations || optimizationLevel === 'high') {
        setShouldAnimate(false);
        setIsVisible(true); // Show content immediately
        return;
      }
      
      // Reduce animation intensity based on battery level
      if (optimizationLevel === 'medium' && intensity === 'high') {
        setShouldAnimate(false);
        setIsVisible(true);
        return;
      }
      
      setShouldAnimate(true);
    };

    checkAnimationPermission();

    // Listen for battery optimization changes
    const handleBatteryOptimization = (event: CustomEvent) => {
      checkAnimationPermission();
    };

    window.addEventListener('batteryOptimization', handleBatteryOptimization as EventListener);
    
    return () => {
      window.removeEventListener('batteryOptimization', handleBatteryOptimization as EventListener);
    };
  }, [batteryOptimizer, intensity]);

  useEffect(() => {
    if (!shouldAnimate || disabled) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [shouldAnimate, disabled, delay]);

  const getAnimationClasses = (): string => {
    if (!shouldAnimate || disabled) {
      return '';
    }

    const baseClasses = 'transition-all ease-out';
    const durationClass = `duration-${Math.min(duration, 1000)}`; // Cap at 1000ms for performance
    
    switch (animationType) {
      case 'slide':
        return `${baseClasses} ${durationClass} ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`;
      
      case 'fade':
        return `${baseClasses} ${durationClass} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`;
      
      case 'scale':
        return `${baseClasses} ${durationClass} ${
          isVisible 
            ? 'scale-100 opacity-100' 
            : 'scale-95 opacity-0'
        }`;
      
      case 'rotate':
        return `${baseClasses} ${durationClass} ${
          isVisible 
            ? 'rotate-0 opacity-100' 
            : 'rotate-12 opacity-0'
        }`;
      
      case 'float':
        return `${baseClasses} ${durationClass} ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-4 opacity-0'
        }`;
      
      case 'glitch':
        // Simplified glitch effect for performance
        return `${baseClasses} ${durationClass} ${
          isVisible 
            ? 'opacity-100' 
            : 'opacity-0'
        }`;
      
      default:
        return `${baseClasses} ${durationClass} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`;
    }
  };

  const getPerformanceOptimizedStyles = (): React.CSSProperties => {
    if (!shouldAnimate || disabled) {
      return {};
    }

    // Use transform and opacity for better performance
    return {
      willChange: isVisible ? 'auto' : 'transform, opacity',
      backfaceVisibility: 'hidden',
      perspective: '1000px',
    };
  };

  return (
    <div
      className={`${getAnimationClasses()} ${className}`}
      style={getPerformanceOptimizedStyles()}
    >
      {children}
    </div>
  );
};

// Hook for checking if animations should be enabled
export const useAnimationPermission = () => {
  const [canAnimate, setCanAnimate] = useState(true);
  const batteryOptimizer = BatteryOptimizer.getInstance();

  useEffect(() => {
    const checkPermission = () => {
      const shouldReduce = batteryOptimizer.shouldReduceAnimations();
      const optimizationLevel = batteryOptimizer.getOptimizationLevel();
      
      setCanAnimate(!shouldReduce && optimizationLevel !== 'high');
    };

    checkPermission();

    const handleBatteryOptimization = () => {
      checkPermission();
    };

    window.addEventListener('batteryOptimization', handleBatteryOptimization);
    
    return () => {
      window.removeEventListener('batteryOptimization', handleBatteryOptimization);
    };
  }, [batteryOptimizer]);

  return canAnimate;
};

export default PerformanceAwareAnimation;