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
import PickImageComponent from '../Common/PickImageComponent'
import { SignupData } from '../../services/authApi'

type Props = { onSubmit: (data: SignupData) => void }

const SignupForm = ({ onSubmit }: Props) => {
  const methods = useForm()

  const onSubmitValid: SubmitHandler<FieldValues> = (data) => {
    window.alert('Form submitted')
    console.log(data)
    onSubmit(data as SignupData)
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
        <h1 className="text-5xl font-bold md:text-center">Sign up</h1>
        <p className="md:text-center">
          Your name will appear on posts and your public profile
        </p>
        <div className="mx-auto inline-block">
          {/* TODO: remove after refactoring PickImageCOmponent to use react-hook-form completely */}
          <PickImageComponent onImagePicked={() => {}} />
        </div>
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
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <a
            className="font-medium text-patina-600 hover:underline dark:text-patina-500"
            href="/login"
          >
            Login
          </a>
        </p>
      </form>
    </FormProvider>
  )
}

export default SignupForm
