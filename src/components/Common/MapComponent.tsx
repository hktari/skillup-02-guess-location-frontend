import maplibregl from 'maplibre-gl'
import React, { MutableRefObject, useEffect, useRef } from 'react'

import { Map } from 'maplibre-gl'
import UserMapPin from '../../assets/images/user-map-pin.png'

function mapToLngLatLike(coords: Coordinates): maplibregl.LngLatLike {
  return {
    lat: coords.lat,
    lon: coords.lng,
  }
}

export interface Coordinates {
  lat: number
  lng: number
}
interface MapComponentProps {
  targetCoords?: Coordinates
  guessCords?: Coordinates
  coords?: Coordinates | null
  zoom?: number
  mapIsReadyCallback?: (map: Map) => void
}
const defaultCoords = {
  lng: 15.23314,
  lat: 46.15434,
}

const MyMap = ({
  targetCoords,
  guessCords,
  coords = defaultCoords,
  zoom = 14,
  mapIsReadyCallback,
}: MapComponentProps) => {
  const mapContainer = useRef(null)

  if (!coords) {
    coords = defaultCoords
  }

  useEffect(() => {
    // init
    const myAPIKey = process.env.REACT_APP_OSM_API_KEY
    const mapStyle =
      'https://maps.geoapify.com/v1/styles/klokantech-basic/style.json'

    const initialState = {
      lat: coords?.lat,
      lng: coords?.lng,
      zoom: 14,
    }

    const map = new Map({
      container: mapContainer.current!,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [initialState.lng!, initialState.lat!],
      zoom: initialState.zoom,
    })

    map.addControl(new maplibregl.NavigationControl())
    if (guessCords) {
      const userMarker = new maplibregl.Marker({
        color: '#d85454',
      })
      userMarker.setLngLat({ lat: guessCords.lat, lon: guessCords.lng })
      userMarker.addTo(map)
    }
    if (targetCoords) {
      const targetMarker = new maplibregl.Marker({
        color: '#60a83e',
      })
      targetMarker.setLngLat({ lat: targetCoords.lat, lon: targetCoords.lng })
      targetMarker.addTo(map)
    }

    if (guessCords && targetCoords) {
      map.fitBounds(
        [mapToLngLatLike(guessCords), mapToLngLatLike(targetCoords)],
        { padding: 20 },
      )
    } else if (guessCords) {
      map.setCenter(mapToLngLatLike(guessCords))
    }

    mapIsReadyCallback && mapIsReadyCallback(map)
  }, [mapContainer.current, coords, zoom])

  return (
    <div className="h-56 overflow-hidden rounded-md bg-gray-400" ref={mapContainer}></div>
  )
}

export default MyMap
