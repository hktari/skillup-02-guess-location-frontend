import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PickImageComponent from '../components/Common/PickImageComponent'
import { useAuth } from '../components/context/AuthProvider'
import AsideSectionBrandDesktop from '../components/Signup/AsideSectionBrandDesktop'
import '../css/pages/SignupPage.css'
import authApi from '../services/authApi'
import { fileToBase64 } from '../util/fileUtil'

type Props = {}

const SignupPage = (props: Props) => {

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const selectedImageBase64 = useRef<string>('')

    const navigate = useNavigate()
    const { login } = useAuth()

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        try {
            await authApi.signup(email, firstName, lastName, password, selectedImageBase64.current)
            await login(email, password)
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
            window.alert('Failed to sign up. Please try again.')
        }
    }

    return (
        <div className="w3-row">
            <div className="w3-half w3-container w3-padding-large w3-padding-64">
                <h1 className='header3 text-center'>Sign up</h1>
                <p className="body text-center">Your name will appear on posts and your public profile</p>
                <PickImageComponent onImagePicked={(img) => selectedImageBase64.current = img} />
                <form className='form' onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={e => setEmail(e.currentTarget.value)}
                        type="email" id="email" required />

                    <label htmlFor="firstName">First Name</label>
                    <input value={firstName} onChange={e => setFirstName(e.currentTarget.value)}
                        type="text" id="firstName" required />

                    <label htmlFor="lastName">last Name</label>
                    <input value={lastName} onChange={e => setLastName(e.currentTarget.value)}
                        type="text" id="lastName" required />

                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={e => setPassword(e.currentTarget.value)}
                        type="password" id="password" required />

                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.currentTarget.value)}
                        type="password" id="passwordConfirm" required />

                    <input type="submit" className='btn btn-positive btn-block' value='SIGN UP' />
                </form>
                <div className="form-footer">
                    Already have an account ? <Link to="/login" className='link'>Login</Link>
                </div>
            </div>
            <div className="w3-half w3-hide-small">
                <AsideSectionBrandDesktop />
            </div>
        </div>
    )
}

export default SignupPage