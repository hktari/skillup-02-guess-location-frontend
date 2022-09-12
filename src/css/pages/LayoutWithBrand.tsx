import React from 'react'
import AsideSectionBrandDesktop from '../../components/Signup/AsideSectionBrandDesktop'

interface LayoutWithBrandProps {
    content: React.ReactNode
}

const LayoutWithBrand = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout-brand">
            <div className="layout-brand-left-half">
                {children}
            </div>
            <div className="layout-brand-right-half">
                <AsideSectionBrandDesktop />
            </div>
        </div>)
}

export default LayoutWithBrand