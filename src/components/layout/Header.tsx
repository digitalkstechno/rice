"use client";

import { Bell, Search, User, Moon, Sun, Command } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white/70 px-8 backdrop-blur-xl border-slate-200/50">
      <div className="flex w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 focus-within:bg-white focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/5 transition-all duration-300 group">
        <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          placeholder="Search for leads, quotations..."
          className="w-full bg-transparent text-[14px] outline-none placeholder:text-slate-400 font-medium text-slate-700"
        />
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md border border-slate-200 bg-white text-[10px] font-bold text-slate-400 shadow-sm">
          <Command size={11} /> K
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          
          <button className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 relative transition-all border border-transparent hover:border-slate-100">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
          </button>
        </div>

        <div className="h-6 w-px bg-slate-200/60 mx-1" />

        <div className="flex items-center gap-3 cursor-pointer pl-3 pr-1.5 py-1.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-[13.5px] font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight">Admin User</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Super Admin</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 shadow-sm group-hover:border-primary/30 transition-all">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
