import React from 'react'
import {
  FieldValues,
  Form,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import FormInput from '../Common/FormInput'
import PrimaryButton from '../PrimaryButton'

type Props = { onSubmit: (data: any) => void }

const SignupForm = ({ onSubmit }: Props) => {
  const methods = useForm()

  const onSubmitValid: SubmitHandler<FieldValues> = (data) => {
    window.alert('Form submitted')
    console.log(data)
    // window.alert(JSON.stringify(data))
    // onSubmit(data)
  }

  const onSubmitErr = (errors: any) => {
    console.log(errors)
    window.alert('Please fill out all fields')
  }

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4 space-y-4 text-start"
        onSubmit={methods.handleSubmit(onSubmitValid, onSubmitErr)}
      >
        <FormInput title="First Name" name="firstName" type="text" required />
        <FormInput title="Last Name" name="lastName" type="text" required />
        <FormInput title="Email" name="email" type="email" required />
        <FormInput title="Password" name="password" type="password" required />
        <FormInput
          title="Confirm Password"
          name="passwordConfirm"
          type="password"
          required
        />

        <PrimaryButton block className="w-100 block" type="submit">
          SIGN UP
        </PrimaryButton>
      </form>
    </FormProvider>
  )
}

export default SignupForm
