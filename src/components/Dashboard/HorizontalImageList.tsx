import React from 'react'
import LocationImageGuess from './LocationImageGuess'

type HoriznotalImageListProps = {
    images: any[]
}

const HoriznotalImageList = ({ images }: HoriznotalImageListProps) => {

    return (
        <div className='horizontal-image-container'>
            {
                images.map(img => <LocationImageGuess img={img}
                    title={img.title}
                    text={`${img.guessError} m`} />)
            }
        </div>
    )
}

export default HoriznotalImageList