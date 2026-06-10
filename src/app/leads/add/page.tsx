"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function AddLeadPage() {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      name: "",
      phone: "",
      company: "",
      country: "",
      priceType: "",
      variety: "",
      form: "",
      size: "",
      packType: "",
      cifCountry: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted (static mode):", data);
    router.push("/leads");
  };

  return (
    <AppLayout>
      <PageHeader
        title="Add Lead"
        description="Create a new lead entry."
        breadcrumbs={[{ label: "Leads", href: "/leads" }, { label: "Add Lead" }]}
      />
      <div className="max-w-2xl mt-6">
        <Card className="p-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput name="name" label="Name" placeholder="Enter full name" />
                <FormInput name="phone" label="Phone" placeholder="Enter phone number" />
                <FormInput name="company" label="Company" placeholder="Enter company name" />
                <FormInput name="country" label="Country" placeholder="Enter country" />
                
                <FormSelect 
                  name="priceType" 
                  label="Price Type" 
                  options={[
                    { label: "CIF", value: "CIF" },
                    { label: "FOB", value: "FOB" },
                    { label: "EXW", value: "EXW" }
                  ]} 
                />
                <FormInput name="variety" label="Variety" placeholder="e.g. 1121 Basmati" />
                <FormInput name="form" label="Form" placeholder="e.g. Sella" />
                <FormInput name="size" label="Size" placeholder="e.g. 10kg" />
                <FormInput name="packType" label="Pack Type" placeholder="e.g. Non-Woven" />
                <FormInput name="cifCountry" label="CIF Country" placeholder="Enter CIF Country (optional)" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="outline" type="button" onClick={() => router.push("/leads")}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Lead
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </AppLayout>
  );
}
