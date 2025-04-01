"use client"

import { useState, useEffect } from "react"
import { useProfiles } from "@/context/profile-context"
import { ProfileCard } from "@/components/profile-card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileGrid() {
  const { profiles, loading, error } = useProfiles()
  const [displayProfiles, setDisplayProfiles] = useState<any[]>([])

  useEffect(() => {
    setDisplayProfiles(profiles)
  }, [profiles])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="border rounded-lg p-6 text-center">
        <p className="text-red-500 mb-2">Error loading profiles</p>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    )
  }

  if (displayProfiles.length === 0) {
    return (
      <div className="border rounded-lg p-6 text-center">
        <p className="mb-2">No profiles found</p>
        <p className="text-muted-foreground">Try adjusting your search filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {displayProfiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  )
}

