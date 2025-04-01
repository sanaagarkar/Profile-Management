"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useProfiles } from "@/context/profile-context"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"

interface AdminProfileFormProps {
  profile?: any
  onClose: () => void
}

export function AdminProfileForm({ profile, onClose }: AdminProfileFormProps) {
  const isEditing = !!profile
  const { addProfile, updateProfile } = useProfiles()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    profession: profile?.profession || "",
    description: profile?.description || "",
    bio: profile?.bio || "",
    avatar: profile?.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
    location: {
      city: profile?.location?.city || "",
      country: profile?.location?.country || "",
      coordinates: profile?.location?.coordinates || {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    interests: profile?.interests?.join(", ") || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const profileData = {
        ...formData,
        interests: formData.interests
          .split(",")
          .map((i: string) => i.trim())
          .filter(Boolean),
      }

      if (isEditing) {
        updateProfile(profile.id, profileData)
        toast({
          title: "Profile updated",
          description: "The profile has been successfully updated",
        })
      } else {
        addProfile(profileData)
        toast({
          title: "Profile created",
          description: "The profile has been successfully created",
        })
      }

      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the profile",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{isEditing ? "Edit Profile" : "Create Profile"}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <Input id="profession" name="profession" value={formData.profession} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input id="avatar" name="avatar" value={formData.avatar} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location.city">City</Label>
              <Input
                id="location.city"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location.country">Country</Label>
              <Input
                id="location.country"
                name="location.country"
                value={formData.location.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location.coordinates.lat">Latitude</Label>
                <Input
                  id="location.coordinates.lat"
                  name="location.coordinates.lat"
                  type="number"
                  step="0.000001"
                  value={formData.location.coordinates.lat}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        coordinates: {
                          ...formData.location.coordinates,
                          lat: Number.parseFloat(e.target.value),
                        },
                      },
                    })
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location.coordinates.lng">Longitude</Label>
                <Input
                  id="location.coordinates.lng"
                  name="location.coordinates.lng"
                  type="number"
                  step="0.000001"
                  value={formData.location.coordinates.lng}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        coordinates: {
                          ...formData.location.coordinates,
                          lng: Number.parseFloat(e.target.value),
                        },
                      },
                    })
                  }}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Interests (comma separated)</Label>
              <Input id="interests" name="interests" value={formData.interests} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Detailed Bio</Label>
          <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} required rows={4} />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{isEditing ? "Update Profile" : "Create Profile"}</Button>
        </div>
      </form>
    </div>
  )
}

