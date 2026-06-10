"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export interface ExMillData {
  id: string;
  variety: string;
  form: string;
  inrPerKg: number;
  lastUpdated: string;
  inrPerMtAuto: number;
  usdPerMtAuto: number;
}

const initialData: ExMillData[] = [
  {
    id: "1",
    variety: "1121 Basmati",
    form: "Sella",
    inrPerKg: 80,
    lastUpdated: "18 May 2026",
    inrPerMtAuto: 80000,
    usdPerMtAuto: 1040.12,
  }
];

export default function ExMillPage() {
  const [data] = useState<ExMillData[]>(initialData);

  const columns: ColumnDef<ExMillData>[] = [
    { accessorKey: "variety", header: "Variety" },
    { accessorKey: "form", header: "Form" },
    { accessorKey: "inrPerKg", header: "INR per kg" },
    { accessorKey: "lastUpdated", header: "Last Updated" },
    { accessorKey: "inrPerMtAuto", header: "INR per MT (auto)" },
    { accessorKey: "usdPerMtAuto", header: "USD per MT (auto)" },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="ExMill Rates"
        description="View ExMill rates."
        breadcrumbs={[{ label: "ExMill" }]}
        actions={
          <Link href="/exmill/add">
            <Button>Add Rate</Button>
          </Link>
        }
      />
      <div className="bg-transparent p-0 mt-6">
        <DataTable
          columns={columns}
          data={data}
          searchColumn="variety"
          searchPlaceholder="Search variety..."
        />
      </div>
    </AppLayout>
  );
}
