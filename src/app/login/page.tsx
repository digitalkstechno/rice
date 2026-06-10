"use client";

import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/forms/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Login data:", data);
    // Add real authentication logic here later
    router.push("/leads");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements matching the global theme gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #60A5FA 100%)", opacity: 0.1 }}></div>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="enterprise-card p-8 shadow-2xl shadow-blue-900/5 bg-white relative z-10 border border-slate-200/60">
          <div className="flex flex-col items-center mb-8">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/30 mb-4">
              R
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Welcome to Rise<span className="text-[#3B82F6]">CRM</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 font-medium">
              Enter your credentials to access your account
            </p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
              <FormInput 
                name="email" 
                label="Email Address" 
                type="email" 
                placeholder="admin@example.com" 
              />
              <FormInput 
                name="password" 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
              />

              <div className="flex items-center justify-between text-sm mt-2 mb-6">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                  <input type="checkbox" className="rounded border-slate-300 text-[#1E3A8A] focus:ring-[#0EA5E9]" />
                  Remember me
                </label>
                <a href="#" className="text-[#0EA5E9] font-bold hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full h-11 text-sm">
                Sign in to Dashboard
              </Button>
            </form>
          </FormProvider>
        </div>
      </motion.div>
    </div>
  );
}
