import React, { useEffect, useState } from 'react'
import osmApi from '../../services/osmApi'
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete'
import { OsmAddress } from '../../services/osm.interface'

type SearchStreetComponentProps = {
  onAddressPicked: (addressInfo: OsmAddress) => void
}

const SearchStreetComponent = ({
  onAddressPicked,
}: SearchStreetComponentProps) => {
  useEffect(() => {
    const autocomplete = new GeocoderAutocomplete(
      document.getElementById('autocomplete')!,
      process.env.REACT_APP_OSM_API_KEY!,
      {
        type: 'street',
      },
    )

    autocomplete.on('select', (location) => {
      onAddressPicked(location)
    })

    autocomplete.on('suggestions', (suggestions) => {
      // process suggestions here
    })
  }, [])

  return (
    <div key={1} id="autocomplete" className="relative space-y-2 c-autocomplete">
      <label className="text-2xl">Location</label>
    </div>
  )
}

export default SearchStreetComponent
