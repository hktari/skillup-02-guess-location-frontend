import React from 'react'

type LocationImageLockedProps = {
  img: any
  title: string
}

const LocationImageLocked = ({ img, title }: LocationImageLockedProps) => {
  return (
    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md">
      <img src={img} alt="title" className="w-100 self-stretch object-cover" />
      <div className="bg-patina-400 peer absolute inset-0 opacity-45 hover:opacity-80"></div>
      <span className="material-icons inset absolute text-6xl text-white peer-hover:text-patina-800">
        lock
      </span>
    </div>
  )
}

export default LocationImageLocked
