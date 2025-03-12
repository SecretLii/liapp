'use client';

import { AdminNav } from "@/components/admin-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, you would check for admin authentication here
  // and redirect if not authenticated

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <aside className="w-64 shrink-0">
          <div className="sticky top-8">
            <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
            <AdminNav />
          </div>
        </aside>
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
} 