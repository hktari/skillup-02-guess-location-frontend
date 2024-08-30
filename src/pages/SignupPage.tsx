import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PickImageComponent from '../components/Common/PickImageComponent'
import { useAuth } from '../components/context/AuthProvider'
import InfoModal from '../components/modals/InfoModal'
import AsideSectionBrandDesktop from '../components/Signup/AsideSectionBrandDesktop'
import LayoutWithBrand from '../css/pages/LayoutWithBrand'
import '../css/pages/SignupPage.css'
import authApi from '../services/authApi'
import { fileToBase64 } from '../util/fileUtil'
import PrimaryButton from '../components/PrimaryButton'

type Props = {}

const SignupPage = (props: Props) => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [displayInfo, setDisplayInfo] = useState(false)
  const [infoMessage, setInfoMessage] = useState('')

  const selectedImageBase64 = useRef<string>('')

  const navigate = useNavigate()
  const { login } = useAuth()

  function showInfo(message: string) {
    setInfoMessage(message)
    setDisplayInfo(true)
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    let signupSuccess = false

    try {
      await authApi.signup(
        email,
        firstName,
        lastName,
        password,
        selectedImageBase64.current,
      )
      signupSuccess = true
      showInfo('Successfully created profile')
    } catch (error: any) {
      console.error(error)
      showInfo('Failed to sign up: ' + error?.message)
    }

    let autologinSuccess = false
    try {
      await login(email, password)
      autologinSuccess = true
      navigate('/dashboard')
    } catch (error) {
      console.error('failed to login automatically')
      console.error(error)
    }

    if (signupSuccess && !autologinSuccess) {
      navigate('/login')
    }
  }

  return (
    <>
      <LayoutWithBrand>
        <h1 className="text-5xl font-bold">Sign up</h1>
        <p>Your name will appear on posts and your public profile</p>
        <div className="mx-auto inline-block">
          <PickImageComponent
            onImagePicked={(img) => (selectedImageBase64.current = img)}
          />
        </div>
        <section className="flex flex-col items-center pt-6">
          <div className="w-full bg-white sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={onSubmit}
                method="POST"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-patina-600 focus:ring-patina-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-patina-500 dark:focus:ring-patina-500"
                    placeholder="Emelia Erickson"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-patina-600 focus:ring-patina-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-patina-500 dark:focus:ring-patina-500"
                    placeholder="emelia@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-patina-600 focus:ring-patina-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-patina-500 dark:focus:ring-patina-500"
                    required
                  />
                </div>
                <PrimaryButton type="submit">Create an account</PrimaryButton>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <a
                    className="font-medium text-patina-600 hover:underline dark:text-patina-500"
                    href="/signin"
                  >
                    Sign in here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </section>
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

export default SignupPage
