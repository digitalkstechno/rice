"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Download, FileSpreadsheet, FileText, File as FileIcon, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const exportModules = [
  { id: "leads", label: "Leads Data", description: "Export all customer inquiries and lead history." },
  { id: "quotations", label: "Quotations", description: "Export generated quotations and status reports." },
  { id: "rice_rates", label: "Rice Rates", description: "Export current and historical rice pricing data." },
  { id: "freight", label: "Freight Rates", description: "Export port-wise freight configurations." },
];

export default function ExportCenterPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Export Center"
        description="Download your system data in various formats for offline analysis and reporting."
        breadcrumbs={[{ label: "Export Center" }]}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {exportModules.map((module) => (
          <Card key={module.id} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{module.label}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </div>
                <div className="h-10 w-10 rounded-lg bg-background border flex items-center justify-center text-primary">
                  <Download size={20} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date Range</label>
                  <Button variant="outline" className="w-full justify-start gap-2 text-xs h-8">
                    <Calendar size={14} />
                    Last 30 Days
                  </Button>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Format</label>
                  <Button variant="outline" className="w-full justify-start gap-2 text-xs h-8">
                    <FileSpreadsheet size={14} />
                    Excel (.xlsx)
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button className="flex-1 gap-2">
                  <Download size={16} />
                  Generate Export
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileText size={16} />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Export Queue</CardTitle>
          <CardDescription>Status of your recently requested data exports.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[
              { name: "all_leads_2024_06_09.xlsx", size: "2.4 MB", status: "Ready", date: "Just now" },
              { name: "quotations_summary_q2.pdf", size: "1.1 MB", status: "Processing", date: "2 mins ago" },
              { name: "freight_rates_master.csv", size: "45 KB", status: "Expired", date: "Yesterday" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded bg-muted flex items-center justify-center text-muted-foreground">
                    <FileIcon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.size} • {item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                    item.status === "Ready" ? "bg-emerald-100 text-emerald-700" :
                    item.status === "Processing" ? "bg-blue-100 text-blue-700" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {item.status}
                  </span>
                  {item.status === "Ready" && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
