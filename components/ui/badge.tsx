import * as React from "react";
import { cn } from "@/lib/utils";

// Enhanced Badge Component
const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "outline" | "destructive" | "gold";
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-sans transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-anglican-purple-600 text-white shadow-sm": variant === "default",
          "bg-anglican-purple-100 text-anglican-purple-800":
            variant === "secondary",
          "border border-anglican-purple-600 text-anglican-purple-600 bg-white":
            variant === "outline",
          "bg-red-100 text-red-800": variant === "destructive",
          "bg-anglican-gold text-anglican-purple-800 shadow-sm font-semibold":
            variant === "gold",
        },
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
