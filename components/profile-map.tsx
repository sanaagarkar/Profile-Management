"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// Make sure we have the token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
console.log("Token available:", !!MAPBOX_TOKEN)

interface ProfileMapProps {
  profile: any
}

export function ProfileMap({ profile }: ProfileMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Verify token and container
    if (!MAPBOX_TOKEN || !mapContainer.current) {
      console.log("Missing token or container")
      return
    }

    // Set token
    mapboxgl.accessToken = MAPBOX_TOKEN

    // Get coordinates
    const coordinates = profile?.location?.coordinates || {
      lng: -74.006,
      lat: 40.7128
    }

    // Create map instance
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [coordinates.lng, coordinates.lat],
      zoom: 12,
      interactive: true // Make sure map is interactive
    })

    // Add navigation controls
    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Handle map load
    mapInstance.once('load', () => {
      console.log("Map loaded")
      setMapLoaded(true)

      // Add marker
      if (profile?.location?.coordinates) {
        new mapboxgl.Marker({
          color: "#FF0000",
          draggable: false
        })
        .setLngLat([coordinates.lng, coordinates.lat])
        .setPopup(
          new mapboxgl.Popup()
            .setHTML(`
              <div style="padding: 10px">
                <strong>${profile.name}</strong>
                <p>${profile.location.city}, ${profile.location.country}</p>
              </div>
            `)
        )
        .addTo(mapInstance)
      }
    })

    // Handle map error
    mapInstance.on('error', (e) => {
      console.error("Mapbox error:", e)
    })

    // Store map reference
    map.current = mapInstance

    // Cleanup
    return () => {
      mapInstance.remove()
    }
  }, [profile])

  // Loading state
  if (!mapLoaded) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-6 w-6 animate-spin text-gray-600" />
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  // Map container
  return (
    <div 
      ref={mapContainer}
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        borderRadius: '0.5rem',
        overflow: 'hidden'
      }}
    />
  )
}

