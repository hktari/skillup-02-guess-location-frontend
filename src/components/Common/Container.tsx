import React from 'react'

const Container = ({
  children,
  className,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`container mx-auto space-y-16 px-8 py-12 ${className}`}>
      {children}
    </div>
  )
}

export default Container
