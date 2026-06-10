import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-[13.5px] font-bold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96] duration-200",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white shadow-lg shadow-[#3B82F6]/30 hover:from-[#2563EB] hover:to-[#3B82F6] hover:shadow-[#2563EB]/50 hover:-translate-y-0.5",
        destructive: "bg-gradient-to-r from-rose-500 to-red-650 text-white shadow-lg shadow-rose-200 hover:-translate-y-0.5",
        outline: "border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 hover:-translate-y-0.5",
        secondary: "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200 hover:-translate-y-0.5",
        ghost: "text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-9 px-4 text-[12.5px]",
        lg: "h-12 px-8 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
