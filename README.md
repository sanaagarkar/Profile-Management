# Profile Explorer with Mapbox Integration

This project uses Mapbox GL JS for displaying interactive maps with user profile locations.

## Setup Instructions

### 1. Mapbox Token Setup

1. Sign up for a Mapbox account at [https://www.mapbox.com/](https://www.mapbox.com/)
2. Create a new access token in your Mapbox account
3. Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

### 2. Required Dependencies

The project uses these dependencies (already included in package.json):
```json
{
  "dependencies": {
    "mapbox-gl": "^3.11.0",
    "react": "^19",
    "react-dom": "^19"
  }
}
```

### 3. CSS Setup

Add these required styles to your `app/globals.css`:

```css
/* Essential Mapbox container styles */
.map-container {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

/* Make sure the map takes up the full container */
.mapboxgl-map {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}

/* Ensure the canvas is properly sized */
.mapboxgl-canvas {
  width: 100% !important;
  height: 100% !important;
}

/* Style the marker */
.marker-pin {
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Style the popup */
.mapboxgl-popup {
  max-width: 200px;
}

.mapboxgl-popup-content {
  padding: 0;
  border-radius: 8px;
}
```

### 4. Usage

To use the map component in your pages:

```typescript
import { ProfileMap } from '@/components/profile-map'

// Example profile data structure
const profile = {
  name: "John Doe",
  location: {
    city: "San Francisco",
    country: "USA",
    coordinates: {
      lng: -122.4194, // Longitude must come first
      lat: 37.7749    // Latitude second
    }
  }
}

// In your component
export default function YourComponent() {
  return (
    <div className="h-[400px] w-full">
      <ProfileMap profile={profile} />
    </div>
  )
}
```

### 5. Troubleshooting

If the map isn't displaying:

1. Check your browser console for errors
2. Verify your Mapbox token is correct and has the necessary permissions
3. Ensure the container has a defined height
4. Check that the coordinates are in the correct format (longitude, latitude)
5. Verify that the Mapbox CSS is being imported correctly

### 6. Important Notes

- Always keep your Mapbox token in environment variables
- The map container must have a defined height
- Coordinates should be provided as `{lng: number, lat: number}`
- The map is responsive and will adjust to its container size
- The component includes a loading state while the map initializes

### 7. Features

- Interactive map display
- Custom markers for profile locations
- Popup information windows
- Responsive design
- Loading states
- Error handling
- Navigation controls

### 8. Browser Support

Mapbox GL JS supports:
- Chrome
- Firefox
- Safari
- Edge
- Modern mobile browsers

### 9. Development

To run the project locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Remember to:
1. Set up your `.env.local` file
2. Have a valid Mapbox account and token
3. Check browser console for any errors during development

### 10. License

This project uses Mapbox GL JS, which requires attribution when used in production. Make sure to comply with Mapbox's terms of service and attribution requirements.
