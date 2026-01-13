
import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  className?: string;
  direction?: "left" | "right" | "top" | "bottom";
  blurIntensity?: number;
}

export const ProgressiveBlur = ({
  className,
  direction = "left",
  blurIntensity = 1,
}: ProgressiveBlurProps) => {
  const gradient =
    direction === "left"
      ? "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)"
      : direction === "right"
      ? "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)"
      : "none";

  return (
    <div
      className={cn("z-10", className)}
      style={{
        background: "transparent",
        backdropFilter: `blur(${blurIntensity * 4}px)`,
        WebkitMaskImage: gradient,
        maskImage: gradient,
      }}
    />
  );
};
