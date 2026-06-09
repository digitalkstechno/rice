"use client";

import { Card, CardContent } from "@/components/common/Card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className={cn("group overflow-hidden", className)}>
        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                  {title}
                </span>
                {trend && (
                  <div
                    className={cn(
                      "flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold",
                      trend.isPositive 
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100/50" 
                        : "bg-rose-50 text-rose-600 border border-rose-100/50"
                    )}
                  >
                    {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-primary transition-colors duration-300">{value}</h2>
              </div>
              {description && (
                <p className="text-[12px] text-slate-500 font-semibold flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  {description}
                </p>
              )}
            </div>
            <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:rotate-6 transition-all duration-300">
              <Icon size={22} strokeWidth={2.5} />
            </div>
          </div>
          
          {/* Subtle background decoration */}
          <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300">
             <Icon size={80} strokeWidth={1} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
