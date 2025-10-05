import { useState, useEffect } from "react";
import { useScrollHeader } from "@/hooks/useScrollHeader";

const LogoHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isHeaderVisible = useScrollHeader();
  const [imageErrors, setImageErrors] = useState({
    ieeeGen: false,
    elysian: false,
    ieeeW: false
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleImageError = (logoType: keyof typeof imageErrors) => {
    setImageErrors(prev => ({ ...prev, [logoType]: true }));
  };

  return (
    <div className={`fixed left-0 right-0 z-[60] bg-background/95 backdrop-blur-sm border-b border-dashed border-border transition-all duration-300 ease-in-out ${
      isHeaderVisible ? 'top-0 opacity-100' : '-top-20 opacity-0'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* IEEE Gen Logo - Left */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative group">
              {/* White glow background for IEEE Gen logo */}
              <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm scale-110 opacity-60 group-hover:opacity-80 transition-all duration-300" />
              <div className="absolute inset-0 bg-white/10 rounded-lg blur-md scale-125 opacity-40 group-hover:opacity-60 transition-all duration-300" />
              
              {!imageErrors.ieeeGen ? (
                <img
                  src="/logos/ieee-gen-logo.png"
                  alt="IEEE Gen Logo"
                  className="relative h-12 w-auto object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-105 z-10"
                  onError={() => handleImageError('ieeeGen')}
                />
              ) : (
                <div className="relative h-12 px-4 flex items-center justify-center border border-neon/30 rounded-lg bg-background/50 z-10">
                  <span className="text-neon font-mono-heading text-sm font-bold">IEEE GEN</span>
                </div>
              )}
              <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-20" />
            </div>
          </div>

          {/* Elysian Logo - Center */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <div className="relative group">
              {/* Subtle golden glow for Elysian logo */}
              <div className="absolute inset-0 bg-yellow-400/10 rounded-lg blur-sm scale-110 opacity-30 group-hover:opacity-50 transition-all duration-300" />
              
              {!imageErrors.elysian ? (
                <img
                  src="/logos/elysian-logo.png"
                  alt="Elysian Logo"
                  className="relative h-14 w-auto object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-105 z-10"
                  onError={() => handleImageError('elysian')}
                />
              ) : (
                <div className="relative h-14 px-6 flex items-center justify-center border border-neon/30 rounded-lg bg-background/50 z-10">
                  <span className="text-neon font-mono-heading text-lg font-bold">ELYSIAN</span>
                </div>
              )}
              <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-20" />
            </div>
          </div>

          {/* IEEE W Logo - Right */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative group">
              {/* White glow background for IEEE WIE logo */}
              <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm scale-110 opacity-60 group-hover:opacity-80 transition-all duration-300" />
              <div className="absolute inset-0 bg-white/10 rounded-lg blur-md scale-125 opacity-40 group-hover:opacity-60 transition-all duration-300" />
              
              {!imageErrors.ieeeW ? (
                <img
                  src="/logos/ieee-w-logo.png"
                  alt="IEEE Women in Engineering Logo"
                  className="relative h-12 w-auto object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-105 z-10"
                  onError={() => handleImageError('ieeeW')}
                />
              ) : (
                <div className="relative h-12 px-4 flex items-center justify-center border border-neon/30 rounded-lg bg-background/50 z-10">
                  <span className="text-neon font-mono-heading text-sm font-bold">IEEE WIE</span>
                </div>
              )}
              <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-20" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
    </div>
  );
};

export default LogoHeader;