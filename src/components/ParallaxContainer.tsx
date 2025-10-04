import { useMousePosition } from "@/hooks/use-mouse-position";
import { ReactNode, useRef, useEffect } from "react";

interface ParallaxContainerProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

const ParallaxContainer = ({ children, intensity = 20, className = "" }: ParallaxContainerProps) => {
  const { x, y } = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (x - centerX) / rect.width;
    const deltaY = (y - centerY) / rect.height;
    
    containerRef.current.style.transform = `translate(${deltaX * intensity}px, ${deltaY * intensity}px)`;
  }, [x, y, intensity]);

  return (
    <div ref={containerRef} className={`transition-transform duration-300 ease-out ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxContainer;
