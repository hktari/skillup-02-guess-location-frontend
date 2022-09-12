import React from 'react'
import { useLocation } from 'react-router-dom'

type FooterProps = {}

const Footer = (props: FooterProps) => {

    const location = useLocation()

    function shouldShowFooter() {
        return !(location.pathname.includes('signup') || location.pathname.includes('login'))
    }

    return (
        <footer hidden={!shouldShowFooter()} >
            <div className="footer">
                <span className='brand-name'>Geotagger</span>
                <small>All Rights Reserved | skillupmentorcom</small>
            </div>
        </footer>
    )
}

export default Footer