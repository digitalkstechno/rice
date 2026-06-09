import * as React from "react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, name, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const error = errors[name]?.message as string | undefined;

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
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-900 shadow-sm ring-offset-white transition-all placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/30 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-rose-300 focus-visible:ring-rose-50 focus-visible:border-rose-400",
            className
          )}
          {...register(name)}
          {...props}
        />
        {error && (
          <p className="text-[11px] font-bold text-rose-600 mt-1">{error}</p>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export { FormInput };
