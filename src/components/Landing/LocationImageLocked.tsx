import React from 'react'

type LocationImageLockedProps = {
    img: any,
    title: string
}

const LocationImageLocked = ({ img, title }: LocationImageLockedProps) => {
    return (
        <div className='img-locked'>
            <img src={img} alt="title" />
            <div className="img-overlay">
            </div>
            <span className="material-icons">lock</span>
        </div>
    )
}

export default LocationImageLocked