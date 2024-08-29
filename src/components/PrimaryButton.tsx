import React from 'react'

type Props = {
  onClick: () => void
  text: string
}

const PrimaryButton = ({ text, onClick }: Props) => {
  return (
    <button
      className="bg-patina-400 hover:bg-patina-200 hover:ring-patina-400 h-12 w-32 rounded text-white hover:text-slate-800 hover:ring-2"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default PrimaryButton
