import { useMousePosition } from "@/hooks/use-mouse-position";
import { useEffect, useRef } from "react";

const CursorFollower = () => {
  const { x, y } = useMousePosition();
  const followerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (followerRef.current) {
      followerRef.current.style.left = `${x}px`;
      followerRef.current.style.top = `${y}px`;
    }
    
    if (trailRef.current) {
      // Slower trail for parallax effect
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.left = `${x}px`;
          trailRef.current.style.top = `${y}px`;
        }
      }, 100);
    }
  }, [x, y]);

  return (
    <>
      {/* Trail circle */}
      <div
        ref={trailRef}
        className="fixed w-32 h-32 pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          background: "radial-gradient(circle, hsl(var(--neon-cyan) / 0.15) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Main cursor glow */}
      <div
        ref={followerRef}
        className="fixed w-6 h-6 border-2 border-neon rounded-full pointer-events-none z-50 transition-all duration-75"
        style={{
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 20px hsl(var(--neon-cyan) / 0.6)",
        }}
      />
    </>
  );
};

export default CursorFollower;
