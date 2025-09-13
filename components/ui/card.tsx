import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-100/50 hover:-translate-y-1 hover:border-purple-200",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex flex-col space-y-2 p-6 pb-4",
      // Add gradient overlay for enhanced visual appeal
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-50/30 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-10 font-serif text-2xl font-bold leading-tight tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-purple-800",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-10 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("relative z-10 p-6 pt-2", className)} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-10 flex items-center justify-between p-6 pt-0 border-t border-gray-100/80 mt-4",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Enhanced Card Variants for different use cases
const CardHighlight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative overflow-hidden rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-white via-purple-50/30 to-white backdrop-blur-sm text-gray-900 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-200/60 hover:-translate-y-2 hover:border-purple-300 hover:scale-[1.02]",
      // Add decorative elements
      "before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-purple-500 before:via-yellow-400 before:to-purple-600",
      "after:absolute after:top-4 after:right-4 after:w-2 after:h-2 after:bg-purple-400 after:rounded-full after:opacity-60",
      className
    )}
    {...props}
  />
))
CardHighlight.displayName = "CardHighlight"

const CardGlass = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl text-gray-900 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:bg-white/20 hover:-translate-y-1",
      // Glass effect with subtle gradients
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300",
      "after:absolute after:inset-0 after:bg-gradient-to-t after:from-purple-900/5 after:to-transparent",
      className
    )}
    {...props}
  />
))
CardGlass.displayName = "CardGlass"

const CardMetric = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/50 text-center text-gray-900 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-100/40 hover:-translate-y-1 hover:from-purple-50 hover:to-white",
      // Add metric-specific styling
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-600/5 before:to-yellow-400/5 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300",
      className
    )}
    {...props}
  />
))
CardMetric.displayName = "CardMetric"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardHighlight,
  CardGlass,
  CardMetric
}