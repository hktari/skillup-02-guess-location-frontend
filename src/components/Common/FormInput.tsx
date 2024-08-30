import React from 'react'
import { useFormContext } from 'react-hook-form'

type Props = { name: string } & React.InputHTMLAttributes<HTMLInputElement>

const FormInput = ({ title, name, type, required }: Props) => {
  const { register } = useFormContext()

  return (
    <div>
      <label className="" htmlFor={name}>
        {title}
      </label>
      <input {...register(name, { required })} type={type} />
    </div>
  )
}

export default FormInput
