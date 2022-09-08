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
                <LocationImageGuess img={locationImage.image}
                    title={locationImage.address}
                    text={`${locationImage.guessErrorMeters} m`} />
            </div>
        )
    }

    return (
        <div className='horizontal-img-container'>
            {
                images.map(img => <RenderImageItem img={img} />)
            }
        </div>
    )
}

export default HoriznotalImageList