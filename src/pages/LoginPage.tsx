import React, { useState } from 'react'
import AsideSectionBrandDesktop from '../components/Signup/AsideSectionBrandDesktop'
import '../css/pages/LoginPage.css'
import logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/context/AuthProvider'
import LayoutWithBrand from '../css/pages/LayoutWithBrand'

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
        <LayoutWithBrand>
            <h1 className='header3 text-center'>Sign in</h1>
            <p className="body text-center w3-padding-16">Welcome back to Geotagger. We are glad that you are back.</p>
            <form className='form' onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input className='input-border' type="text"
                    value={email} id="email"
                    onChange={(e) => setEmail(e.currentTarget.value)} />

                <label htmlFor="password">Password</label>
                <input className='input-border' type="password"
                    value={password} id="password"
                    onChange={(e) => setPassword(e.currentTarget.value)} />

                <div className="w3-margin-top"></div>
                <input type="submit"
                    className='btn btn-positive btn-block'
                    value='SIGN IN' />
            </form>
            <div className="form-footer">
                <p>

                    <span className=''>Do you want to create an account ?<a href="/signup" className='link w3-right'>Sign up</a></span>
                </p>

            </div>
        </LayoutWithBrand>
    )
}
export default LoginPage