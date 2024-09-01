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
    <div className=" ">
      <label className="text-2xl">Location</label>
      <div
        key={'895ABFA9-B7F8-42C2-8B70-73211FD769E5'}
        id="autocomplete"
        className="c-autocomplete relative mt-2"
      ></div>
    </div>
  )
}

export default SearchStreetComponent
