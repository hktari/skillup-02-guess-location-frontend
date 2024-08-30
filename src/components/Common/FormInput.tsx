import React from 'react'
import { useFormContext, useFormState } from 'react-hook-form'

type Props = { name: string } & React.InputHTMLAttributes<HTMLInputElement>

const FormInput = ({ title, name, type, required }: Props) => {
  const { register } = useFormContext()
  const { errors } = useFormState()
  const hasError = errors[name]
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium" htmlFor={name}>
        {title}
      </label>
      <input
        className={`box-border rounded-sm border-b-[0.5px] border-black py-3 focus:border-2 focus:bg-patina-100 focus:px-3 focus:outline-none focus:ring-patina-800 focus-visible:border-patina-500 ${hasError ? 'border-red-500' : 'border-patina-200'}`}
        {...register(name, { required })}
        type={type}
      />
      {hasError && (
        <span className="text-sm text-red-500">This field is required</span>
      )}
    </div>
  )
}

export default FormInput
