import { useMousePosition } from "@/hooks/use-mouse-position";
import { ReactNode, useRef, useEffect, useState } from "react";

interface ParallaxContainerProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

const ParallaxContainer = ({ children, intensity = 20, className = "" }: ParallaxContainerProps) => {
  const { x, y } = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
      
      // On mobile, set initial position to center (no parallax until interaction)
      if (isMobileDevice && !hasInteracted) {
        setTouchPosition({ 
          x: window.innerWidth / 2, 
          y: window.innerHeight / 2 
        });
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [hasInteracted]);

  // Handle touch events on mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setTouchPosition({ x: touch.clientX, y: touch.clientY });
        setHasInteracted(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setTouchPosition({ x: touch.clientX, y: touch.clientY });
        setHasInteracted(true);
      }
    };

    // Also handle mouse events for hybrid devices
    const handleMouseMove = (e: MouseEvent) => {
      setTouchPosition({ x: e.clientX, y: e.clientY });
      setHasInteracted(true);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Use touch position on mobile, mouse position on desktop
    const currentX = isMobile ? touchPosition.x : x;
    const currentY = isMobile ? touchPosition.y : y;
    
    // Reduce intensity on mobile for better performance and less jarring movement
    const effectiveIntensity = isMobile ? intensity * 0.3 : intensity;
    
    // Calculate deltas
    const deltaX = (currentX - centerX) / rect.width;
    const deltaY = (currentY - centerY) / rect.height;
    
    // Clamp the values to prevent extreme movements
    const clampedDeltaX = Math.max(-0.5, Math.min(0.5, deltaX));
    const clampedDeltaY = Math.max(-0.5, Math.min(0.5, deltaY));
    
    // Apply transform with smoother transition on mobile
    const transformValue = `translate(${clampedDeltaX * effectiveIntensity}px, ${clampedDeltaY * effectiveIntensity}px)`;
    
    if (isMobile) {
      // Smoother transitions on mobile
      containerRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    } else {
      // Faster transitions on desktop
      containerRef.current.style.transition = 'transform 0.3s ease-out';
    }
    
    containerRef.current.style.transform = transformValue;
  }, [x, y, touchPosition, intensity, isMobile]);

  // Disable parallax entirely if user prefers reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (containerRef.current) {
        containerRef.current.style.transform = 'translate(0px, 0px)';
      }
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`${isMobile ? 'will-change-transform' : 'transition-transform duration-300 ease-out'} ${className}`}
      style={{
        // Ensure proper initial positioning on mobile
        transform: isMobile && !hasInteracted ? 'translate(0px, 0px)' : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;
