import React from 'react';
import { cn } from "@/lib/utils";

interface LoaderProps {
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Loader({ text = "Loading data...", className, size = 'md' }: LoaderProps) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 w-full", className)}>
      <div className={cn("animate-spin rounded-full border-slate-200 border-t-primary", sizeClasses[size])}></div>
      {text && <p className="text-[14px] text-slate-500 font-semibold">{text}</p>}
    </div>
  );
}
