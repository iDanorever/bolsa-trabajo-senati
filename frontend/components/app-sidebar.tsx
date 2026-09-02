"use client";

import { usePathname, useRouter } from "next/navigation";   
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  GraduationCap,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bolsa de Trabajo", href: "/bolsa-trabajo", icon: Briefcase },
  { label: "Empresa", href: "/empresa", icon: Building2 },
  { label: "Seguimiento PEA", href: "/seguimiento-pea", icon: GraduationCap },
  { label: "Perfil", href: "/perfil", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();   

  const handleLogout = () => {
    
    router.push("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold">SENATI</h2>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-md text-sm
                    ${isActive 
                      ? "bg-gray-200 text-gray-900 font-medium" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-3"
          onClick={handleLogout}   
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}