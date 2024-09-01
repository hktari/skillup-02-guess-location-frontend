import React from 'react'
import { LocationImage } from '../../services/interface'

type Props = {
  items: LocationImage[]
  ItemComponent: React.FC<{ locationImage: LocationImage }>
}

const HorizontalScrollingList = ({ items: images, ItemComponent }: Props) => {
  return (
    <div className="hide-scroll-bar -me-8 flex overflow-x-scroll pe-8">
      <div className="ml-10 flex flex-nowrap space-x-6 first:ml-0 md:ml-20 lg:ml-40">
        {images.map((image) => (
          <div key={`horizontal-img-list-${image.id}`} className="inline-block">
            <ItemComponent locationImage={image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HorizontalScrollingList
