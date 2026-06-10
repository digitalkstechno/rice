"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/common/Card";

export default function AccountPage() {
  return (
    <AppLayout>
      <PageHeader 
        title="My Account" 
        description="View and manage your personal profile information."
      />

      <div className="mt-8 max-w-2xl mx-auto">
        <Card className="p-8 flex flex-col items-center text-center justify-center space-y-4">
           <div className="h-24 w-24 rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
             A
           </div>
           <div>
             <h2 className="text-xl font-bold text-slate-900">Admin User</h2>
             <p className="text-slate-500 font-medium">Super Admin</p>
           </div>
           <p className="text-sm text-slate-400 max-w-sm mx-auto mt-4">
             Your account management settings will be available here soon.
           </p>
        </Card>
      </div>
    </AppLayout>
  );
}
