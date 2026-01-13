"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export const InfiniteSlider = ({
  children,
  gap = 20,
  speed = 20,
  direction = "left",
  className,
}: InfiniteSliderProps) => {
  return (
    <div
      className={cn("wrapper group overflow-hidden flex", className)}
      style={{
        "--gap": `${gap}px`,
        "--duration": `${speed}s`,
      } as React.CSSProperties}
    >
      <div
        className={cn(
          "track flex gap-[var(--gap)]",
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        )}
      >
        {children}
        {children}
      </div>
       <style jsx>{`
        .animate-scroll-left {
            animation: scroll-left var(--duration) linear infinite;
        }
        .animate-scroll-right {
             animation: scroll-right var(--duration) linear infinite;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - var(--gap)/2)); }
        }
         @keyframes scroll-right {
          0% { transform: translateX(calc(-50% - var(--gap)/2)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
