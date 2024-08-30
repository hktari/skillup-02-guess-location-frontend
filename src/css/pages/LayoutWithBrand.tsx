import React from 'react'
import AsideSectionBrandDesktop from '../../components/Signup/AsideSectionBrandDesktop'

interface LayoutWithBrandProps {
  content: React.ReactNode
}

const LayoutWithBrand = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-20">
      <div className="space-y-4 px-12 text-center">{children}</div>
      <div className="hidden md:visible">
        <AsideSectionBrandDesktop />
      </div>
    </div>
  )
}

export default LayoutWithBrand
