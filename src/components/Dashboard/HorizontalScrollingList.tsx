import React from 'react'

const HorizontalScrollingList = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="hide-scroll-bar -me-8 flex overflow-x-scroll pe-8">
      <div className="ml-10 flex flex-nowrap space-x-6 first:ml-0 md:ml-20 lg:ml-40">
        {children}
      </div>
    </div>
  )
}

export default HorizontalScrollingList
