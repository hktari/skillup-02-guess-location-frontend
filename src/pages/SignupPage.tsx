import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AsideSectionBrandDesktop from '../components/Signup/AsideSectionBrandDesktop'
import '../css/pages/SignupPage.css'

type Props = {}

const SignupPage = (props: Props) => {

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [selectedImage, setSelectedImage] = useState('')

    function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        console.log('sign up')
    }

    return (
        <div className="w3-row">
            <div className="w3-half w3-container w3-padding-large w3-padding-64">
                <h1 className='header3 text-center'>Sign up</h1>
                <p className="body text-center">Your name will appear on posts and your public profile</p>
                <button className='select-profile-img btn btn-circle'>
                    <span className="material-icons">
                        person
                    </span>
                    <img src={selectedImage} alt="" hidden={!selectedImage} />
                </button>
                <form className='form' onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={e => setEmail(e.currentTarget.value)} type="text" id="email" />

                    <label htmlFor="firstName">First Name</label>
                    <input value={firstName} onChange={e => setFirstName(e.currentTarget.value)}
                        type="text" id="firstName" />

                    <label htmlFor="lastName">last Name</label>
                    <input value={lastName} onChange={e => setLastName(e.currentTarget.value)}
                        type="text" id="lastName" />

                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={e => setPassword(e.currentTarget.value)}
                        type="password" id="password" />

                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.currentTarget.value)}
                        type="password" id="passwordConfirm" />

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