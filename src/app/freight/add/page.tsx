"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/forms/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function AddFreightPage() {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      country: "",
      seaFreightUsdPerContainer: "",
      cocUsdPerMt: "",
      lastUpdated: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted (static mode):", data);
    router.push("/freight");
  };

  return (
    <AppLayout>
      <PageHeader
        title="Add Freight Rate"
        description="Create a new freight rate entry."
        breadcrumbs={[{ label: "Freight", href: "/freight" }, { label: "Add Freight" }]}
      />
      <div className="max-w-2xl mt-6 mx-auto">
        <Card className="p-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput name="country" label="Country" placeholder="e.g. UAE - Jebel Ali" />
                <FormInput name="seaFreightUsdPerContainer" label="SeaFreight (USD per container)" type="number" placeholder="0" step="1" />
                <FormInput name="cocUsdPerMt" label="COC (USD per MT)" type="number" placeholder="0" step="1" />
                <FormInput name="lastUpdated" label="Last Updated" placeholder="e.g. 18 May 2026 - client v1: UAE Jebel Ali" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="outline" type="button" onClick={() => router.push("/freight")}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Freight
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </AppLayout>
  );
}
