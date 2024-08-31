import React from 'react'
import { LocationImage } from '../../services/interface'
import LocationImageGuess from './LocationImageGuess'

type HoriznotalImageListProps = {
  images: LocationImage[]
}

const HoriznotalImageList = ({ images }: HoriznotalImageListProps) => {
  function RenderImageItem({ img: locationImage }: { img: LocationImage }) {
    return (
      <div className="inline-block">
        <LocationImageGuess locationImage={locationImage} />
      </div>
    )
  }

  return (
    <div className="hide-scroll-bar flex overflow-x-scroll -me-8 pe-8">
      <div className="ml-10 flex flex-nowrap space-x-6 first:ml-0 md:ml-20 lg:ml-40">
        {' '}
        {images.map((img) => (
          <RenderImageItem key={`horizontal-img-list-${img.id}`} img={img} />
        ))}
      </div>
    </div>
  )
}

export default HoriznotalImageList
