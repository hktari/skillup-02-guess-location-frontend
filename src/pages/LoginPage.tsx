import React from 'react'
import AsideSectionBrandDesktop from '../components/Signup/AsideSectionBrandDesktop'
import '../css/pages/LoginPage.css'
import logo from '../assets/images/logo.png'

type Props = {}

const LoginPage = (props: Props) => {

    function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        console.log('sign up')
    }

    return (
        <div className="w3-row">
            <div className='container container-center w3-mobile w3-half'>
                <h1 className='header3'>Sign in</h1>
                <p className="body">Welcome back to Geotagger. We are glad that you are back.</p>
                <form className='form' onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className='input-border' type="text" id="email" />
                    <label htmlFor="password">Password</label>
                    <input className='input-border' type="password" id="password" />

                    <input type="submit" className='btn btn-positive btn-block' value='SIGN IN' />
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