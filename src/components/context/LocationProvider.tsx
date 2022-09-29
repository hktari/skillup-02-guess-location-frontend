import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { ApiResult, LocationImage } from '../../services/interface';
import locationApi from '../../services/locationApi';

export interface LocationContextType {
    // a number which a child component uses inside an effect to refresh its locations collection
    updateIndicatorIdx: number,
    deleteLocation: (locationId: string) => Promise<void>,
    addLocation: (address : string, lat: number, lng:number, imageBase64:string) => Promise<LocationImage>
}

var LocationContext = React.createContext<LocationContextType>({ updateIndicatorIdx: 0, deleteLocation: null!, addLocation: null! });

function LocationProvider({ children }: { children: React.ReactNode }) {
    const [updateIndicatorIdx, setUpdateIndicatorIdx] = useState<number>(0)

    const deleteLocation = async (locationId: string) => {
        const result = await locationApi.deleteLocation(locationId)
        // force a refresh 
        setUpdateIndicatorIdx(updateIndicatorIdx + 1)
        return result
    }

    const addLocation = async (address: string, lat: number, lng: number, imageBase64: string) => {
        const result = await locationApi.addLocation(address, lat, lng, imageBase64)
        setUpdateIndicatorIdx(updateIndicatorIdx + 1)
        return result
    }

    let value = { deleteLocation, updateIndicatorIdx, addLocation };
    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}


export function useLocationsContext() {
    return React.useContext(LocationContext);
}


export default LocationProvider