import React, { useEffect, useState } from 'react'
import AsideSectionBrandDesktop from '../components/Signup/AsideSectionBrandDesktop'
import '../css/pages/LoginPage.css'
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/context/AuthProvider'
import LayoutWithBrand from '../css/pages/LayoutWithBrand'
import InfoModal from '../components/modals/InfoModal'
import { ApiError } from '../services/httpService'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import FormInput from '../components/Common/FormInput'
import PrimaryButton from '../components/PrimaryButton'

type Props = {}

const LoginPage = (props: Props) => {
  const [displayInfo, setDisplayInfo] = useState(false)
  const [infoMessage, setInfoMessage] = useState('')

  const navigate = useNavigate()

  const { login } = useAuth()

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async ({
    email,
    password,
  }) => {
    try {
      console.log('login', email, password)
      await login(email, password)
      navigate('/dashboard')
    } catch (error: any) {
      console.error(error)

      setInfoMessage('Invalid credentials. Please try again.')
      setDisplayInfo(true)
    }
  }

  const methods = useForm({
    defaultValues: {
      email: process.env.REACT_APP_DEMO_USER_EMAIL || '',
      password: process.env.REACT_APP_DEMO_USER_PASSWORD || '',
    },
  })

  return (
    <>
      <LayoutWithBrand className="space-y-6">
        <h1 className="text-center text-5xl font-bold">Sign in</h1>
        <p className="text-center text-lg">
          Welcome back to Geotagger. We are glad that you are back.
        </p>
        <FormProvider {...methods}>
          <form
            className="space-y-6 text-start"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FormInput title="Email" name="email" type="text" required />
            <FormInput
              title="Password"
              name="password"
              type="password"
              required
            />

            <PrimaryButton type="submit" block>
              SIGN IN
            </PrimaryButton>
          </form>
        </FormProvider>
        <div className="text-start">
          Don't have an account yet ?
          <Link to="/signup" className="ms-4 text-patina-400">
            Sign up
          </Link>
        </div>
      </LayoutWithBrand>
      <InfoModal
        isOpen={displayInfo}
        handleClose={() => setDisplayInfo(false)}
        title="Login Failed"
        message={infoMessage}
        onFinished={(result) => setDisplayInfo(false)}
      />
    </>
  )
}
export default LoginPage
