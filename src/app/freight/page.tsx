"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";
import { Plus, Upload, Globe, Edit2, Trash2, X } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

interface FreightRate {
  id: string;
  country: string;
  port: string;
  freightCost: number;
  containerType: string;
  updatedAt: string;
}

const initialFreight: FreightRate[] = [
  {
    id: "FR-001",
    country: "UAE",
    port: "Jebel Ali",
    freightCost: 1200,
    containerType: "20ft Standard",
    updatedAt: "2026-06-05",
  },
  {
    id: "FR-002",
    country: "China",
    port: "Shanghai",
    freightCost: 1500,
    containerType: "20ft Standard",
    updatedAt: "2026-06-05",
  },
  {
    id: "FR-003",
    country: "USA",
    port: "New York",
    freightCost: 3200,
    containerType: "20ft Standard",
    updatedAt: "2026-06-04",
  },
];

const freightSchema = zod.object({
  country: zod.string().min(1, "Country is required"),
  port: zod.string().min(1, "Port is required"),
  freightCost: zod.coerce.number().min(1, "Freight cost must be greater than 0"),
  containerType: zod.string().min(1, "Container type is required"),
});

type FreightFormValues = zod.infer<typeof freightSchema>;

export default function FreightManagementPage() {
  const [freightRates, setFreightRates] = useState<FreightRate[]>(initialFreight);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRate, setEditingRate] = useState<FreightRate | null>(null);

  const methods = useForm<FreightFormValues>({
    resolver: zodResolver(freightSchema) as any,
    defaultValues: {
      country: "",
      port: "",
      freightCost: 0,
      containerType: "",
    },
  });

  const { reset, handleSubmit } = methods;

  const handleAddClick = () => {
    setEditingRate(null);
    reset({
      country: "",
      port: "",
      freightCost: 0,
      containerType: "",
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (rate: FreightRate) => {
    setEditingRate(rate);
    reset({
      country: rate.country,
      port: rate.port,
      freightCost: rate.freightCost,
      containerType: rate.containerType,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Are you sure you want to delete this freight configuration?")) {
      setFreightRates((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const onSubmit = (data: FreightFormValues) => {
    const today = new Date().toISOString().split("T")[0];

    if (editingRate) {
      setFreightRates((prev) =>
        prev.map((r) =>
          r.id === editingRate.id
            ? {
                ...r,
                country: data.country,
                port: data.port,
                freightCost: data.freightCost,
                containerType: data.containerType,
                updatedAt: today,
              }
            : r
        )
      );
    } else {
      const newId = `FR-${String(freightRates.length + 1).padStart(3, "0")}`;
      const newRate: FreightRate = {
        id: newId,
        country: data.country,
        port: data.port,
        freightCost: data.freightCost,
        containerType: data.containerType,
        updatedAt: today,
      };
      setFreightRates((prev) => [newRate, ...prev]);
    }
    setIsModalOpen(false);
  };

  const columns: ColumnDef<FreightRate>[] = [
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-muted-foreground" />
          <span className="font-semibold text-slate-900">{row.getValue("country")}</span>
        </div>
      ),
    },
    {
      accessorKey: "port",
      header: "Port",
      cell: ({ row }) => <span className="font-semibold text-slate-700">{row.getValue("port")}</span>,
    },
    {
      accessorKey: "containerType",
      header: "Container",
      cell: ({ row }) => (
        <span className="text-[12px] font-bold px-2 py-0.5 rounded bg-slate-100 border border-slate-200/50 text-slate-600">
          {row.getValue("containerType")}
        </span>
      ),
    },
    {
      accessorKey: "freightCost",
      header: "Freight Cost (USD)",
      cell: ({ row }) => <span className="font-extrabold text-primary">${Number(row.getValue("freightCost")).toLocaleString()}</span>,
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => <span className="text-slate-400 font-semibold">{row.getValue("updatedAt")}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditClick(row.original)}
            className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all"
            title="Edit Freight"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => handleDeleteClick(row.original.id)}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all"
            title="Delete Freight"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Freight Management"
        description="Manage ocean freight costs and shipping configurations for different ports."
        breadcrumbs={[{ label: "Freight" }]}
        actions={
          <>
            <Button variant="outline" className="gap-2">
              <Upload size={16} />
              Import
            </Button>
            <Button className="gap-2" onClick={handleAddClick}>
              <Plus size={16} />
              Add Freight
            </Button>
          </>
        }
      />

      <div className="bg-transparent p-0">
        <DataTable
          columns={columns}
          data={freightRates}
          searchColumn="country"
          searchPlaceholder="Search countries..."
        />
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-2xl p-6 overflow-hidden z-10"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <h3 className="text-[17px] font-extrabold text-slate-950">
                  {editingRate ? "Edit Freight Configuration" : "Add Freight Configuration"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <FormInput label="Destination Country" name="country" placeholder="e.g. UAE, Saudi Arabia" />
                  <FormInput label="Destination Port" name="port" placeholder="e.g. Jebel Ali, Jeddah" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormSelect
                      label="Container Type"
                      name="containerType"
                      options={[
                        { label: "20ft Standard", value: "20ft Standard" },
                        { label: "40ft Standard", value: "40ft Standard" },
                        { label: "40ft High Cube", value: "40ft High Cube" },
                        { label: "20ft Reefer", value: "20ft Reefer" },
                        { label: "40ft Reefer", value: "40ft Reefer" },
                      ]}
                    />
                    <FormInput
                      label="Freight Cost (USD)"
                      name="freightCost"
                      type="number"
                      placeholder="e.g. 1500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 h-10 font-bold border-slate-200"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="px-5 h-10 font-bold">
                      {editingRate ? "Save Configuration" : "Add Rate"}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
