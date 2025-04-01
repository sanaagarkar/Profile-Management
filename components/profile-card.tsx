"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink } from "lucide-react"
import { useProfiles } from "@/context/profile-context"
import Link from "next/link"

interface ProfileCardProps {
  profile: any
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const { setSelectedProfile } = useProfiles()

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img src={profile.avatar || "/placeholder.svg"} alt={profile.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h3 className="font-medium">{profile.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            {profile.location.city}, {profile.location.country}
          </div>
        </div>
      </div>
      <CardContent className="p-0">
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground line-clamp-3">{profile.description}</p>
        </div>
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {profile.interests.slice(0, 3).map((interest: string) => (
              <span
                key={interest}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              >
                {interest}
              </span>
            ))}
            {profile.interests.length > 3 && (
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                +{profile.interests.length - 3}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="secondary" size="sm" onClick={() => setSelectedProfile(profile)}>
          View on Map
        </Button>
        <Button asChild size="sm">
          <Link href={`/profile/${profile.id}`}>
            View Profile
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

