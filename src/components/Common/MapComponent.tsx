import maplibregl from 'maplibre-gl';
import React, { useEffect, useRef } from 'react';

import '../../css/components/common/MapComponent.css'
import { Map } from 'maplibre-gl';



interface MapComponentProps {
    searchTerm: string,
    mapIsReadyCallback?: (map: Map) => void
}

const MyMap = ({ searchTerm, mapIsReadyCallback }: MapComponentProps) => {
    const mapContainer = useRef(null);

    useEffect(() => {
        const myAPIKey = process.env.REACT_APP_OSM_API_KEY;
        const mapStyle =
            'https://maps.geoapify.com/v1/styles/klokantech-basic/style.json';

        const initialState = {
            lng: 15.233140,
            lat: 46.154340,
            zoom: 14,
        };

        const map = new Map({
            container: mapContainer.current!,
            style: `${mapStyle}?apiKey=${myAPIKey}`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
        });

        map.addControl(new maplibregl.NavigationControl());

        mapIsReadyCallback && mapIsReadyCallback(map);
    }, [mapContainer.current]);

    return <div className="map-container" ref={mapContainer}></div>;
};

export default MyMap;