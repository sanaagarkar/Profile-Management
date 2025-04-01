"use client"

import { useState } from "react"
import { useProfiles } from "@/context/profile-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"

export function SearchFilters() {
  const { profiles, setFilteredProfiles } = useProfiles()
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Get unique locations from profiles
  const locations = [...new Set(profiles.map((profile) => profile.location.city))]

  const handleSearch = () => {
    const filtered = profiles.filter((profile) => {
      const matchesSearch =
        searchTerm === "" ||
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.interests.some((interest: string) => interest.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesLocation = location === "" || profile.location.city === location

      return matchesSearch && matchesLocation
    })

    setFilteredProfiles(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setLocation("")
    setFilteredProfiles(profiles)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, interests, or profession..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-muted/20">
          <div className="w-full sm:w-auto flex-1">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}

