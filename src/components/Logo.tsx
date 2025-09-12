
import { cn } from "@/lib/utils";
import logoPrincipal from "@/assets/logo-principal.png";

interface LogoProps {
  className?: string;
  variant?: "image" | "text";
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, variant = "image", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: variant === "image" ? "h-8" : "text-lg",
    md: variant === "image" ? "h-12" : "text-xl", 
    lg: variant === "image" ? "h-16" : "text-2xl"
  };

  if (variant === "image") {
    return (
      <div className={cn("flex items-center", className)}>
        <img 
          src={logoPrincipal}
          alt="Platão Carnívoro"
          className={cn("object-contain", sizeClasses[size])}
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <span 
        className={cn(
          "font-diogenes font-bold tracking-tight text-foreground",
          sizeClasses[size]
        )}
      >
        PLATÃO CARNÍVORO
      </span>
    </div>
  );
}
