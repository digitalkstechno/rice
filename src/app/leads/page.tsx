"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Lead } from "@/types/leads";
import { useState } from "react";

const initialLeads: Lead[] = [
  {
    id: "1",
    timestamp: "2026-06-08 10:00",
    phone: "+91 9876543210",
    name: "Rajesh Kumar",
    company: "Kumar Exports",
    country: "India",
    priceType: "CIF",
    variety: "1121 Basmati",
    form: "Sella",
    size: "10kg",
    packType: "Non-Woven",
    cifCountry: "UAE",
  }
];

export default function LeadsPage() {
  const [leads] = useState<Lead[]>(initialLeads);

  const columns: ColumnDef<Lead>[] = [
    { accessorKey: "timestamp", header: "Timestamp" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "company", header: "Company" },
    { accessorKey: "country", header: "Country" },
    { accessorKey: "priceType", header: "Price Type" },
    { accessorKey: "variety", header: "Variety" },
    { accessorKey: "form", header: "Form" },
    { accessorKey: "size", header: "Size" },
    { accessorKey: "packType", header: "Pack Type" },
    { accessorKey: "cifCountry", header: "CIF Country" },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Leads"
        description="View and manage leads."
        breadcrumbs={[{ label: "Leads" }]}
        actions={
          <Link href="/leads/add">
            <Button>Add Lead</Button>
          </Link>
        }
      />
      <div className="bg-transparent p-0 mt-6">
        <DataTable
          columns={columns}
          data={leads}
          searchColumn="name"
          searchPlaceholder="Search leads by name..."
        />
      </div>
    </AppLayout>
  );
}
