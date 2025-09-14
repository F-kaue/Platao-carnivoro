
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "image" | "text" | "minimal";
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, variant = "text", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl", 
    lg: "text-2xl"
  };

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <div className="w-8 h-8 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full opacity-80"></div>
        </div>
        <span className={cn("font-diogenes font-bold text-foreground", sizeClasses[size])}>
          PLATÃO
        </span>
      </div>
    );
  }

  if (variant === "image") {
    return (
      <div className={cn("flex flex-col items-start", className)}>
        <div className="relative">
          {/* Silhueta de estátua clássica como background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gray-rose/20 to-brand-brown/20 rounded-full blur-sm"></div>
          <div className="relative bg-gradient-to-br from-brand-lilac/30 to-brand-gray-rose/40 rounded-full p-3 backdrop-blur-sm">
            <div className="w-6 h-6 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full opacity-90"></div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          <span className={cn("font-diogenes font-bold text-foreground leading-tight", sizeClasses[size])}>
            PLATÃO
          </span>
          <span className={cn("font-augustus font-medium text-brand-brown/80 leading-tight -mt-1", sizeClasses[size])}>
            CARNÍVORO
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <span className={cn("font-diogenes font-bold text-foreground leading-tight", sizeClasses[size])}>
        PLATÃO
      </span>
      <span className={cn("font-augustus font-medium text-brand-brown leading-tight -mt-1", sizeClasses[size])}>
        CARNÍVORO
      </span>
    </div>
  );
}
