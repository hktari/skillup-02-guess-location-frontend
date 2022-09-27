import maplibregl from 'maplibre-gl';
import React, { MutableRefObject, useEffect, useRef } from 'react';

import '../../css/components/common/MapComponent.css'
import { Map } from 'maplibre-gl';



export interface Coordinates {
    lat: number,
    lng: number
}
interface MapComponentProps {
    coords?: Coordinates | null,
    zoom?: number,
    mapIsReadyCallback?: (map: Map) => void

}
const defaultCoords = {
    lng: 15.233140,
    lat: 46.154340,
}

const MyMap = ({ coords = defaultCoords, zoom = 14, mapIsReadyCallback }: MapComponentProps) => {
    const mapContainer = useRef(null);

    if (!coords) {
        coords = defaultCoords
    }

    useEffect(() => {
        // init
        const myAPIKey = process.env.REACT_APP_OSM_API_KEY;
        const mapStyle =
            'https://maps.geoapify.com/v1/styles/klokantech-basic/style.json';

        const initialState = {
            lat: coords?.lat,
            lng: coords?.lng,
            zoom: 14,
        };

        const map = new Map({
            container: mapContainer.current!,
            style: `${mapStyle}?apiKey=${myAPIKey}`,
            center: [initialState.lng!, initialState.lat!],
            zoom: initialState.zoom,
        });

        map.addControl(new maplibregl.NavigationControl());

        mapIsReadyCallback && mapIsReadyCallback(map);
    }, [mapContainer.current, coords, zoom]);

    return <div className="map-container" ref={mapContainer}></div>;
};

export default MyMap;