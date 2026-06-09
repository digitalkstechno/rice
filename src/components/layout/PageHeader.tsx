import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-6 mb-10">
      {breadcrumbs && (
        <nav className="flex items-center gap-2.5 text-[12px] font-bold text-slate-400">
          <Link href="/dashboard" className="hover:text-primary transition-colors bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm">
            <Home size={14} />
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <ChevronRight size={14} className="text-slate-300" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-900 font-extrabold">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          {description && (
            <p className="text-[15px] font-medium text-slate-500 max-w-2xl leading-relaxed">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm self-start sm:self-center">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
