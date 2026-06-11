import * as React from "react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  rules?: Record<string, unknown>;
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, name, rules, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const error = errors[name]?.message as string | undefined;
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            className="text-[13px] font-semibold text-slate-700 leading-none"
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          <input
            type={inputType}
            className={cn(
              "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-[var(--color-brand-primary)] focus-visible:ring-1 focus-visible:ring-[var(--color-brand-primary)] disabled:cursor-not-allowed disabled:opacity-50",
              type === "password" && "pr-10",
              error && "border-rose-400 focus-visible:border-rose-400 focus-visible:ring-rose-400",
              className
            )}
            {...register(name, rules)}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-[11px] font-bold text-rose-600 mt-1">{error}</p>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export { FormInput };
