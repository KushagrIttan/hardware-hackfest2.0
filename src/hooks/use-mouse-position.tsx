import { useState, useEffect } from "react";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  });

  useEffect(() => {
    // Initialize with center position
    setMousePosition({ 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2 
    });

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Handle touch events for mobile devices
    const updateTouchPosition = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("touchmove", updateTouchPosition, { passive: true });
    window.addEventListener("touchstart", updateTouchPosition, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("touchmove", updateTouchPosition);
      window.removeEventListener("touchstart", updateTouchPosition);
    };
  }, []);

  return mousePosition;
};
