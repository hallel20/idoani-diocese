import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styling with modern rounded corners and enhanced spacing
          "flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm px-4 py-3 text-base font-medium text-gray-700 shadow-sm transition-all duration-300",
          // Placeholder styling
          "placeholder:text-gray-400 placeholder:font-normal",
          // Focus states with purple accent
          "focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 focus:shadow-lg",
          // Hover states
          "hover:border-purple-300 hover:shadow-md hover:bg-white",
          // File input specific styling
          "file:mr-4 file:rounded-lg file:border-0 file:bg-purple-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-purple-700 file:hover:bg-purple-100 file:transition-colors",
          // Disabled states
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100 disabled:opacity-60",
          // Invalid states
          "invalid:border-red-300 invalid:focus:border-red-500 invalid:focus:ring-red-100",
          // Enhanced mobile responsiveness
          "md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

// Enhanced Input variants for specific use cases
const InputSearch = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        type="search"
        className={cn(
          "pl-12 pr-4",
          // Search-specific enhancements
          "focus:pl-12 focus:shadow-purple-200/50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
InputSearch.displayName = "InputSearch"

const InputFloatingLabel = React.forwardRef<
  HTMLInputElement, 
  React.ComponentProps<"input"> & { label: string }
>(({ className, label, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)

  return (
    <div className="relative">
      <Input
        className={cn(
          "peer pt-6 pb-2",
          className
        )}
        onFocus={(e) => {
          setIsFocused(true)
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          setHasValue(e.target.value !== '')
          props.onBlur?.(e)
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== '')
          props.onChange?.(e)
        }}
        ref={ref}
        {...props}
      />
      <label className={cn(
        "absolute left-4 text-gray-400 transition-all duration-200 pointer-events-none",
        (isFocused || hasValue) 
          ? "top-2 text-xs font-semibold text-purple-600" 
          : "top-3.5 text-base"
      )}>
        {label}
      </label>
    </div>
  )
})
InputFloatingLabel.displayName = "InputFloatingLabel"

export { Input, InputSearch, InputFloatingLabel }