"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/common/Button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { FileText, Download, Mail, Copy } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

interface Quotation {
  id: string;
  quotationNumber: string;
  customer: string;
  country: string;
  variety: string;
  totalAmount: number;
  status: "Draft" | "Sent" | "Accepted" | "Expired";
  createdAt: string;
}

const mockQuotations: Quotation[] = [
  {
    id: "QO-001",
    quotationNumber: "QT-2024-001",
    customer: "Global Foods LLC",
    country: "UAE",
    variety: "1121 Basmati",
    totalAmount: 570000,
    status: "Sent",
    createdAt: "2024-06-08",
  },
  {
    id: "QO-002",
    quotationNumber: "QT-2024-002",
    customer: "Eastern Trading Co.",
    country: "China",
    variety: "Sharbati",
    totalAmount: 780000,
    status: "Accepted",
    createdAt: "2024-06-07",
  },
  {
    id: "QO-003",
    quotationNumber: "QT-2024-003",
    customer: "US Imports Inc",
    country: "USA",
    variety: "Sugandha",
    totalAmount: 312500,
    status: "Draft",
    createdAt: "2024-06-06",
  },
];

const columns: ColumnDef<Quotation>[] = [
  {
    accessorKey: "quotationNumber",
    header: "Quotation #",
    cell: ({ row }) => <span className="font-bold text-primary tracking-tight">{row.getValue("quotationNumber")}</span>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const name = row.getValue("customer") as string;
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
      return (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[11px] font-bold border border-slate-200">
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 leading-tight">{name}</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{row.original.country}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "variety",
    header: "Variety",
    cell: ({ row }) => <span className="font-bold text-slate-700">{row.getValue("variety")}</span>,
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-extrabold text-slate-900">${Number(row.getValue("totalAmount")).toLocaleString()}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase">USD TOTAL</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let variant: any = "pending";
      if (status === "Accepted") variant = "success";
      if (status === "Sent") variant = "info";
      if (status === "Expired") variant = "destructive";
      if (status === "Draft") variant = "secondary";
      
      return <StatusBadge variant={variant}>{status}</StatusBadge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => <span className="text-slate-500 font-semibold">{row.getValue("createdAt")}</span>,
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
          <Mail size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
          <Copy size={16} />
        </Button>
      </div>
    ),
  },
];

export default function QuotationsPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Quotation Management"
        description="View and track all generated price quotations."
        breadcrumbs={[{ label: "Quotations" }]}
        actions={
          <Button className="gap-2" onClick={() => window.location.href = '/calculator'}>
            <FileText size={16} />
            Create Quotation
          </Button>
        }
      />

      <div className="bg-transparent p-0">
        <DataTable 
          columns={columns} 
          data={mockQuotations} 
          searchColumn="quotationNumber"
          searchPlaceholder="Search quotations by number or customer..."
        />
      </div>
    </AppLayout>
  );
}
