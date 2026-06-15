"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { packagingService, Packaging } from "@/services/packagingService";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { TableActions } from "@/components/common/TableActions";
import toast from "react-hot-toast";

export default function PackagingPage() {
  const [data, setData] = useState<Packaging[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchPackaging = async () => {
    try {
      setIsLoading(true);
      const res = await packagingService.getAll();
      setData(res || []);
    } catch (error) {
      toast.error("Failed to load Packaging data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackaging();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await packagingService.delete(deleteId);
      toast.success("Packaging record deleted successfully!");
      setData(data.filter(item => item._id !== deleteId));
    } catch (error) {
      toast.error("Failed to delete Packaging record");
    } finally {
      setDeleteId(null);
    }
  };

  const columns: ColumnDef<Packaging>[] = [
    { accessorKey: "productName", header: "Product Name" },
    { accessorKey: "packSize", header: "Pack Size" },
    { accessorKey: "mtCapacity", header: "MT Capacity (per 20ft)" },
    { 
      accessorKey: "packagingRate", 
      header: "Packaging Rate (INR)",
      cell: ({ row }) => {
        const val = row.getValue("packagingRate");
        return val ? `₹${Number(val).toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "N/A";
      }
    },
    { 
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <TableActions 
          editUrl={`/packaging/${row.original._id}`} 
          onDelete={() => setDeleteId(row.original._id || null)} 
        />
      )
    }
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Packaging Masters"
        description="Manage product packaging combinations, MT capacities, and packaging rates."
        breadcrumbs={[{ label: "Packaging" }]}
        actions={
          <Link href="/packaging/add">
            <Button>Add Packaging</Button>
          </Link>
        }
      />
      <div className="bg-transparent p-0 mt-6">
        <DataTable
          isLoading={isLoading}
          columns={columns}
          data={data}
          searchPlaceholder="Search product name..."
        />
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Packaging Record"
        description="Are you sure you want to permanently delete this record? This action cannot be undone."
        confirmText="Delete Record"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </AppLayout>
  );
}
