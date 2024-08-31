import React from 'react'
import AsideSectionBrandDesktop from '../../components/Signup/AsideSectionBrandDesktop'

type Props = {}

const LayoutWithBrand = ({
  children,
  className,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="grid-cols-2 py-20 md:grid">
      <div className={`space-y-4 px-12 text-center ${className}`}>
        {children}
      </div>
      <div className="hidden md:block">
        <AsideSectionBrandDesktop />
      </div>
    </div>
  )
}

export default LayoutWithBrand
