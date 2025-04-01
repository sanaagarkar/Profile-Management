"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useProfiles } from "@/context/profile-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminHeader } from "@/components/admin-header"
import { AdminProfileList } from "@/components/admin-profile-list"
import { AdminProfileForm } from "@/components/admin-profile-form"
import { PlusCircle, Search } from "lucide-react"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingProfile, setEditingProfile] = useState<any>(null)
  const router = useRouter()
  const { profiles, loading } = useProfiles()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("admin-authenticated") === "true"
      setIsAuthenticated(isLoggedIn)
      setIsLoading(false)

      if (!isLoggedIn) {
        router.push("/admin")
      }
    }

    checkAuth()
  }, [router])

  const handleAddNew = () => {
    setEditingProfile(null)
    setShowForm(true)
  }

  const handleEdit = (profile: any) => {
    setEditingProfile(profile)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProfile(null)
  }

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.profession.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Manage Profiles</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search profiles..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Profile
            </Button>
          </div>
        </div>

        {showForm ? (
          <AdminProfileForm profile={editingProfile} onClose={handleCloseForm} />
        ) : (
          <AdminProfileList profiles={filteredProfiles} onEdit={handleEdit} />
        )}
      </main>
    </div>
  )
}

