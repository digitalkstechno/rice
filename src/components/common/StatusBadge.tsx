"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-blue-50 text-blue-600 border border-blue-100",
        secondary: "bg-slate-100 text-slate-600 border border-slate-200/50",
        destructive: "bg-rose-50 text-rose-600 border border-rose-100",
        outline: "text-slate-600 border border-slate-200",
        success: "bg-emerald-50 text-emerald-600 border border-emerald-100",
        warning: "bg-amber-50 text-amber-600 border border-amber-100",
        info: "bg-indigo-50 text-indigo-600 border border-indigo-100",
        pending: "bg-slate-100 text-slate-500 border border-slate-200/50",
        quoted: "bg-purple-50 text-purple-600 border border-purple-100",
        contacted: "bg-orange-50 text-orange-600 border border-orange-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function StatusBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { StatusBadge, badgeVariants };
