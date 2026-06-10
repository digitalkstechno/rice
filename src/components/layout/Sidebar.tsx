"use client";

import { cn } from "@/lib/utils";
import {
  Users,
  Ship,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Factory,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: Users, label: "Leads", href: "/leads" },
  { icon: Factory, label: "ExMill", href: "/exmill" },
  { icon: Ship, label: "Freight", href: "/freight" },
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
              <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-[#1E3A8A] font-bold shadow-lg shadow-black/10">
                R
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Rise<span className="text-white/80 font-medium">CRM</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/20"
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
                className="px-3 pt-6 pb-2 text-[10px] font-bold text-white/50 uppercase tracking-[0.1em]"
              >
                {item.label}
              </div>
            ) : (
              <div key={`header-${idx}`} className="h-px bg-white/10 my-6 mx-2" />
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
                  ? "bg-white/20 text-white shadow-md shadow-black/10"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-0"
              )}
            >
              <Icon
                size={19}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-white" : "text-white/60 group-hover:text-white"
                )}
              />
              {!collapsed && (
                <span className={cn(
                  "text-[13.5px] font-semibold tracking-tight transition-colors",
                  isActive ? "text-white" : "text-white/60 group-hover:text-white"
                )}>
                  {item.label}
                </span>
              )}
              {isActive && !collapsed && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-5 bg-white rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {!isActive && !collapsed && (
                 <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/10 pointer-events-none" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-white/10 bg-black/10">
        <button
          className={cn(
            "flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-white/60 hover:bg-rose-500/20 hover:text-rose-200 transition-all font-semibold text-[13.5px] border border-transparent hover:border-rose-500/30",
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
