
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textSize?: "sm" | "md" | "lg";
}

export function Logo({ className, textSize = "md" }: LogoProps) {
  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span 
        className={cn(
          "font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400",
          textClasses[textSize]
        )}
      >
        Achadinhos
      </span>
    </div>
  );
}
