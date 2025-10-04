import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: "default" | "outline";
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ children, className, variant = "default", ...props }, ref) => {
    const baseClasses = "font-mono-heading font-bold tracking-wider relative overflow-hidden transition-all duration-300";
    
    if (variant === "outline") {
      return (
        <Button
          ref={ref}
          variant="outline"
          className={cn(
            baseClasses,
            "border-2 border-neon text-neon hover:bg-neon hover:text-background glow-neon hover:glow-strong",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        className={cn(
          baseClasses,
          "bg-neon text-background hover:bg-neon/90 glow-neon hover:glow-strong animate-neon-pulse",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

NeonButton.displayName = "NeonButton";

export default NeonButton;
