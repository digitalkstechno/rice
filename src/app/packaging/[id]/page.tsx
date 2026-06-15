"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/forms/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { packagingService } from "@/services/packagingService";
import toast from "react-hot-toast";

export default function PackagingAddEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isEditMode = id && id !== "add";
  const methods = useForm({
    defaultValues: {
      productName: "",
      packSize: "",
      mtCapacity: "",
      packagingRate: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      const fetchPackaging = async () => {
        try {
          const res = await packagingService.getById(id);
          methods.reset({
            productName: res.productName || "",
            packSize: res.packSize || "",
            mtCapacity: res.mtCapacity !== undefined ? res.mtCapacity.toString() : "",
            packagingRate: res.packagingRate !== undefined ? res.packagingRate.toString() : "",
          });
        } catch (error) {
          toast.error("Failed to load Packaging data for editing");
        } finally {
          setIsLoading(false);
        }
      };
      fetchPackaging();
    }
  }, [id, isEditMode, methods]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const payload = {
        productName: data.productName,
        packSize: data.packSize,
        mtCapacity: data.mtCapacity ? Number(data.mtCapacity) : 0,
        packagingRate: data.packagingRate ? Number(data.packagingRate) : 0,
      };

      if (isEditMode) {
        await packagingService.update(id, payload);
        toast.success("Packaging record updated successfully!");
      } else {
        await packagingService.create(payload);
        toast.success("Packaging record added successfully!");
      }
      router.push("/packaging");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || (isEditMode ? "Failed to update Packaging record" : "Failed to add Packaging record"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-8 flex justify-center items-center h-full">Loading...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageHeader
        title={isEditMode ? "Edit Packaging Record" : "Add Packaging Record"}
        description={isEditMode ? "Update an existing packaging entry." : "Create a new packaging entry."}
        breadcrumbs={[{ label: "Packaging", href: "/packaging" }, { label: isEditMode ? "Edit Record" : "Add Record" }]}
      />
      <div className="max-w-2xl mt-6 mx-auto">
        <Card className="p-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput name="productName" label="Product Name" placeholder="e.g. Brown Jute with PP inner" rules={{ required: "Product Name is required" }} />
                <FormInput name="packSize" label="Pack Size" placeholder="e.g. 25 kg" rules={{ required: "Pack Size is required" }} />
                <FormInput name="mtCapacity" label="MT Capacity (per 20ft)" type="number" placeholder="0" step="0.01" />
                <FormInput name="packagingRate" label="Packaging Rate (INR/unit)" type="number" placeholder="0.00" step="0.01" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="outline" type="button" onClick={() => router.push("/packaging")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : (isEditMode ? "Update Record" : "Save Record")}
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </AppLayout>
  );
}
