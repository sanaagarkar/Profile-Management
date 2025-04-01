"use client"

import { useEffect, useRef, useState } from "react"
import { useProfiles } from "@/context/profile-context"
import { Loader } from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// Use the environment variable
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const { profiles, selectedProfile, loading } = useProfiles()
  const [mapLoaded, setMapLoaded] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current || !MAPBOX_TOKEN) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 20], // Default center
      zoom: 1.5,
    })

    map.current.on("load", () => {
      setMapLoaded(true)
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Add markers for all profiles
  useEffect(() => {
    if (!map.current || !mapLoaded || loading || profiles.length === 0) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    // Add markers for each profile
    profiles.forEach((profile) => {
      if (!profile.location.coordinates) return

      const el = document.createElement("div")
      el.className = "w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer"
      el.innerHTML = `<span class="text-primary-foreground text-xs font-bold">P</span>`

      const marker = new mapboxgl.Marker(el)
        .setLngLat([profile.location.coordinates.lng, profile.location.coordinates.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>${profile.name}</strong><p>${profile.location.city}, ${profile.location.country}</p>`,
          ),
        )
        .addTo(map.current!)

      markersRef.current.push(marker)
    })

    // Fit bounds to include all markers
    if (markersRef.current.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      profiles.forEach((profile) => {
        if (profile.location.coordinates) {
          bounds.extend([profile.location.coordinates.lng, profile.location.coordinates.lat])
        }
      })
      map.current.fitBounds(bounds, { padding: 50 })
    }
  }, [profiles, mapLoaded, loading])

  // Focus on selected profile
  useEffect(() => {
    if (!map.current || !mapLoaded || !selectedProfile) return

    if (selectedProfile.location.coordinates) {
      map.current.flyTo({
        center: [selectedProfile.location.coordinates.lng, selectedProfile.location.coordinates.lat],
        zoom: 12,
        essential: true,
      })

      // Find and open popup for selected profile
      markersRef.current.forEach((marker) => {
        const markerLngLat = marker.getLngLat()
        if (
          markerLngLat.lng === selectedProfile.location.coordinates.lng &&
          markerLngLat.lat === selectedProfile.location.coordinates.lat
        ) {
          marker.togglePopup()
        }
      })
    }
  }, [selectedProfile, mapLoaded])

  if (!mapLoaded || loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  return <div ref={mapContainer} className="h-full w-full" />
}

