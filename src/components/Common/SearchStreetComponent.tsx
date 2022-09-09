import React, { useEffect, useState } from 'react'

type SearchStreetComponentProps = {
    onAddressPicked: (addressInfo: any) => void
}

const SearchStreetComponent = ({ onAddressPicked }: SearchStreetComponentProps) => {
    const [searchTerm, setAddress] = useState('')
    const [lastChangeTime, setLastChangeTime] = useState(Date.now())
    const [prevSearchTerm, setPrevAddress] = useState('')

    useEffect(() => {
        const monitorAddress = setInterval(() => {
            const searchDelayMs = 1000
            if (prevSearchTerm !== searchTerm && searchTerm.trim().length > 0 && Date.now() - lastChangeTime > searchDelayMs) {
                setPrevAddress(searchTerm)
                searchForAddress(searchTerm)
                onAddressPicked(searchTerm)
            }
        }, 100)

        return () => {
            clearInterval(monitorAddress)
        }
    }, [lastChangeTime, prevSearchTerm, searchTerm])

    function onAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (prevSearchTerm !== event.target.value) {
            setLastChangeTime(Date.now())
        }

        setPrevAddress(searchTerm)
        setAddress(event.target.value)
    }

    return (
        <div className="location-address">
            <label htmlFor='address' className="body">Location</label>
            <input id='address' className='input input-border' type="text"
                placeholder='Enter Address'
                onChange={onAddressChange}
                value={searchTerm} />
        </div>
    )
}

export default SearchStreetComponent