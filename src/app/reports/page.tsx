"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Download, Filter, BarChart3, PieChart, LineChart as LineIcon, Globe } from "lucide-react";

export default function ReportsPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Reports & Analytics"
        description="Detailed insights and downloadable reports for your export business."
        breadcrumbs={[{ label: "Reports" }]}
        actions={
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Advanced Filters
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { label: "Lead Report", icon: BarChart3 },
          { label: "Country Report", icon: Globe },
          { label: "Rice Variety Report", icon: PieChart },
          { label: "Pricing Trends", icon: LineIcon },
        ].map((report, i) => (
          <Card key={i} className="hover:border-primary transition-colors cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <report.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{report.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Download as Excel/PDF</p>
                </div>
                <Download size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Country-wise Leads Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center bg-muted/5 border-t text-muted-foreground">
            Chart Placeholder (Pie Chart)
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rice Variety Demand Analysis</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center bg-muted/5 border-t text-muted-foreground">
            Chart Placeholder (Bar Chart)
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
