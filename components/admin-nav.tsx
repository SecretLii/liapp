'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  BookOpenCheck, 
  LayoutDashboard, 
  Users, 
  Settings,
  FileText
} from "lucide-react";

const adminRoutes = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    href: '/admin/guides',
    label: 'Guides',
    icon: FileText
  },
  {
    href: '/admin/generate-guide',
    label: 'AI Guide Generator',
    icon: BookOpenCheck
  },
  {
    href: '/admin/users',
    label: 'Users',
    icon: Users
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: Settings
  }
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {adminRoutes.map((route) => {
        const Icon = route.icon;
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent',
              pathname === route.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{route.label}</span>
          </Link>
        );
      })}
    </nav>
  );
} 