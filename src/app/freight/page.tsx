"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export interface FreightData {
  id: string;
  country: string;
  seaFreightUsdPerContainer: number;
  cocUsdPerMt: number;
  lastUpdated: string;
}

const initialData: FreightData[] = [
  {
    id: "1",
    country: "UAE — Jebel Ali",
    seaFreightUsdPerContainer: 3000,
    cocUsdPerMt: 0,
    lastUpdated: "18 May 2026 — client v1: UAE Jebel Ali",
  }
];

export default function FreightPage() {
  const [data] = useState<FreightData[]>(initialData);

  const columns: ColumnDef<FreightData>[] = [
    { accessorKey: "country", header: "Country" },
    { accessorKey: "seaFreightUsdPerContainer", header: "SeaFreight_USD_per_container" },
    { accessorKey: "cocUsdPerMt", header: "COC_USD_per_MT" },
    { accessorKey: "lastUpdated", header: "LastUpdated" },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Freight Rates"
        description="View Freight rates."
        breadcrumbs={[{ label: "Freight" }]}
        actions={
          <Link href="/freight/add">
            <Button>Add Freight</Button>
          </Link>
        }
      />
      <div className="bg-transparent p-0 mt-6">
        <DataTable
          columns={columns}
          data={data}
          searchColumn="country"
          searchPlaceholder="Search country..."
        />
      </div>
    </AppLayout>
  );
}
