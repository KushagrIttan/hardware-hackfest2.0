import { useState, useEffect } from "react";

export const useScrollHeader = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only show header when at the very top of the page
      if (currentScrollY < 50) {
        setIsHeaderVisible(true);
      } else {
        // Hide header when scrolled away from top
        setIsHeaderVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return isHeaderVisible;
};