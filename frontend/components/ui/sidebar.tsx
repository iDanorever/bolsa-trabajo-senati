"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Context con tipado correcto para setOpen
interface SidebarContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>  // ← TIPO CORRECTO
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarProvider({ children, defaultOpen = true }: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div className="flex min-h-screen w-full">{children}</div>
    </SidebarContext.Provider>
  )
}

// Componentes del Sidebar
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { open } = useSidebar()
  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-white transition-all duration-300",
        open ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarHeader({ className, children, ...props }: SidebarProps) {
  return (
    <div className={cn("p-4 border-b", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarContent({ className, children, ...props }: SidebarProps) {
  return (
    <div className={cn("flex-1 overflow-auto p-2", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarFooter({ className, children, ...props }: SidebarProps) {
  return (
    <div className={cn("p-4 border-t", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenu({ className, children, ...props }: SidebarProps) {
  return (
    <nav className={cn("space-y-1", className)} {...props}>
      {children}
    </nav>
  )
}

export function SidebarMenuItem({ className, children, ...props }: SidebarProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  children?: React.ReactNode
}

export function SidebarMenuButton({ className, active, children, ...props }: SidebarMenuButtonProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        active ? "bg-gray-200 text-gray-900 font-medium" : "text-gray-600 hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { open, setOpen } = useSidebar()
  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-0 top-0 h-full w-4 cursor-ew-resize",
        className
      )}
      onClick={() => setOpen(!open)}   // ← CAMBIO: usar !open en lugar de función
      {...props}
    >
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
})
SidebarRail.displayName = "SidebarRail"