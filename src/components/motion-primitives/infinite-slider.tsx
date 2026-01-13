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

    </div>
  );
};
