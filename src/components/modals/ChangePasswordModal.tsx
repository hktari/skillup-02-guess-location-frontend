import Modal from 'react-modal'
import React from 'react'
import { ModalProps } from '../ComponentInterface'

interface ChangePasswordModalProps extends ModalProps {

}
const ChangePasswordModal = ({ isOpen, handleClose }: ChangePasswordModalProps) => {
    function handleSubmit() {
        handleClose()
    }

    return (
        <Modal
            className="modal modal-change-password"
            overlayClassName="modal-no-overlay"
            onRequestClose={handleClose}
            contentLabel="Tiny nomadic modal popover"
            isOpen={isOpen}>
            <h1>Profile <em>settings</em></h1>
            <small>Change your password</small>
            <form>
                <input type="password" id="password" />
                <label htmlFor="password">Current Password</label>

                <input type="password" id="newPassword" />
                <label htmlFor="newPassword">New Password</label>

                <input type="password" id="confirmNewPassword" />
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
            </form>

            <button onClick={handleSubmit} className="btn btn-positive">SUBMIT</button>
            <button onClick={handleClose} className="btn btn-outline">Cancel</button>
        </Modal>
    )
}

export default ChangePasswordModal