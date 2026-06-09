"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/common/Button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";
import { Plus, Download, Edit2, Trash2, X } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Lead } from "@/types/leads";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

const initialLeads: Lead[] = [
  {
    id: "LD-001",
    customerName: "Ali Hassan",
    mobileNumber: "+971 50 123 4567",
    companyName: "Global Foods LLC",
    country: "UAE",
    riceVariety: "1121 Basmati",
    riceForm: "Sella",
    quantity: "500 MT",
    priceType: "CIF",
    status: "New",
    createdAt: "2026-06-08",
  },
  {
    id: "LD-002",
    customerName: "Chen Wei",
    mobileNumber: "+86 138 0013 8000",
    companyName: "Eastern Trading Co.",
    country: "China",
    riceVariety: "Sharbati",
    riceForm: "Raw",
    quantity: "1000 MT",
    priceType: "FOB",
    status: "Quoted",
    createdAt: "2026-06-07",
  },
  {
    id: "LD-003",
    customerName: "Robert Miller",
    mobileNumber: "+1 212 555 0199",
    companyName: "US Imports Inc",
    country: "USA",
    riceVariety: "Sugandha",
    riceForm: "Steam",
    quantity: "250 MT",
    priceType: "CIF",
    status: "Contacted",
    createdAt: "2026-06-06",
  },
];

const leadSchema = zod.object({
  customerName: zod.string().min(1, "Customer Name is required"),
  mobileNumber: zod.string().min(1, "Mobile number is required"),
  companyName: zod.string().min(1, "Company Name is required"),
  country: zod.string().min(1, "Country is required"),
  riceVariety: zod.string().min(1, "Rice Variety is required"),
  riceForm: zod.string().min(1, "Rice Form is required"),
  quantity: zod.string().min(1, "Quantity is required"),
  priceType: zod.enum(["FOB", "CIF"]),
  status: zod.enum(["New", "Contacted", "Quoted", "Converted", "Lost"]),
});

type LeadFormValues = zod.infer<typeof leadSchema>;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const methods = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema) as any,
    defaultValues: {
      customerName: "",
      mobileNumber: "",
      companyName: "",
      country: "",
      riceVariety: "",
      riceForm: "",
      quantity: "",
      priceType: "CIF",
      status: "New",
    },
  });

  const { reset, handleSubmit } = methods;

  const handleAddClick = () => {
    setEditingLead(null);
    reset({
      customerName: "",
      mobileNumber: "",
      companyName: "",
      country: "",
      riceVariety: "",
      riceForm: "",
      quantity: "",
      priceType: "CIF",
      status: "New",
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (lead: Lead) => {
    setEditingLead(lead);
    reset({
      customerName: lead.customerName,
      mobileNumber: lead.mobileNumber,
      companyName: lead.companyName,
      country: lead.country,
      riceVariety: lead.riceVariety,
      riceForm: lead.riceForm,
      quantity: lead.quantity,
      priceType: lead.priceType,
      status: lead.status,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const onSubmit = (data: LeadFormValues) => {
    const today = new Date().toISOString().split("T")[0];

    if (editingLead) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === editingLead.id
            ? {
                ...l,
                customerName: data.customerName,
                mobileNumber: data.mobileNumber,
                companyName: data.companyName,
                country: data.country,
                riceVariety: data.riceVariety,
                riceForm: data.riceForm,
                quantity: data.quantity,
                priceType: data.priceType,
                status: data.status,
              }
            : l
        )
      );
    } else {
      const newId = `LD-${String(leads.length + 1).padStart(3, "0")}`;
      const newLead: Lead = {
        id: newId,
        customerName: data.customerName,
        mobileNumber: data.mobileNumber,
        companyName: data.companyName,
        country: data.country,
        riceVariety: data.riceVariety,
        riceForm: data.riceForm,
        quantity: data.quantity,
        priceType: data.priceType,
        status: data.status,
        createdAt: today,
      };
      setLeads((prev) => [newLead, ...prev]);
    }
    setIsModalOpen(false);
  };

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "id",
      header: "Lead ID",
      cell: ({ row }) => <span className="font-bold text-primary tracking-tight">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => {
        const name = row.getValue("customerName") as string;
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2);
        return (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[11px] font-bold border border-primary/20 shadow-sm">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 leading-tight">{name}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {row.original.companyName}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">{row.getValue("country")}</span>
        </div>
      ),
    },
    {
      accessorKey: "riceVariety",
      header: "Variety",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-slate-700">{row.getValue("riceVariety")}</span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
            {row.original.riceForm}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => <span className="font-bold text-slate-700">{row.getValue("quantity")}</span>,
    },
    {
      accessorKey: "priceType",
      header: "Type",
      cell: ({ row }) => (
        <span className="text-[11px] font-extrabold px-2 py-1 rounded-lg bg-slate-100 text-slate-650 border border-slate-200/50">
          {row.getValue("priceType")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        let variant: any = "pending";
        if (status === "New") variant = "default";
        if (status === "Quoted") variant = "quoted";
        if (status === "Contacted") variant = "contacted";
        if (status === "Completed") variant = "success";
        if (status === "Rejected") variant = "destructive";

        return <StatusBadge variant={variant}>{status}</StatusBadge>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => <span className="text-slate-500 font-semibold">{row.getValue("createdAt")}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditClick(row.original)}
            className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all"
            title="Edit Lead"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => handleDeleteClick(row.original.id)}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all"
            title="Delete Lead"
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
        title="Lead Management"
        description="Track and manage international rice export inquiries."
        breadcrumbs={[{ label: "Leads" }]}
        actions={
          <>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Export
            </Button>
            <Button className="gap-2" onClick={handleAddClick}>
              <Plus size={16} />
              Add Lead
            </Button>
          </>
        }
      />

      <div className="bg-transparent p-0">
        <DataTable
          columns={columns}
          data={leads}
          searchColumn="customerName"
          searchPlaceholder="Search customers by name or company..."
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
              className="relative w-full max-w-xl bg-white rounded-2xl border border-slate-200/80 shadow-2xl p-6 overflow-hidden z-10"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <h3 className="text-[17px] font-extrabold text-slate-950">
                  {editingLead ? "Edit Lead Details" : "Create Export Lead"}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput label="Customer Name" name="customerName" placeholder="e.g. John Doe" />
                    <FormInput label="Mobile / Contact" name="mobileNumber" placeholder="e.g. +91 99999 88888" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput label="Company Name" name="companyName" placeholder="e.g. ABC Enterprises" />
                    <FormInput label="Country" name="country" placeholder="e.g. Saudi Arabia" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormSelect
                      label="Rice Variety Requirement"
                      name="riceVariety"
                      options={[
                        { label: "1121 Basmati", value: "1121 Basmati" },
                        { label: "Sharbati", value: "Sharbati" },
                        { label: "Sugandha", value: "Sugandha" },
                        { label: "Pusa Basmati", value: "Pusa Basmati" },
                        { label: "PR11 non-Basmati", value: "PR11 non-Basmati" },
                      ]}
                    />
                    <FormSelect
                      label="Rice Processing / Form"
                      name="riceForm"
                      options={[
                        { label: "Sella", value: "Sella" },
                        { label: "Steam", value: "Steam" },
                        { label: "Raw", value: "Raw" },
                        { label: "Golden Sella", value: "Golden Sella" },
                        { label: "Broken", value: "Broken" },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormInput label="Quantity (e.g. 100 MT)" name="quantity" placeholder="e.g. 500 MT" />
                    <FormSelect
                      label="Incoterm Type"
                      name="priceType"
                      options={[
                        { label: "CIF", value: "CIF" },
                        { label: "FOB", value: "FOB" },
                      ]}
                    />
                    <FormSelect
                      label="Lead Status"
                      name="status"
                      options={[
                        { label: "New", value: "New" },
                        { label: "Contacted", value: "Contacted" },
                        { label: "Quoted", value: "Quoted" },
                        { label: "Converted", value: "Converted" },
                        { label: "Lost", value: "Lost" },
                      ]}
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
                      {editingLead ? "Save Lead" : "Create Lead"}
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
