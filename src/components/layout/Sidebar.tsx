"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calculator,
  FileText,
  Settings,
  BarChart3,
  Ship,
  Globe,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Package,
  History,
  ShieldCheck,
  Download,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Leads", href: "/leads" },
  { icon: Calculator, label: "Price Calculator", href: "/calculator" },
  { icon: FileText, label: "Quotations", href: "/quotations" },
  { label: "Inventory", isHeader: true },
  { icon: Package, label: "Rice Masters", href: "/masters/rice" },
  { icon: Ship, label: "Freight", href: "/freight" },
  { icon: Globe, label: "Masters", href: "/masters" },
  { label: "Operations", isHeader: true },
  { icon: History, label: "Sessions", href: "/sessions" },
  { icon: Upload, label: "Import Center", href: "/import" },
  { icon: Download, label: "Export Center", href: "/export" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { label: "Admin", isHeader: true },
  { icon: ShieldCheck, label: "Permissions", href: "/permissions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      className="enterprise-sidebar h-screen sticky top-0 z-40 flex flex-col transition-all duration-300 ease-in-out shadow-[1px_0_0_0_rgba(0,0,0,0.05)]"
    >
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-900/60">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">
                R
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Rise<span className="text-primary">CRM</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-900 transition-all border border-transparent hover:border-slate-800"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1 custom-scrollbar">
        {menuItems.map((item, idx) => {
          if (item.isHeader) {
            return !collapsed ? (
              <div
                key={`header-${idx}`}
                className="px-3 pt-6 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em]"
              >
                {item.label}
              </div>
            ) : (
              <div key={`header-${idx}`} className="h-px bg-slate-900 my-6 mx-2" />
            );
          }

          const isActive = pathname === item.href;
          const Icon = item.icon!;

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                "group flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all relative duration-200",
                isActive
                  ? "bg-primary/10 text-primary shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
                  : "text-slate-400 hover:bg-slate-900/50 hover:text-white",
                collapsed && "justify-center px-0"
              )}
            >
              <Icon
                size={19}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-350"
                )}
              />
              {!collapsed && (
                <span className={cn(
                  "text-[13.5px] font-semibold tracking-tight transition-colors",
                  isActive ? "text-primary" : "text-slate-400 group-hover:text-white"
                )}>
                  {item.label}
                </span>
              )}
              {isActive && !collapsed && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-5 bg-primary rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {!isActive && !collapsed && (
                 <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-slate-800/50 pointer-events-none" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-slate-900 bg-slate-950">
        <button
          className={cn(
            "flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-rose-950/20 hover:text-rose-450 transition-all font-semibold text-[13.5px] border border-transparent hover:border-rose-900/30",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut size={19} className="shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
