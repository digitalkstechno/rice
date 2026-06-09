"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  searchColumn?: string;
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchColumn,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1 bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="flex flex-1 items-center gap-3 max-w-md rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-2 focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary/40 focus-within:bg-white transition-all duration-300 group">
          <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
          <input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchColumn || "")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchColumn || "")?.setFilterValue(event.target.value)
            }
            className="w-full bg-transparent text-[14px] outline-none placeholder:text-slate-400 font-medium text-slate-700"
          />
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" className="gap-2 h-10 px-4 rounded-xl font-bold">
            <SlidersHorizontal size={16} />
            Advanced Filters
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/60 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-200/60 sticky top-0 z-10 backdrop-blur-md">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="h-14 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100/60">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "group transition-all duration-200 hover:bg-slate-50/80 data-[state=selected]:bg-primary/5",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-[13.5px] text-slate-600 font-semibold group-hover:text-slate-900 transition-colors">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                       <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                          <Search size={24} />
                       </div>
                       <p className="text-[14px] text-slate-400 font-bold tracking-tight">No records found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between px-2 py-2">
        <div className="text-[13px] font-bold text-slate-400">
          Showing <span className="text-slate-900 font-extrabold">{table.getFilteredRowModel().rows.length}</span> results
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 rounded-xl"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={18} />
            </Button>
            <div className="flex items-center gap-1.5 px-3 h-9 rounded-xl border border-slate-200 bg-white text-[13px] font-bold text-slate-700 shadow-sm">
              <span className="text-primary">{table.getState().pagination.pageIndex + 1}</span>
              <span className="text-slate-300">/</span>
              <span>{table.getPageCount()}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 rounded-xl"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
