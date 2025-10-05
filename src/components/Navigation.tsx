import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollHeader } from "@/hooks/useScrollHeader";

const Navigation = () => {
  const location = useLocation();
  const isHeaderVisible = useScrollHeader();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-neon/30 transition-all duration-300 ease-in-out ${
      isHeaderVisible ? 'top-[73px]' : 'top-0'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-mono-heading text-2xl font-bold text-neon hover:glow-neon transition-all">
          HHF<span className="text-foreground">_</span>2.0
        </Link>

        <div className="flex gap-8">
          <Link
            to="/"
            className={cn(
              "font-mono-heading font-bold relative pb-1 transition-all",
              isActive("/")
                ? "text-neon after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-neon after:glow-neon"
                : "text-muted-foreground hover:text-neon"
            )}
          >
            HOME
          </Link>
          <Link
            to="/schedule"
            className={cn(
              "font-mono-heading font-bold relative pb-1 transition-all",
              isActive("/schedule")
                ? "text-neon after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-neon after:glow-neon"
                : "text-muted-foreground hover:text-neon"
            )}
          >
            SCHEDULE
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
