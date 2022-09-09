import React, { useEffect, useState } from 'react'
import osmApi from '../../services/osmApi'
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '../../css/components/common/SearchStreetComponent.css'

type SearchStreetComponentProps = {
    onAddressPicked: (addressInfo: any) => void}

const SearchStreetComponent = ({ onAddressPicked}: SearchStreetComponentProps) => {
    const [searchTerm, setAddress] = useState('')
    const [lastChangeTime, setLastChangeTime] = useState(Date.now())
    const [prevSearchTerm, setPrevAddress] = useState('')


    useEffect(() => {
        console.log('rendering geocoder input')
        const autocomplete = new GeocoderAutocomplete(
            document.getElementById("autocomplete")!,
            process.env.REACT_APP_OSM_API_KEY!,
            { /* Geocoder options */ });

        autocomplete.on('select', (location) => {
            // check selected location here 
            console.log('selected', location)
        });

        autocomplete.on('suggestions', (suggestions) => {
            // process suggestions here
        });
    }, [])

    return (
        <div id="autocomplete" className="autocomplete-container location-address">
            <label htmlFor='address' className="body">Location</label>
        </div>
    )
}

export default SearchStreetComponent