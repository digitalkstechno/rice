"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/forms/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const methods = useForm({
    defaultValues: {
      dollarRate: "83.50", // Default example
      companyName: "RiseCRM Enterprise",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Saved Settings:", data);
    alert("Settings saved successfully!");
  };

  return (
    <AppLayout>
      <PageHeader 
        title="Settings" 
        description="Manage system configurations and application preferences."
      />

      <div className="mt-8 max-w-2xl mx-auto">
        <Card className="p-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Financial Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput 
                    name="dollarRate" 
                    label="Current Dollar Rate (USD to INR)" 
                    type="number"
                    step="0.01"
                    placeholder="e.g. 83.50" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mt-4">
                  General Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput 
                    name="companyName" 
                    label="Company Name" 
                    type="text"
                    placeholder="Company Name" 
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <Button type="submit" className="gap-2">
                  <Save size={16} /> Save Settings
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </AppLayout>
  );
}
