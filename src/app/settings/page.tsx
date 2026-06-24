"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { useState, useEffect } from "react";
import { settingService } from "@/services/settingService";
import toast from "react-hot-toast";
import { FormInput } from "@/components/forms/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [dollarRate, setDollarRate] = useState<string>("");
  const [inlandFreight, setInlandFreight] = useState<string>("");
  const [customsThc, setCustomsThc] = useState<string>("");
  
  const [isSaving, setIsSaving] = useState(false);

  const methods = useForm({
    defaultValues: {
      companyName: "RiseCRM Enterprise",
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await settingService.getSettings().catch(() => ({ data: {} }));
        const settings = res?.data || {};
        setDollarRate(settings.usdInrRate?.toString() || "93.5");
        setInlandFreight(settings.inlandFreight?.toString() || "2000");
        setCustomsThc(settings.customsThc?.toString() || "45000");
        methods.reset({ companyName: settings.companyName || "RiseCRM Enterprise" });
      } catch (error) {
        console.error("Failed to fetch financial settings");
      }
    };
    fetchSettings();
  }, [methods]);

  const handleSaveFinancials = async () => {
    setIsSaving(true);
    try {
      await settingService.updateSettings({
        usdInrRate: Number(dollarRate),
        inlandFreight: Number(inlandFreight),
        customsThc: Number(customsThc)
      });
      toast.success("Financial settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update financial settings");
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await settingService.updateSettings({
        companyName: data.companyName
      });
      toast.success("General preferences saved successfully!");
    } catch(err) {
      toast.error("Failed to save general preferences");
    }
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
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      Current Dollar Rate (USD to INR)
                    </label>
                    <input
                      type="number"
                      value={dollarRate}
                      onChange={(e) => setDollarRate(e.target.value)}
                      step="0.01"
                      placeholder="e.g. 83.50"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-brand-primary outline-none transition-all font-medium"
                    />
                    <p className="mt-2 text-[13px] font-medium text-slate-500">
                      Used globally for auto-calculating USD prices.
                    </p>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      Inland Freight (Punjab → Mundra)
                    </label>
                    <input
                      type="number"
                      value={inlandFreight}
                      onChange={(e) => setInlandFreight(e.target.value)}
                      placeholder="e.g. 2000"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-brand-primary outline-none transition-all font-medium"
                    />
                    <p className="mt-2 text-[13px] font-medium text-slate-500">
                      INR per MT
                    </p>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      Customs & THC
                    </label>
                    <input
                      type="number"
                      value={customsThc}
                      onChange={(e) => setCustomsThc(e.target.value)}
                      placeholder="e.g. 45000"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-brand-primary outline-none transition-all font-medium"
                    />
                    <p className="mt-2 text-[13px] font-medium text-slate-500">
                      INR per 20ft container
                    </p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button type="button" onClick={handleSaveFinancials} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Financial Settings"}
                  </Button>
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
