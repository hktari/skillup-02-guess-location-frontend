import React, { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useAuth } from '../context/AuthProvider'

interface ModalProps {
    isOpen: boolean,
    handleClose: VoidFunction
}

export interface ProfileSettingsModalProps extends ModalProps {
    handleChangePassword: VoidFunction,
    onChangeProfileImage: VoidFunction
}

const ProfileSettingsModal = ({ isOpen, handleClose, handleChangePassword, onChangeProfileImage }: ProfileSettingsModalProps) => {
    const { user, updateProfile } = useAuth()
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')

    useEffect(() => {
        setFirstName(user?.firstName ?? '')
        setLastName(user?.lastName ?? '')
    }, [user])

    async function onSubmit(event: FormEvent) {
        console.debug('submit')
        event.preventDefault()
        try {
            await updateProfile(firstName, lastName)
            handleClose()
        } catch (error) {
            window.alert(error)
        }
    }

    function handleChangePasswordInternal(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        handleChangePassword()
    }

    return (
        <Modal
            className="modal modal-profile-settings"
            overlayClassName="modal-overlay"
            onRequestClose={handleClose}
            shouldCloseOnOverlayClick={false}
            isOpen={isOpen}>
            <h1 className='header4 w3-margin-bottom'>Profile <span className="text-positive">Settings</span></h1>
            <p className="body w3-padding-16">Change your information</p>
            <form className='form' >
                <label className='label' htmlFor="email">Email</label>
                <input className='input' type="text" id="email" value={user?.email} disabled={true} />

                <div className="w3-row w3-padding-16">
                    <div className="input-half w3-col w3-half">
                        <label className='label' htmlFor="firstName">First Name</label>
                        <input className='input' type="text" id='firstName' value={firstName}
                            onChange={e => setFirstName(e.currentTarget.value)} />
                    </div>

                    <div className="input-half w3-col w3-half">
                        <label className='label' htmlFor="lastName">Last Name</label>
                        <input className='input' type="text" id='lastName' value={lastName}
                            onChange={e => setLastName(e.currentTarget.value)} />
                    </div>
                </div>

                <button className="btn btn-alt w3-margin-top" style={{ backgroundColor: '#233D4D', color: '#fff' }}
                    onClick={handleChangePasswordInternal}>Change password</button>
                <button className="btn btn-positive" onClick={onChangeProfileImage}>Change profile picture</button>
            </form>

            <div className="modal-footer w3-margin-top">
                <button className="btn btn-positive" onClick={onSubmit}>SUBMIT</button>
                <button onClick={handleClose} className="btn btn-title-only">Cancel</button>
            </div>
        </Modal>
    )
}

export default ProfileSettingsModal