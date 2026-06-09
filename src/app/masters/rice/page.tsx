"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";
import { Plus, Upload, History, X, Edit2, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { RiceRate } from "@/types/rice";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

const initialRates: RiceRate[] = [
  {
    id: "RR-001",
    variety: "1121 Basmati",
    form: "Sella",
    inrPerKg: 95,
    inrPerMt: 95000,
    usdPerMt: 1140,
    updatedAt: "2026-06-09 10:30 AM",
  },
  {
    id: "RR-002",
    variety: "1121 Basmati",
    form: "Steam",
    inrPerKg: 102,
    inrPerMt: 102000,
    usdPerMt: 1224,
    updatedAt: "2026-06-09 10:30 AM",
  },
  {
    id: "RR-003",
    variety: "Sharbati",
    form: "Sella",
    inrPerKg: 65,
    inrPerMt: 65000,
    usdPerMt: 780,
    updatedAt: "2026-06-08 04:15 PM",
  },
];

const riceRateSchema = zod.object({
  variety: zod.string().min(1, "Rice Variety is required"),
  form: zod.string().min(1, "Form/Processing is required"),
  inrPerKg: zod.coerce.number().min(0.01, "Rate per KG must be greater than 0"),
  inrPerMt: zod.coerce.number().min(1, "Rate per MT must be greater than 0"),
  usdPerMt: zod.coerce.number().min(1, "Rate in USD must be greater than 0"),
});

type RiceRateFormValues = zod.infer<typeof riceRateSchema>;

export default function RiceRatesPage() {
  const [rates, setRates] = useState<RiceRate[]>(initialRates);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRate, setEditingRate] = useState<RiceRate | null>(null);

  // Setup form
  const methods = useForm<RiceRateFormValues>({
    resolver: zodResolver(riceRateSchema) as any,
    defaultValues: {
      variety: "",
      form: "",
      inrPerKg: 0,
      inrPerMt: 0,
      usdPerMt: 0,
    },
  });

  const { watch, setValue, reset, handleSubmit } = methods;
  const watchedInrPerKg = watch("inrPerKg");

  // Auto-calculate rates based on INR/KG
  useEffect(() => {
    if (watchedInrPerKg && watchedInrPerKg > 0) {
      const calculatedMt = Math.round(Number(watchedInrPerKg) * 1000);
      setValue("inrPerMt", calculatedMt);
      setValue("usdPerMt", Math.round(calculatedMt / 83.3));
    }
  }, [watchedInrPerKg, setValue]);

  // Open modal for add
  const handleAddClick = () => {
    setEditingRate(null);
    reset({
      variety: "",
      form: "",
      inrPerKg: 0,
      inrPerMt: 0,
      usdPerMt: 0,
    });
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleEditClick = (rate: RiceRate) => {
    setEditingRate(rate);
    reset({
      variety: rate.variety,
      form: rate.form,
      inrPerKg: rate.inrPerKg,
      inrPerMt: rate.inrPerMt,
      usdPerMt: rate.usdPerMt,
    });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDeleteClick = (id: string) => {
    if (confirm("Are you sure you want to delete this rice rate?")) {
      setRates((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Handle form submit
  const onSubmit = (data: RiceRateFormValues) => {
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).replace(",", "");

    if (editingRate) {
      // Edit mode
      setRates((prev) =>
        prev.map((r) =>
          r.id === editingRate.id
            ? {
                ...r,
                variety: data.variety,
                form: data.form,
                inrPerKg: data.inrPerKg,
                inrPerMt: data.inrPerMt,
                usdPerMt: data.usdPerMt,
                updatedAt: formattedDate,
              }
            : r
        )
      );
    } else {
      // Add mode
      const newId = `RR-${String(rates.length + 1).padStart(3, "0")}`;
      const newRate: RiceRate = {
        id: newId,
        variety: data.variety,
        form: data.form,
        inrPerKg: data.inrPerKg,
        inrPerMt: data.inrPerMt,
        usdPerMt: data.usdPerMt,
        updatedAt: formattedDate,
      };
      setRates((prev) => [newRate, ...prev]);
    }
    setIsModalOpen(false);
  };

  // Columns definition including action handlers
  const columns: ColumnDef<RiceRate>[] = [
    {
      accessorKey: "variety",
      header: "Rice Variety",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-extrabold text-slate-900 tracking-tight">{row.getValue("variety")}</span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">PREMIUM QUALITY</span>
        </div>
      ),
    },
    {
      accessorKey: "form",
      header: "Form / Processing",
      cell: ({ row }) => (
        <span className="text-[12px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-650 border border-slate-200/50">
          {row.getValue("form")}
        </span>
      ),
    },
    {
      accessorKey: "inrPerKg",
      header: "Rate (INR/KG)",
      cell: ({ row }) => (
        <span className="font-bold text-slate-700">₹{row.getValue("inrPerKg")}</span>
      ),
    },
    {
      accessorKey: "inrPerMt",
      header: "Rate (INR/MT)",
      cell: ({ row }) => (
        <span className="font-extrabold text-slate-900">₹{Number(row.getValue("inrPerMt")).toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "usdPerMt",
      header: "Rate (USD/MT)",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-extrabold text-primary tracking-tight">${Number(row.getValue("usdPerMt")).toLocaleString()}</span>
          <span className="text-[10px] font-bold text-primary/50 uppercase">EXPORT PRICE</span>
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Last Sync",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-slate-400">
          <History size={12} />
          <span className="text-[12px] font-semibold">{row.getValue("updatedAt")}</span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditClick(row.original)}
            className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all"
            title="Edit Rate"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => handleDeleteClick(row.original.id)}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all"
            title="Delete Rate"
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
        title="Rice Rates Management"
        description="Update and monitor current market rates for various rice varieties."
        breadcrumbs={[{ label: "Masters", href: "/masters" }, { label: "Rice Rates" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2 h-10 px-4">
              <Upload size={16} />
              Bulk Import
            </Button>
            <Button size="sm" className="gap-2 h-10 px-4" onClick={handleAddClick}>
              <Plus size={16} />
              Add New Rate
            </Button>
          </>
        }
      />

      <div className="bg-transparent p-0">
        <DataTable
          columns={columns}
          data={rates}
          searchColumn="variety"
          searchPlaceholder="Search varieties..."
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
              className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200/80 shadow-2xl p-6 overflow-hidden z-10"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <h3 className="text-[17px] font-extrabold text-slate-950">
                  {editingRate ? "Edit Rice Rate" : "Add New Rice Rate"}
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
                  <FormInput
                    label="Rice Variety"
                    name="variety"
                    placeholder="e.g. 112 Basmati, Pusa, etc."
                  />

                  <FormSelect
                    label="Form / Processing"
                    name="form"
                    options={[
                      { label: "Sella", value: "Sella" },
                      { label: "Steam", value: "Steam" },
                      { label: "Raw", value: "Raw" },
                      { label: "Golden Sella", value: "Golden Sella" },
                      { label: "Broken", value: "Broken" },
                    ]}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormInput
                      label="Rate (INR/KG)"
                      name="inrPerKg"
                      type="number"
                      step="any"
                      placeholder="e.g. 95"
                    />

                    <FormInput
                      label="Rate (INR/MT)"
                      name="inrPerMt"
                      type="number"
                      placeholder="Calculated"
                    />

                    <FormInput
                      label="Rate (USD/MT)"
                      name="usdPerMt"
                      type="number"
                      placeholder="Calculated"
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
                    <Button
                      type="submit"
                      className="px-5 h-10 font-bold"
                    >
                      {editingRate ? "Save Changes" : "Create Rate"}
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
