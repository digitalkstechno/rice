"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsCard } from "@/components/cards/StatsCard";
import { 
  Users, 
  TrendingUp, 
  Clock, 
  FileText, 
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const areaData = [
  { name: "Jan", leads: 400 },
  { name: "Feb", leads: 300 },
  { name: "Mar", leads: 600 },
  { name: "Apr", leads: 800 },
  { name: "May", leads: 500 },
  { name: "Jun", leads: 900 },
  { name: "Jul", leads: 1100 },
];

const barData = [
  { name: "Basmati", value: 450 },
  { name: "Sharbati", value: 300 },
  { name: "Sugandha", value: 200 },
  { name: "PR-11", value: 150 },
  { name: "Sona Masuri", value: 100 },
];

const pieData = [
  { name: "UAE", value: 400 },
  { name: "China", value: 300 },
  { name: "USA", value: 200 },
  { name: "UK", value: 100 },
];

const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#EF4444"];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8 pb-10">
        <PageHeader 
          title="Overview" 
          description="Manage your global rice export operations from one central dashboard."
          actions={
            <Button size="sm" className="gap-2 shadow-sm">
              <Plus size={16} />
              Add new lead
            </Button>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Leads"
            value="1,284"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            description="Since last month"
            delay={0.05}
          />
          <StatsCard
            title="Today's Leads"
            value="24"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            description="Real-time tracking"
            delay={0.1}
          />
          <StatsCard
            title="Quotations"
            value="452"
            icon={FileText}
            trend={{ value: 8, isPositive: true }}
            description="Pending approval"
            delay={0.15}
          />
          <StatsCard
            title="Active Sessions"
            value="18"
            icon={Clock}
            description="Users currently online"
            delay={0.2}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <div className="space-y-1">
                <CardTitle className="text-xl font-extrabold text-slate-900">Leads Acquisition</CardTitle>
                <CardDescription>Monthly growth of export inquiries</CardDescription>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200 shadow-sm">
                <Button variant="ghost" size="sm" className="h-8 px-3 text-[12px] font-bold">12M</Button>
                <Button variant="outline" size="sm" className="h-8 px-3 text-[12px] font-bold bg-white">6M</Button>
                <Button variant="ghost" size="sm" className="h-8 px-3 text-[12px] font-bold">30D</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        borderRadius: '12px', 
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
                        fontWeight: 'bold',
                        fontSize: '13px'
                      }}
                      cursor={{ stroke: '#2563EB', strokeWidth: 2, strokeDasharray: '5 5' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="leads" 
                      stroke="#2563EB" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorLeads)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-extrabold text-slate-900">Variety Distribution</CardTitle>
              <CardDescription>Most popular rice varieties exported</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {barData.map((item, index) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between text-[13px] font-bold">
                      <span className="text-slate-600">{item.name}</span>
                      <span className="text-slate-900">{item.value} MT</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / 450) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
                
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Performing</span>
                    <span className="text-lg font-extrabold text-slate-900">Basmati Rice</span>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <TrendingUp size={20} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
