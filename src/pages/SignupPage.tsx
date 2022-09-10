import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedImageBase64, setSelectedImageBase64] = useState('')

    const selectedImageRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate()
    const { login } = useAuth()

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        try {
            await authApi.signup(email, firstName, lastName, password, selectedImageBase64)
            await login(email, password)
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
            window.alert('Failed to sign up. Please try again.')
        }
    }

    async function onImagePicked(event: any) {
        if (event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);

            const selectedImgEl: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement
            selectedImgEl.onload = () => {
                URL.revokeObjectURL(selectedImgEl.src);
            }

            setSelectedImage(URL.createObjectURL(event.target.files[0]))

            const imgBase64 = await fileToBase64(event.target.files[0])
            setSelectedImageBase64(imgBase64)
        }
    }


    return (
        <div className="w3-row">
            <div className="w3-half w3-container w3-padding-large w3-padding-64">
                <h1 className='header3 text-center'>Sign up</h1>
                <p className="body text-center">Your name will appear on posts and your public profile</p>
                <button className='select-profile-img btn btn-circle'
                    onClick={() => selectedImageRef.current?.click()}>
                    <span className="material-icons">
                        person
                    </span>
                    <img id='selectedImage' src={selectedImage} alt="" hidden={!selectedImage} />
                    <input accept="image/png, image/jpeg" type='file' id='image'
                        ref={selectedImageRef} style={{ display: 'none' }}
                        onChange={onImagePicked} />
                </button>
                <form className='form' onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={e => setEmail(e.currentTarget.value)} 
                    type="email" id="email" required />

                    <label htmlFor="firstName">First Name</label>
                    <input value={firstName} onChange={e => setFirstName(e.currentTarget.value)}
                        type="text" id="firstName" required/>

                    <label htmlFor="lastName">last Name</label>
                    <input value={lastName} onChange={e => setLastName(e.currentTarget.value)}
                        type="text" id="lastName" required/>

                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={e => setPassword(e.currentTarget.value)}
                        type="password" id="password" required/>

                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.currentTarget.value)}
                        type="password" id="passwordConfirm" required/>

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