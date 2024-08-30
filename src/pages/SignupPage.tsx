import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/context/AuthProvider'
import InfoModal from '../components/modals/InfoModal'
import AsideSectionBrandDesktop from '../components/Signup/AsideSectionBrandDesktop'
import LayoutWithBrand from '../css/pages/LayoutWithBrand'
import authApi, { SignupData } from '../services/authApi'
import { fileToBase64 } from '../util/fileUtil'
import PrimaryButton from '../components/PrimaryButton'
import { useForm } from 'react-hook-form'
import SignupForm from '../components/Signup/signupForm'

type Props = {}

const SignupPage = (props: Props) => {
  const [displayInfo, setDisplayInfo] = useState(false)
  const [infoMessage, setInfoMessage] = useState('')

  const navigate = useNavigate()
  const { login } = useAuth()

  function showInfo(message: string) {
    setInfoMessage(message)
    setDisplayInfo(true)
  }

  async function onSignup(data: SignupData) {
    let signupSuccess = false
    try {
      await authApi.signup(data)
      signupSuccess = true
      showInfo('Successfully created profile')
    } catch (error: any) {
      console.error(error)
      showInfo('Failed to sign up: ' + error?.message)
    }
    let autologinSuccess = false
    try {
      const { email, password } = data
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
        <SignupForm onSubmit={onSignup} />
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
