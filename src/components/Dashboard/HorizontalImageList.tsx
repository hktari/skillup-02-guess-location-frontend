import React from 'react'
import { LocationImage } from '../../services/interface'
import LocationImageGuess from './LocationImageGuess'

type HoriznotalImageListProps = {
    images: LocationImage[]
}

const HoriznotalImageList = ({ images }: HoriznotalImageListProps) => {

    function RenderImageItem({ img: locationImage }: { img: LocationImage }) {
        return (
            <div className="img-item">
                <LocationImageGuess locationImage={locationImage} />
            </div>
        )
    }

    return (
        <div className='horizontal-img-container'>
            {
                images.map(img => <RenderImageItem key={`horizontal-img-list-${img.id}`} img={img} />)
            }
        </div>
    )
}

export default HoriznotalImageList