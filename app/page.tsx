import { ProfileGrid } from "@/components/profile-grid"
import { SearchFilters } from "@/components/search-filters"
import { MapView } from "@/components/map-view"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">User Profiles</h1>
        <SearchFilters />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileGrid />
          </div>
          <div className="h-[500px] lg:h-auto rounded-lg overflow-hidden border">
            <MapView />
          </div>
        </div>
      </div>
    </main>
  )
}

