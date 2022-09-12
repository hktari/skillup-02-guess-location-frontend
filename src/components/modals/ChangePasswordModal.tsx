import Modal from 'react-modal'
import React, { useRef, useState } from 'react'
import { ModalProps } from '../ComponentInterface'
import { useAuth } from '../context/AuthProvider'

interface ChangePasswordModalProps extends ModalProps {

}
const ChangePasswordModal = ({ isOpen, handleClose }: ChangePasswordModalProps) => {
    const { user, changePassword } = useAuth()

    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

    const confirmPasswordEl = useRef<HTMLInputElement>(null)

    async function performChangePassword() {
        try {
            console.log('performing password change')
            if (newPassword === newPasswordConfirm) {
                await changePassword(newPassword)
                handleClose()
            } else {
                console.log('passwords dont match', confirmPasswordEl.current)
                confirmPasswordEl.current?.setCustomValidity('passwords dont match')
                confirmPasswordEl.current?.reportValidity()

            }
        } catch (error) {
            window.alert(error)
        }
    }

    function clearValidityMessages() {
        confirmPasswordEl.current?.setCustomValidity('')
        confirmPasswordEl.current?.reportValidity()
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
                <label htmlFor="newPassword">New Password</label>
                <input type="password" id="newPassword"
                    value={newPassword} onChange={e => {
                        setNewPassword(e.currentTarget.value)
                        clearValidityMessages()
                    }} />

                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input type="password" id="confirmNewPassword"
                    ref={confirmPasswordEl} value={newPasswordConfirm}
                    onChange={e => {
                        setNewPasswordConfirm(e.currentTarget.value)
                        clearValidityMessages()
                    }} />
            </form>

            <button onClick={performChangePassword} className="btn btn-positive">SUBMIT</button>
            <button onClick={handleClose} className="btn btn-outline">Cancel</button>
        </Modal>
    )
}

export default ChangePasswordModal