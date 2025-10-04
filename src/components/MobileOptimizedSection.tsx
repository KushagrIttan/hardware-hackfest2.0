import React, { ReactNode, useEffect, useState } from 'react';

interface MobileOptimizedSectionProps {
  children: ReactNode;
  className?: string;
  preventOverlap?: boolean;
  mobileSpacing?: 'tight' | 'normal' | 'loose';
}

const MobileOptimizedSection: React.FC<MobileOptimizedSectionProps> = ({
  children,
  className = '',
  preventOverlap = true,
  mobileSpacing = 'normal',
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getSpacingClass = () => {
    if (!isMobile) return '';
    
    switch (mobileSpacing) {
      case 'tight':
        return 'py-8';
      case 'loose':
        return 'py-24';
      default:
        return 'py-16';
    }
  };

  const getMobileOptimizationClasses = () => {
    if (!isMobile) return '';
    
    return [
      preventOverlap ? 'relative z-10' : '',
      'overflow-hidden', // Prevent horizontal scroll from parallax
      'min-h-0', // Prevent unnecessary height expansion
    ].filter(Boolean).join(' ');
  };

  return (
    <div 
      className={`
        ${className} 
        ${getSpacingClass()} 
        ${getMobileOptimizationClasses()}
      `}
      style={{
        // Ensure proper stacking context on mobile
        isolation: isMobile ? 'isolate' : 'auto',
      }}
    >
      {children}
    </div>
  );
};

export default MobileOptimizedSection;