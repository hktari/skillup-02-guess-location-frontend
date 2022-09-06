import React, { FormEvent } from 'react'
import Modal from 'react-modal'

interface ModalProps {
    isOpen: boolean,
    handleClose: VoidFunction
}

interface ProfileSettingsModalProps extends ModalProps {
    handleChangePassword: VoidFunction
}

const ProfileSettingsModal = ({ isOpen, handleClose, handleChangePassword }: ProfileSettingsModalProps) => {
    function onSubmit(event: FormEvent) {
        event.preventDefault()
        handleClose()
    }

    function handleChangePasswordInternal(e : React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        handleChangePassword()
    }

    return (
        <Modal
            className="modal modal-profile-settings"
            overlayClassName="modal-overlay"
            onRequestClose={handleClose}
            contentLabel="Tiny nomadic modal popover"
            isOpen={isOpen}>
            <h1>Profile <em>Settings.</em></h1>
            <small>Change your information</small>
            <form className='form' onSubmit={onSubmit}>
                <input type="text" id="email" />
                <label htmlFor="email">Email</label>

                <input type="text" id='firstName' />
                <label htmlFor="firstName">First Name</label>

                <input type="text" id='lastName' />
                <label htmlFor="lastName">Last Name</label>

                <button onClick={handleChangePasswordInternal} className="btn btn-alt">Change password</button>
                <button className="btn btn-positive">Change Profile Picture</button>
            </form>

            <div className="modal-footer">
                <input type='submit' className="btn btn-positive" value='Submit'/>
                <button onClick={handleClose} className="btn btn-outline">Cancel</button>
            </div>
        </Modal>
    )
}

export default ProfileSettingsModal