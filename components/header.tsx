import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          ProfileExplorer
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm">
            <Link href="/admin">
              <User className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

