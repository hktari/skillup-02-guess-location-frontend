import React from 'react'

interface FloatingIconButtonProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  icon: string
  backgroundColor: 'red' | 'gray' | 'green'
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const FloatingIconButton = (props: FloatingIconButtonProps) => {
  const { icon, position, backgroundColor = 'gray' } = props
  const buttonProps = {
    ...props,
    icon: undefined,
    position: undefined,
    backgroundColor: undefined,
  }

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

  let backgroundColorClass = ''
  switch (backgroundColor) {
    case 'red':
      backgroundColorClass = 'bg-red-200 hover:ring-red-700'
      break
    case 'gray':
      backgroundColorClass = 'bg-gray-200 hover:ring-gray-700'
      break
    case 'green':
      backgroundColorClass = 'bg-emerald-200 hover:ring-emerald-700'
      break
    default:
      throw new Error('Invalid background color')
  }

  return (
    <button
      {...buttonProps}
      className={`hover absolute m-2 flex items-center justify-center rounded-md border-none p-1 transition-transform hover:scale-105 hover:ring-2 ${backgroundColorClass} ${positionClass}`}
    >
      <span className="material-icons">{icon}</span>
    </button>
  )
}

export default FloatingIconButton
