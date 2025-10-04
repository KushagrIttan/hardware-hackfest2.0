import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  intense?: boolean;
}

const GlitchText = ({ children, className, intense = false }: GlitchTextProps) => {
  return (
    <span
      className={cn(
        "inline-block relative",
        intense && "animate-glitch-text",
        className
      )}
    >
      {children}
    </span>
  );
};

export default GlitchText;
