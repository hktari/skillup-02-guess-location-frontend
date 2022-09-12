import React, { FormEvent, useState } from 'react'
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
    const [firstName, setFirstName] = useState<string>(user?.firstName ?? '')
    const [lastName, setLastName] = useState<string>(user?.lastName ?? '')

    async function onSubmit(event: FormEvent) {
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
            contentLabel="Tiny nomadic modal popover"
            isOpen={isOpen}>
            <h1>Profile <em>Settings.</em></h1>
            <small>Change your information</small>
            <form className='form' onSubmit={onSubmit}>
                <input type="text" id="email" value={user?.email} disabled={true} />
                <label htmlFor="email">Email</label>

                <input type="text" id='firstName' value={firstName}
                    onChange={e => setFirstName(e.currentTarget.value)} />
                <label htmlFor="firstName">First Name</label>

                <input type="text" id='lastName' value={lastName}
                    onChange={e => setLastName(e.currentTarget.value)} />
                <label htmlFor="lastName">Last Name</label>

                <button onClick={handleChangePasswordInternal} className="btn btn-alt">Change password</button>
                <button onClick={onChangeProfileImage} className="btn btn-positive">Change Profile Picture</button>
            </form>

            <div className="modal-footer">
                <input type='submit' className="btn btn-positive" value='Submit' />
                <button onClick={handleClose} className="btn btn-outline">Cancel</button>
            </div>
        </Modal>
    )
}

export default ProfileSettingsModal