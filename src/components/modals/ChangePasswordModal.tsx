import Modal from 'react-modal'
import React, { useEffect, useRef, useState } from 'react'
import { ModalProps } from '../ComponentInterface'
import { useAuth } from '../context/AuthProvider'
import InfoModal from './InfoModal'

interface ChangePasswordModalProps extends ModalProps {}
const ChangePasswordModal = ({
  isOpen,
  onFinished,
  handleClose,
}: ChangePasswordModalProps) => {
  const { user, changePassword } = useAuth()

  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

  const confirmPasswordEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setNewPassword('')
    setNewPasswordConfirm('')
  }, [isOpen])

  async function performChangePassword() {
    try {
      if (newPassword === newPasswordConfirm) {
        await changePassword(newPassword)
        onFinished && onFinished({ message: 'Your settings are saved' })
      } else {
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
      overlayClassName="modal-overlay"
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
    >
      <h1 className="header4">
        Profile <span className="text-positive">settings</span>
      </h1>
      <p className="body w3-padding-16">Change your password</p>
      <form>
        <label className="label" htmlFor="newPassword">
          New Password
        </label>
        <input
          className="input"
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.currentTarget.value)
            clearValidityMessages()
          }}
        />

        <div className="w3-margin-top"></div>
        <label className="label" htmlFor="confirmNewPassword">
          Confirm New Password
        </label>
        <input
          className="input"
          type="password"
          id="confirmNewPassword"
          ref={confirmPasswordEl}
          value={newPasswordConfirm}
          onChange={(e) => {
            setNewPasswordConfirm(e.currentTarget.value)
            clearValidityMessages()
          }}
        />
      </form>

      <div className="w3-margin-top"></div>
      <div className="modal-footer w3-margin-top">
        <button className="btn btn-positive" onClick={performChangePassword}>
          SUBMIT
        </button>
        <button className="btn btn-title-only" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default ChangePasswordModal
