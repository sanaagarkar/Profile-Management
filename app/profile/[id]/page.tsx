"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useProfiles } from "@/context/profile-context"
import { MapPin, Mail, Phone, ArrowLeft, Briefcase, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ProfileMap } from "@/components/profile-map"

export default function ProfilePage() {
  const { id } = useParams()
  const router = useRouter()
  const { profiles, loading } = useProfiles()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (profiles.length > 0) {
      const foundProfile = profiles.find((p) => p.id === id)
      setProfile(foundProfile)
    }
  }, [profiles, id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Profile not found</h1>
        </div>
        <p>The profile you are looking for does not exist or has been removed.</p>
        <Button className="mt-4" onClick={() => router.push("/")}>
          Back to profiles
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{profile.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <img src={profile.avatar || "/placeholder.svg"} alt={profile.name} className="object-cover w-full h-full" />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.description}</p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {profile.location.city}, {profile.location.country}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Contact Information</h3>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{profile.phone}</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-64 md:h-80 rounded-lg overflow-hidden border">
            <ProfileMap profile={profile} />
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest: string) => (
                <div
                  key={interest}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm flex items-center gap-1"
                >
                  <Heart className="h-3 w-3" />
                  {interest}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Professional Information</h3>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>{profile.profession}</span>
            </div>
            <p className="text-muted-foreground">{profile.bio}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

