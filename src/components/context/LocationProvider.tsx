import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { ApiResult } from '../../services/authApi';
import locationApi from '../../services/locationApi';

export interface LocationContextType {
    // a number which a child component uses inside an effect to refresh its locations collection
    updateIndicatorIdx: number,
    deleteLocation: (locationId: string | number) => Promise<ApiResult>
}

var LocationContext = React.createContext<LocationContextType>({ updateIndicatorIdx: 0, deleteLocation: null! });

function LocationProvider({ children }: { children: React.ReactNode }) {
    const [updateIndicatorIdx, setUpdateIndicatorIdx] = useState<number>(0)

    const deleteLocation = async (locationId: string | number) => {
        const result = await locationApi.deleteLocation(locationId)
        // force a refresh 
        setUpdateIndicatorIdx(updateIndicatorIdx + 1)
        return result
    }

    let value = { deleteLocation, updateIndicatorIdx };
    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}


export function useLocationsContext() {
    return React.useContext(LocationContext);
}


export default LocationProvider