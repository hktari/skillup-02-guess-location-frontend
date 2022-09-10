import React from 'react'
import AsideSectionBrandDesktop from '../components/Signup/AsideSectionBrandDesktop'
import '../css/pages/SignupPage.css'

type Props = {}

const SignupPage = (props: Props) => {

    function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        console.log('sign up')
    }

    return (
        <div className="w3-row">
            <div className='container container-center signup w3-mobile w3-half'>
                <h1 className='header3 text-center'>Sign up</h1>
                <p className="body text-center">Your name will appear on posts and your public profile</p>
                <button className='btn btn-circle'>
                    <span className="material-icons">
                        person
                    </span>
                </button>
                <form className='form' onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />

                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" />

                    <label htmlFor="lastName">last Name</label>
                    <input type="text" id="lastName" />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />

                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input type="password" id="passwordConfirm" />

                    <input type="submit" className='btn btn-positive btn-block' value='SIGN UP' />
                </form>
                <div className="form-footer">
                    Already have an account ? <a href="/login" className='link'>Login</a>
                </div>
            </div>
            <div className="w3-half w3-hide-small">
                <AsideSectionBrandDesktop />
            </div>
        </div>
    )
}

export default SignupPage