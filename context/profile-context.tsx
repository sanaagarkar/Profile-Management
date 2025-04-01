"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { v4 as uuidv4 } from "uuid"

// Sample data
const sampleProfiles = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    profession: "Software Engineer",
    description: "Full-stack developer with 5 years of experience in React and Node.js",
    bio: "John is a passionate developer who loves building user-friendly applications. He has worked with various startups and contributed to open-source projects.",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    location: {
      city: "San Francisco",
      country: "USA",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    interests: ["Coding", "Hiking", "Photography", "AI"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    profession: "UX Designer",
    description: "Creative designer focused on user experience and interface design",
    bio: "Jane has a background in psychology which helps her create intuitive user experiences. She has designed interfaces for mobile apps and web platforms.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    location: {
      city: "New York",
      country: "USA",
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    interests: ["Design", "Art", "Travel", "Music"],
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "+1 (555) 234-5678",
    profession: "Data Scientist",
    description: "Data expert specializing in machine learning and predictive analytics",
    bio: "Michael has a PhD in Computer Science and specializes in machine learning algorithms. He has worked on projects involving natural language processing and computer vision.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    location: {
      city: "Boston",
      country: "USA",
      coordinates: {
        lat: 42.3601,
        lng: -71.0589,
      },
    },
    interests: ["Machine Learning", "Statistics", "Chess", "Reading"],
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 345-6789",
    profession: "Marketing Manager",
    description: "Strategic marketer with expertise in digital campaigns and brand development",
    bio: "Emily has led marketing teams at several tech companies. She specializes in growth marketing and has helped startups increase their user base significantly.",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    location: {
      city: "Chicago",
      country: "USA",
      coordinates: {
        lat: 41.8781,
        lng: -87.6298,
      },
    },
    interests: ["Marketing", "Social Media", "Yoga", "Cooking"],
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+1 (555) 456-7890",
    profession: "Product Manager",
    description: "Product leader with a track record of launching successful tech products",
    bio: "David has managed product development at both startups and large tech companies. He has a keen eye for market opportunities and user needs.",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    location: {
      city: "Seattle",
      country: "USA",
      coordinates: {
        lat: 47.6062,
        lng: -122.3321,
      },
    },
    interests: ["Product Strategy", "Technology", "Running", "Podcasts"],
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.b@example.com",
    phone: "+1 (555) 567-8901",
    profession: "Content Strategist",
    description: "Content expert who creates engaging narratives for brands and products",
    bio: "Sarah has a background in journalism and has worked with various media companies. She now helps tech companies tell their stories effectively.",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    location: {
      city: "Austin",
      country: "USA",
      coordinates: {
        lat: 30.2672,
        lng: -97.7431,
      },
    },
    interests: ["Writing", "Storytelling", "Hiking", "Photography"],
  },
]

type ProfileContextType = {
  profiles: any[]
  filteredProfiles: any[]
  setFilteredProfiles: (profiles: any[]) => void
  selectedProfile: any | null
  setSelectedProfile: (profile: any | null) => void
  addProfile: (profile: any) => void
  updateProfile: (id: string, profile: any) => void
  deleteProfile: (id: string) => void
  loading: boolean
  error: string | null
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<any[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([])
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulate fetching profiles from an API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In a real app, you would fetch from an API
        // const response = await fetch('/api/profiles')
        // const data = await response.json()

        setProfiles(sampleProfiles)
        setFilteredProfiles(sampleProfiles)
        setLoading(false)
      } catch (err) {
        setError("Failed to load profiles")
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  const addProfile = (profile: any) => {
    const newProfile = {
      ...profile,
      id: uuidv4(),
    }

    setProfiles((prev) => [...prev, newProfile])
    setFilteredProfiles((prev) => [...prev, newProfile])
  }

  const updateProfile = (id: string, updatedProfile: any) => {
    setProfiles((prev) => prev.map((profile) => (profile.id === id ? { ...updatedProfile, id } : profile)))

    setFilteredProfiles((prev) => prev.map((profile) => (profile.id === id ? { ...updatedProfile, id } : profile)))

    if (selectedProfile?.id === id) {
      setSelectedProfile({ ...updatedProfile, id })
    }
  }

  const deleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id))
    setFilteredProfiles((prev) => prev.filter((profile) => profile.id !== id))

    if (selectedProfile?.id === id) {
      setSelectedProfile(null)
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        filteredProfiles,
        setFilteredProfiles,
        selectedProfile,
        setSelectedProfile,
        addProfile,
        updateProfile,
        deleteProfile,
        loading,
        error,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfiles() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfiles must be used within a ProfileProvider")
  }
  return context
}

