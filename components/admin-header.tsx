"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, MapPin } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"

export function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("admin-authenticated")
    router.push("/admin")
  }

  return (
    <header className="border-b bg-muted/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="font-bold text-xl flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Admin Dashboard
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">View Site</Link>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

