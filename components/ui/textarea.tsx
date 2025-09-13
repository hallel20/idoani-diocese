import * as React from "react"

// A utility function to conditionally join Tailwind CSS classes.
// This is a simplified version of the 'clsx' or 'tailwind-merge' library.
const cn = (...classes: (string | boolean | null | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Define props for the base Textarea component
interface TextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {}

// Base Textarea component with the same styling as the Input component.
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styling with modern rounded corners and enhanced spacing
          "flex min-h-[120px] w-full rounded-xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm px-4 py-3 text-base font-medium text-gray-700 shadow-sm transition-all duration-300",
          // Placeholder styling
          "placeholder:text-gray-400 placeholder:font-normal",
          // Focus states with purple accent
          "focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 focus:shadow-lg",
          // Hover states
          "hover:border-purple-300 hover:shadow-md hover:bg-white",
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
    );
  }
);
Textarea.displayName = "Textarea";

// Define props for the TextareaFloatingLabel component
interface TextareaFloatingLabelProps extends React.ComponentPropsWithoutRef<"textarea"> {
  label: string;
}

// Textarea variant with a floating label.
const TextareaFloatingLabel = React.forwardRef<HTMLTextAreaElement, TextareaFloatingLabelProps>(
  ({ className, label, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const [hasValue, setHasValue] = React.useState<boolean>(false);

    return (
      <div className="relative">
        <Textarea
          className={cn(
            "peer pt-6 pb-2",
            className
          )}
          onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
            setIsFocused(false);
            setHasValue(e.target.value !== "");
            props.onBlur?.(e);
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setHasValue(e.target.value !== "");
            props.onChange?.(e);
          }}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "absolute left-4 text-gray-400 transition-all duration-200 pointer-events-none",
            isFocused || hasValue
              ? "top-2 text-xs font-semibold text-purple-600"
              : "top-3.5 text-base"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
TextareaFloatingLabel.displayName = "TextareaFloatingLabel";

export { Textarea }