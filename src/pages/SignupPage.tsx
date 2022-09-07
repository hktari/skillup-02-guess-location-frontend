import React from 'react'
import '../css/SignupPage.css'

type Props = {}

const SignupPage = (props: Props) => {

    function onSubmit(event: React.FormEvent){
        event.preventDefault()
        console.log('sign up')
    }
    
    return (
        <div className='container container-center'>
            <h1 className='header3'>Sign up</h1>
            <p className="body">Your name will appear on posts and your public profile</p>
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
    )
}

export default SignupPage