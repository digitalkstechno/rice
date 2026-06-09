"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { FormInput } from "@/components/forms/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, RefreshCcw, DollarSign, Truck, FileText, Scale, Percent } from "lucide-react";

const settingsSchema = z.object({
  usdExchangeRate: z.number().min(1),
  inlandFreight: z.number().min(0),
  thcCharges: z.number().min(0),
  documentationCharges: z.number().min(0),
  containerCapacity: z.number().min(1),
  defaultMargin: z.number().min(0),
});

type SettingsValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const methods = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      usdExchangeRate: 83.50,
      inlandFreight: 45000,
      thcCharges: 12500,
      documentationCharges: 8500,
      containerCapacity: 25,
      defaultMargin: 5,
    }
  });

  const onSubmit = (data: SettingsValues) => {
    console.log("Saving settings:", data);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Global Settings"
        description="Configure system-wide parameters for pricing calculations and export operations."
        breadcrumbs={[{ label: "Settings" }]}
        actions={
          <Button onClick={methods.handleSubmit(onSubmit)} className="gap-2">
            <Save size={16} />
            Save Changes
          </Button>
        }
      />

      <FormProvider {...methods}>
        <form className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <DollarSign size={18} />
                <CardTitle className="text-base">Currency & Exchange</CardTitle>
              </div>
              <CardDescription>Base currency configuration for international pricing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                label="USD to INR Exchange Rate"
                name="usdExchangeRate"
                type="number"
                step="0.01"
              />
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                <RefreshCcw size={12} />
                Last updated: 10 mins ago from API
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Truck size={18} />
                <CardTitle className="text-base">Logistics Charges</CardTitle>
              </div>
              <CardDescription>Default inland logistics costs per container.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                label="Inland Freight (INR)"
                name="inlandFreight"
                type="number"
              />
              <FormInput
                label="THC Charges (INR)"
                name="thcCharges"
                type="number"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <FileText size={18} />
                <CardTitle className="text-base">Export Documentation</CardTitle>
              </div>
              <CardDescription>Standard documentation and processing fees.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                label="Documentation Charges (INR)"
                name="documentationCharges"
                type="number"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Scale size={18} />
                <CardTitle className="text-base">Container Standards</CardTitle>
              </div>
              <CardDescription>Standard loading capacity configurations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                label="Container Capacity (MT)"
                name="containerCapacity"
                type="number"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Percent size={18} />
                <CardTitle className="text-base">Profit Margins</CardTitle>
              </div>
              <CardDescription>Default margin applied to all calculations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                label="Default Margin (%)"
                name="defaultMargin"
                type="number"
              />
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </AppLayout>
  );
}
