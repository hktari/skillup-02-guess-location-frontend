import React from 'react'

type Props = {
  block?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>
const PrimaryButton = (props: Props) => {
  const buttonProps = { ...props, className: undefined, block: undefined }
  const block = props.block ? 'w-full' : ''
  return (
    <button
      {...buttonProps}
      className={`h-12 w-32 rounded border border-transparent bg-patina-400 text-white hover:bg-patina-200 hover:text-slate-800 hover:ring-2 hover:ring-patina-400 disabled:border-gray-400 disabled:bg-patina-100 disabled:text-gray-400 ${block}`}
    >
      {props?.children}
    </button>
  )
}

export default PrimaryButton
