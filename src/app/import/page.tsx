"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/Card";
import { 
  Upload, 
  FileSpreadsheet, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ChevronRight,
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

const importTypes = [
  { id: "rice", label: "Rice Rates", description: "Update market prices for all varieties", icon: Database },
  { id: "freight", label: "Freight Rates", description: "Update ocean freight costs by port", icon: Upload },
  { id: "leads", label: "Leads", description: "Import customer inquiries in bulk", icon: CheckCircle2 },
  { id: "masters", label: "Master Data", description: "Import countries, ports, and pack types", icon: Database },
];

export default function ImportCenterPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  return (
    <AppLayout>
      <PageHeader
        title="Import Center"
        description="Bulk upload data from Excel or CSV files to keep your system up to date."
        breadcrumbs={[{ label: "Import Center" }]}
      />

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
            Select Data Type
          </h3>
          <div className="space-y-2">
            {importTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-lg border transition-all text-left group",
                  selectedType === type.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border hover:border-muted-foreground/50 bg-card"
                )}
              >
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center transition-colors",
                  selectedType === type.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-accent"
                )}>
                  <type.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{type.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{type.description}</p>
                </div>
                <ChevronRight size={16} className={cn(
                  "text-muted-foreground transition-transform",
                  selectedType === type.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                )} />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Card className={cn(
            "border-2 border-dashed transition-all",
            dragActive ? "border-primary bg-primary/5" : "border-muted"
          )}>
            <CardContent className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Upload size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {selectedType 
                  ? `Upload ${importTypes.find(t => t.id === selectedType)?.label} File` 
                  : "Select a data type to start"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-8">
                Drag and drop your Excel (.xlsx) or CSV file here. 
                Maximum file size is 10MB.
              </p>
              
              <div className="flex items-center gap-4">
                <Button disabled={!selectedType} className="gap-2">
                  <FileSpreadsheet size={16} />
                  Choose File
                </Button>
                <Button variant="outline" disabled={!selectedType}>
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Import History</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">View Full Logs</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  { name: "rice_rates_june_09.xlsx", type: "Rice Rates", status: "Success", date: "Today, 10:30 AM", rows: 124 },
                  { name: "freight_update_v2.csv", type: "Freight", status: "Warning", date: "Yesterday, 04:15 PM", rows: 42 },
                  { name: "leads_china_exp.xlsx", type: "Leads", status: "Failed", date: "Jun 07, 2024", rows: 0 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-8 w-8 rounded flex items-center justify-center",
                        item.status === "Success" ? "bg-emerald-100 text-emerald-600" :
                        item.status === "Warning" ? "bg-amber-100 text-amber-600" :
                        "bg-destructive/10 text-destructive"
                      )}>
                        {item.status === "Success" ? <CheckCircle2 size={16} /> :
                         item.status === "Warning" ? <AlertCircle size={16} /> :
                         <AlertCircle size={16} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>{item.type}</span>
                          <span>•</span>
                          <span>{item.rows} rows</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">{item.status}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
