import React from 'react'
import bgImage from '../../assets/images/google-maps-bg.png'
import brandLogoTop from '../../assets/vectors/brand-logo-top.svg'
import brandLogoBottom from '../../assets/vectors/brand-logo-bottom.svg'

type Props = {}

const AsideSectionBrandDesktop = (props: Props) => {
    return (
        <div className='brand-logo'>
            <img className='bg-map' src={bgImage} alt="google maps" />
            <div className="overlay"></div>
            <img className='logo logo-top' src={brandLogoTop} alt="" />
            <img className='logo logo-bottom' src={brandLogoBottom} alt="" />
        </div>
    )
}

export default AsideSectionBrandDesktop