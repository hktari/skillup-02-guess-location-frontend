import React, { useState } from 'react'
import AsideSectionBrandDesktop from '../components/Signup/AsideSectionBrandDesktop'
import '../css/pages/LoginPage.css'
import logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/context/AuthProvider'

type Props = {}

const LoginPage = (props: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const { login } = useAuth()

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        try {
            await login(email, password)
            navigate('/')                
        } catch (error) {
            console.error(error)
            window.alert('Login failed. Please try again')
        }
    }

    return (
        <div className="w3-row">
            <div className='container container-center w3-mobile w3-half login'>
                <h1 className='header3 text-center'>Sign in</h1>
                <p className="body text-center">Welcome back to Geotagger. We are glad that you are back.</p>
                <form className='form' onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className='input-border' type="text"
                        value={email} id="email"
                        onChange={(e) => setEmail(e.currentTarget.value)} />

                    <label htmlFor="password">Password</label>
                    <input className='input-border' type="password"
                        value={password} id="password"
                        onChange={(e) => setPassword(e.currentTarget.value)} />

                    <input type="submit"
                        className='btn btn-positive btn-block'
                        value='SIGN IN' />
                </form>
                <div className="form-footer">
                    Do you want to ceate an account ?<a href="/signup" className='link'>Sign up</a>
                </div>
            </div>
            <div className="w3-half w3-hide-small">
                <AsideSectionBrandDesktop />
            </div>
        </div>
    )
}
export default LoginPage