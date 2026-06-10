"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/forms/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function AddExmillPage() {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      variety: "",
      form: "",
      inrPerKg: "",
      inrPerMt: "",
      usdPerMt: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted (static mode):", data);
    router.push("/exmill");
  };

  return (
    <AppLayout>
      <PageHeader
        title="Add ExMill Rate"
        description="Create a new ex-mill rate entry."
        breadcrumbs={[{ label: "ExMill", href: "/exmill" }, { label: "Add Rate" }]}
      />
      <div className="max-w-2xl mt-6">
        <Card className="p-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput name="variety" label="Variety" placeholder="e.g. 1121 Basmati" />
                <FormInput name="form" label="Form" placeholder="e.g. Sella" />
                <FormInput name="inrPerKg" label="INR/kg" type="number" placeholder="0.00" step="0.01" />
                <FormInput name="inrPerMt" label="INR/MT" type="number" placeholder="0.00" step="0.01" />
                <FormInput name="usdPerMt" label="USD/MT" type="number" placeholder="0.00" step="0.01" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="outline" type="button" onClick={() => router.push("/exmill")}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Rate
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </AppLayout>
  );
}
