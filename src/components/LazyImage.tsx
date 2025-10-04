import React, { useState, useRef, useEffect } from 'react';
import { BatteryOptimizer } from '@/utils/performance';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  lowQualitySrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  lowQualitySrc,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const batteryOptimizer = BatteryOptimizer.getInstance();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const optimizationLevel = batteryOptimizer.getOptimizationLevel();
    
    // Choose appropriate image source based on battery optimization
    let imageSrc = src;
    
    if (optimizationLevel === 'high' && lowQualitySrc) {
      imageSrc = lowQualitySrc;
    } else if (optimizationLevel === 'medium' && lowQualitySrc) {
      // Use low quality first, then upgrade
      imageSrc = lowQualitySrc;
    }

    setCurrentSrc(imageSrc);

    // Preload the image
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
      onLoad?.();
      
      // If we loaded low quality and battery allows, upgrade to high quality
      if (optimizationLevel === 'medium' && imageSrc === lowQualitySrc && src !== lowQualitySrc) {
        setTimeout(() => {
          const highQualityImg = new Image();
          highQualityImg.onload = () => {
            setCurrentSrc(src);
          };
          highQualityImg.src = src;
        }, 1000); // Delay upgrade by 1 second
      }
    };
    
    img.onerror = () => {
      setHasError(true);
      onError?.();
    };
    
    img.src = imageSrc;
  }, [isInView, src, lowQualitySrc, onLoad, onError, batteryOptimizer]);

  // Generate placeholder based on image dimensions
  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    // Create a simple gradient placeholder
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666" font-family="monospace" font-size="14">Loading...</text>
      </svg>
    `)}`;
  };

  if (hasError) {
    return (
      <div 
        ref={imgRef}
        className={`bg-muted flex items-center justify-center text-muted-foreground ${className}`}
        style={{ minHeight: '200px' }}
      >
        <span className="font-mono-heading text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && (
        <img
          src={getPlaceholder()}
          alt=""
          className="w-full h-full object-cover filter blur-sm"
          style={{ 
            transition: 'opacity 0.3s ease-in-out',
            opacity: isInView ? 0.7 : 1 
          }}
        />
      )}
      
      {/* Actual image */}
      {isInView && currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${!isLoaded ? 'absolute inset-0' : ''}`}
          loading="lazy"
          decoding="async"
        />
      )}
      
      {/* Loading indicator for mobile */}
      {isInView && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/20">
          <div className="w-8 h-8 border-2 border-neon border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LazyImage;