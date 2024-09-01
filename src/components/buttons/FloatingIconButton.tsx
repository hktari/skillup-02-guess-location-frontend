import React from 'react'

interface IconButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  icon: string
  backgroundColor: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const IconButton = (props: IconButtonProps) => {
  const { icon, position, backgroundColor = 'gray' } = props
  let positionClass = ''
  switch (position) {
    case 'top-left':
      positionClass = 'top-0 left-0'
      break
    case 'top-right':
      positionClass = 'top-0 right-0'
      break
    case 'bottom-left':
      positionClass = 'bottom-0 left-0'
      break
    case 'bottom-right':
      positionClass = 'bottom-0 right-0'
      break
  }

  let backgroundColorClass = `bg-${backgroundColor}-200 hover:ring-${backgroundColor}-700`

  return (
    <button
      {...props}
      className={`absolute m-2 flex items-center justify-center rounded-md p-1 transition-transform hover:scale-105 hover:ring-2 ${backgroundColorClass} ${positionClass}`}
    >
      <span className="material-icons">{icon}</span>
    </button>
  )
}

export default IconButton
