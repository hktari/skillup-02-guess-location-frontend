import React from 'react'

type Props = {
  block?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>
const PrimaryButton = (props: Props) => {
  const buttonProps = { ...props, block: undefined }
  const block = props.block ? 'w-full' : ''
  return (
    <button
      {...props}
      className={`h-12 w-32 rounded bg-patina-400 text-white hover:bg-patina-200 hover:text-slate-800 hover:ring-2 hover:ring-patina-400 ${block}`}
    >
      {props?.children}
    </button>
  )
}

export default PrimaryButton
