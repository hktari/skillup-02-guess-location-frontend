import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PickImageComponent from '../components/Common/PickImageComponent'
import { useAuth } from '../components/context/AuthProvider'
import InfoModal from '../components/modals/InfoModal'
import AsideSectionBrandDesktop from '../components/Signup/AsideSectionBrandDesktop'
import LayoutWithBrand from '../css/pages/LayoutWithBrand'
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
        <form className="text-start" onSubmit={onSubmit}>
          <label className="" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="email"
            id="email"
            required
          />

          <label htmlFor="firstName">First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            type="text"
            id="firstName"
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
            type="text"
            id="lastName"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="password"
            id="password"
            required
          />

          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            type="password"
            id="passwordConfirm"
            required
          />

          <input
            type="submit"
            className="btn btn-positive btn-block"
            value="SIGN UP"
          />
        </form>
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
