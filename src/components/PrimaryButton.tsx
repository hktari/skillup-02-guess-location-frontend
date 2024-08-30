import React from 'react'

const PrimaryButton = ({
  onClick,
  type,
  children,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      className="h-12 w-32 rounded bg-patina-400 text-white hover:bg-patina-200 hover:text-slate-800 hover:ring-2 hover:ring-patina-400"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
