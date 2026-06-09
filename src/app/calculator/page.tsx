"use client";

import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/Card";
import { FormSelect } from "@/components/forms/FormSelect";
import { FormInput } from "@/components/forms/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Calculator as CalcIcon, 
  FileDown, 
  Send, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

const calculatorSchema = z.object({
  variety: z.string().min(1, "Select variety"),
  form: z.string().min(1, "Select form"),
  packType: z.string().min(1, "Select pack type"),
  country: z.string().min(1, "Select country"),
  port: z.string().min(1, "Select port"),
  priceType: z.enum(["FOB", "CIF"]),
  quantity: z.number().min(1, "Enter quantity"),
});

type CalculatorValues = z.infer<typeof calculatorSchema>;

const steps = [
  "Rice Variety",
  "Rice Form",
  "Pack Type",
  "Destination",
  "Price Type"
];

export default function PriceCalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const methods = useForm<CalculatorValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      priceType: "FOB",
      quantity: 1,
    }
  });

  const { watch } = methods;
  const values = watch();

  // Mock calculation logic
  const calculation = useMemo(() => {
    // Basic rates (Mocking real logic)
    const exchangeRate = 83.5;
    const varietyPrices: Record<string, number> = { "1121": 95, "sharbati": 65, "sugandha": 78 };
    const baseInr = (varietyPrices[values.variety] || 0);
    
    // Form multipliers
    const formMultipliers: Record<string, number> = { "sella": 1, "steam": 1.08, "raw": 0.95 };
    const formPriceInr = baseInr * (formMultipliers[values.form] || 1);
    
    // Pack charges (per MT)
    const packCharges: Record<string, number> = { "25nw": 1200, "50pp": 800, "5bopp": 2500 };
    const packingInr = packCharges[values.packType] || 0;
    
    const exMillInr = (formPriceInr * 1000) + packingInr;
    const exMillUsd = exMillInr / exchangeRate;
    
    const inlandFreight = 45; // USD per MT
    const thc = 15;
    const docCharges = 10;
    const seaFreight = values.priceType === "CIF" ? 65 : 0;
    
    const fob = exMillUsd + inlandFreight + thc + docCharges;
    const cif = fob + seaFreight;
    const margin = 0.05; // 5% default margin
    
    const totalWithMargin = (values.priceType === "CIF" ? cif : fob) * (1 + margin);
    
    return {
      exMill: Math.round(exMillUsd),
      inlandFreight,
      thc,
      docCharges,
      seaFreight,
      fob: Math.round(fob),
      cif: Math.round(cif),
      total: Math.round(totalWithMargin),
      margin: Math.round(totalWithMargin - (values.priceType === "CIF" ? cif : fob))
    };
  }, [values]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <AppLayout>
      <PageHeader
        title="Price Calculator"
        description="Generate precise export pricing calculations based on real-time data."
        breadcrumbs={[{ label: "Calculator" }]}
      />

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Calculation Steps</CardTitle>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                {steps.map((step, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-all",
                      i <= currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <FormProvider {...methods}>
                <form className="space-y-6">
                  {currentStep === 0 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                      <FormSelect
                        label="Rice Variety"
                        name="variety"
                        options={[
                          { label: "1121 Basmati", value: "1121" },
                          { label: "Sharbati", value: "sharbati" },
                          { label: "Sugandha", value: "sugandha" },
                        ]}
                      />
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                      <FormSelect
                        label="Rice Form"
                        name="form"
                        options={[
                          { label: "Sella / Parboiled", value: "sella" },
                          { label: "Steam", value: "steam" },
                          { label: "Raw", value: "raw" },
                        ]}
                      />
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                      <FormSelect
                        label="Pack Type"
                        name="packType"
                        options={[
                          { label: "25kg Non-Woven Bag", value: "25nw" },
                          { label: "50kg PP Bag", value: "50pp" },
                          { label: "5kg BOPP Bag", value: "5bopp" },
                        ]}
                      />
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="grid gap-4 md:grid-cols-2 animate-in fade-in slide-in-from-right-4 duration-300">
                      <FormSelect
                        label="Country"
                        name="country"
                        options={[
                          { label: "UAE", value: "uae" },
                          { label: "China", value: "china" },
                          { label: "USA", value: "usa" },
                        ]}
                      />
                      <FormSelect
                        label="Port"
                        name="port"
                        options={[
                          { label: "Jebel Ali", value: "jebel_ali" },
                          { label: "Shanghai", value: "shanghai" },
                          { label: "New York", value: "new_york" },
                        ]}
                      />
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => methods.setValue("priceType", "FOB")}
                          className={cn(
                            "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
                            values.priceType === "FOB" 
                              ? "border-primary bg-primary/5 text-primary" 
                              : "border-muted hover:border-muted-foreground/50"
                          )}
                        >
                          <span className="text-xl font-bold">FOB</span>
                          <span className="text-xs text-muted-foreground mt-1">Free On Board</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => methods.setValue("priceType", "CIF")}
                          className={cn(
                            "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
                            values.priceType === "CIF" 
                              ? "border-primary bg-primary/5 text-primary" 
                              : "border-muted hover:border-muted-foreground/50"
                          )}
                        >
                          <span className="text-xl font-bold">CIF</span>
                          <span className="text-xs text-muted-foreground mt-1">Cost, Insurance & Freight</span>
                        </button>
                      </div>
                      
                      <FormInput
                        label="Quantity (MT)"
                        name="quantity"
                        type="number"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="gap-2"
                    >
                      <ArrowLeft size={16} />
                      Previous
                    </Button>
                    
                    {currentStep < steps.length - 1 ? (
                      <Button type="button" onClick={nextStep} className="gap-2">
                        Next Step
                        <ArrowRight size={16} />
                      </Button>
                    ) : (
                      <Button type="button" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                        <CheckCircle2 size={16} />
                        Finalize Calculation
                      </Button>
                    )}
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="sticky top-24">
            <CardHeader className="bg-primary/5 border-b">
              <div className="flex items-center gap-2 text-primary">
                <CalcIcon size={20} />
                <CardTitle className="text-lg">Live Breakdown</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ex Mill Price</span>
                  <span className="font-medium">${calculation.exMill}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Inland Freight</span>
                  <span className="font-medium">${calculation.inlandFreight}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">THC Charges</span>
                  <span className="font-medium">${calculation.thc}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Documentation</span>
                  <span className="font-medium">${calculation.docCharges}</span>
                </div>
                
                <div className="pt-3 border-t flex justify-between">
                  <span className="font-semibold">FOB Price</span>
                  <span className="font-bold text-primary">${calculation.fob}</span>
                </div>

                {values.priceType === "CIF" && (
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Sea Freight</span>
                    <span className="font-medium">${calculation.seaFreight}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-emerald-600 font-medium">Margin (5%)</span>
                  <span className="text-emerald-600 font-bold">+${calculation.margin}</span>
                </div>

                <div className="pt-3 border-t flex justify-between items-baseline">
                  <span className="font-bold text-lg">Final Price</span>
                  <div className="text-right">
                    <span className="font-black text-3xl text-primary">${calculation.total}</span>
                    <span className="block text-[10px] text-muted-foreground font-bold">PER METRIC TON (MT)</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <Button className="w-full gap-2" variant="outline">
                  <FileDown size={16} />
                  Download PDF
                </Button>
                <Button className="w-full gap-2">
                  <Send size={16} />
                  Send Quotation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
