import * as React from "react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  options: { label: string; value: string | number }[];
}

const FormSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, name, options, ...props }, ref) => {
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
        <select
          className={cn(
            "flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13.5px] font-medium text-slate-900 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/30 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-rose-300 focus-visible:ring-rose-50 focus-visible:border-rose-400",
            className
          )}
          {...register(name)}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-[11px] font-bold text-rose-600 mt-1">{error}</p>
        )}
      </div>
    );
  }
);
FormSelect.displayName = "FormSelect";

export { FormSelect };
