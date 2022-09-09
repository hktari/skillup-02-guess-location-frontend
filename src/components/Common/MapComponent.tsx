import React from 'react'
import '../../css/components/common/MapComponent.css'

type MapComponentProps = {
    searchTerm: string
}

const MapComponent = ({ searchTerm }: MapComponentProps) => {
    const searchTermEncoded = encodeURIComponent(searchTerm)
    return (
        <div className="map-container">
            <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" src={`https://www.google.com/maps/embed/v1/search?q=${searchTermEncoded}&key=AIzaSyDNRcu5VIhm_sgBSdZPHG6SAe9UClEFS4U`}></iframe>
        </div>
    )
}

export default MapComponent