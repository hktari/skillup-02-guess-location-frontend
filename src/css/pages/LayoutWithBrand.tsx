import React from 'react'
import AsideSectionBrandDesktop from '../../components/Signup/AsideSectionBrandDesktop'

interface LayoutWithBrandProps {
  content: React.ReactNode
}

const LayoutWithBrand = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid-cols-2 py-20 md:grid">
      <div className="space-y-4 px-12 text-center">{children}</div>
      <div className="hidden md:block">
        <AsideSectionBrandDesktop />
      </div>
    </div>
  )
}

export default LayoutWithBrand
