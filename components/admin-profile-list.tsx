"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash } from "lucide-react"
import { useProfiles } from "@/context/profile-context"
import { useToast } from "@/hooks/use-toast"

interface AdminProfileListProps {
  profiles: any[]
  onEdit: (profile: any) => void
}

export function AdminProfileList({ profiles, onEdit }: AdminProfileListProps) {
  const { deleteProfile } = useProfiles()
  const { toast } = useToast()

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      deleteProfile(id)
      toast({
        title: "Profile deleted",
        description: "The profile has been successfully deleted",
      })
    }
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Profession</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No profiles found
              </TableCell>
            </TableRow>
          ) : (
            profiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img
                        src={profile.avatar || "/placeholder.svg"}
                        alt={profile.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {profile.name}
                  </div>
                </TableCell>
                <TableCell>
                  {profile.location.city}, {profile.location.country}
                </TableCell>
                <TableCell>{profile.profession}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(profile)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(profile.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

