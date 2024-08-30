import React from 'react'
import bgImage from '../../assets/images/google-maps-bg.png'
import brandLogoTop from '../../assets/vectors/brand-logo-top.svg'
import brandLogoBottom from '../../assets/vectors/brand-logo-bottom.svg'

type Props = {}

const AsideSectionBrandDesktop = (props: Props) => {
  return (
    <div className="fixed inset-y-0 right-0 grid h-screen w-[50vw] grid-cols-1 grid-rows-1 bg-orange-300">
      <img
        src={bgImage}
        alt="google maps"
        className="col-start-1 col-end-2 row-start-1 row-end-2 h-full bg-sky-300 object-cover"
      />
      <div className="h-100 col-start-1 col-end-2 row-start-1 row-end-2 grid items-center justify-center bg-patina-400 opacity-75">
        <div className="">
          <img src={brandLogoTop} alt="" />
          <img src={brandLogoBottom} alt="" />
        </div>
      </div>
    </div>
  )
}

export default AsideSectionBrandDesktop
