import React from 'react'
import { useFormContext } from 'react-hook-form'

type Props = { name: string } & React.InputHTMLAttributes<HTMLInputElement>

const FormInput = ({ title, name, type, required }: Props) => {
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium" htmlFor={name}>
        {title}
      </label>
      <input
        className="box-border rounded-sm border-b-[0.5px] border-black focus:px-3 py-3 transition-all focus:bg-patina-100 outline-none focus-visible:border-patina-500"
        {...register(name, { required })}
        type={type}
      />
    </div>
  )
}

export default FormInput
