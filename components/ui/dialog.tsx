"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-white backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=open]:duration-300 data-[state=closed]:duration-200",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: "sm" | "default" | "lg" | "xl" | "full";
  }
>(({ className, children, size = "default", ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%]",
        "border border-anglican-purple-200 bg-white shadow-2xl",
        "duration-300 font-sans",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "rounded-2xl overflow-hidden px-4 py-5 max-h-[90vh] overflow-y-auto",
        // Size variants
        {
          "w-full max-w-sm": size === "sm",
          "w-full max-w-lg": size === "default", 
          "w-full max-w-2xl": size === "lg",
          "w-full max-w-4xl": size === "xl",
          "w-[95vw] h-[95vh] max-w-none": size === "full",
        },
        className
      )}
      {...props}
    >
      {/* Header gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-anglican-purple-500 via-anglican-gold to-anglican-purple-700" />
      
      {children}
      
      <DialogPrimitive.Close className="absolute right-6 top-6 rounded-full p-2 bg-anglican-purple-50 text-anglican-purple-600 opacity-80 ring-offset-background transition-all hover:opacity-100 hover:bg-anglican-purple-100 hover:text-anglican-purple-800 focus:outline-none focus:ring-2 focus:ring-anglican-purple-500 focus:ring-offset-2 disabled:pointer-events-none group">
        <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "centered" | "minimal";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-2 p-6 pb-4",
      {
        "text-left": variant === "default",
        "text-center items-center": variant === "centered", 
        "p-4 pb-2": variant === "minimal",
      },
      className
    )}
    {...props}
  />
))
DialogHeader.displayName = "DialogHeader"

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "centered" | "spaced";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex gap-3 p-6 pt-4 border-t border-anglican-purple-100 bg-anglican-purple-50/30",
      {
        "flex-col-reverse sm:flex-row sm:justify-end": variant === "default",
        "justify-center": variant === "centered",
        "justify-between": variant === "spaced",
      },
      className
    )}
    {...props}
  />
))
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    variant?: "default" | "large" | "accent";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "font-serif font-semibold leading-tight tracking-tight text-anglican-purple-800",
      {
        "text-xl": variant === "default",
        "text-2xl lg:text-3xl": variant === "large",
        "text-xl text-anglican-purple-700 relative": variant === "accent",
      },
      variant === "accent" && "after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-0.5 after:bg-anglican-gold",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
    variant?: "default" | "muted" | "prominent";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "font-sans leading-relaxed",
      {
        "text-sm text-anglican-purple-600": variant === "default",
        "text-xs text-anglican-purple-500": variant === "muted",
        "text-base text-anglican-purple-700": variant === "prominent",
      },
      className
    )}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

// Enhanced Dialog Body Component
const DialogBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "padded" | "scroll";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-anglican-purple-700",
      {
        "px-6": variant === "default",
        "px-6 py-4": variant === "padded", 
        "px-6 py-4 max-h-96 overflow-y-auto": variant === "scroll",
      },
      // Custom scrollbar for scroll variant
      variant === "scroll" && [
        "[&::-webkit-scrollbar]:w-2",
        "[&::-webkit-scrollbar-track]:bg-transparent", 
        "[&::-webkit-scrollbar-thumb]:bg-anglican-purple-200",
        "[&::-webkit-scrollbar-thumb]:rounded-full",
        "[&::-webkit-scrollbar-thumb:hover]:bg-anglican-purple-300"
      ],
      className
    )}
    {...props}
  />
))
DialogBody.displayName = "DialogBody"

// Success Dialog Variant
const DialogSuccess = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
        "border-2 border-green-200 bg-white shadow-2xl",
        "duration-300 font-sans rounded-2xl overflow-hidden",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      )}
      {...props}
    >
      {/* Success header gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-anglican-gold to-green-500" />
      
      {children}
      
      <DialogPrimitive.Close className="absolute right-6 top-6 rounded-full p-2 bg-green-50 text-green-600 opacity-80 ring-offset-background transition-all hover:opacity-100 hover:bg-green-100 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:pointer-events-none group">
        <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogSuccess.displayName = "DialogSuccess"

// Warning Dialog Variant
const DialogWarning = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
        "border-2 border-amber-200 bg-white shadow-2xl",
        "duration-300 font-sans rounded-2xl overflow-hidden",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      )}
      {...props}
    >
      {/* Warning header gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-anglican-gold to-amber-500" />
      
      {children}
      
      <DialogPrimitive.Close className="absolute right-6 top-6 rounded-full p-2 bg-amber-50 text-amber-600 opacity-80 ring-offset-background transition-all hover:opacity-100 hover:bg-amber-100 hover:text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:pointer-events-none group">
        <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogWarning.displayName = "DialogWarning"

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogSuccess,
  DialogWarning,
}