import Modal from 'react-modal'
import React, { useRef } from 'react'
import PickImageComponent from '../Common/PickImageComponent'
import { ModalProps } from '../ComponentInterface'
import { useAuth } from '../context/AuthProvider'

interface ChangeProfileImageModalProps extends ModalProps {

}

const ChangeProfileImageModal = ({ onFinished, isOpen, handleClose }: ChangeProfileImageModalProps) => {
    const { updateProfileImage } = useAuth()
    const selectedImageBase64 = useRef<string>('')

    async function performUpdate() {
        try {
            await updateProfileImage(selectedImageBase64.current)
            onFinished && onFinished({ message: 'Profile image saved' })
        } catch (error: any) {
            onFinished && onFinished({ errors: [error.toString()] })
        }
    }

    return (
        <Modal
            className="modal modal-change-profile-image"
            overlayClassName="modal-overlay"
            onRequestClose={handleClose}
            isOpen={isOpen}>
            <h1 className="header4">Profile <span className="text-positive">settings.</span></h1>
            <p className="body">Change your profile photo</p>
            <PickImageComponent onImagePicked={img => {
                selectedImageBase64.current = img
            }
            } />
            <button className="btn btn-positive btn-block">UPLOAD NEW IMAGE</button>

            <button onClick={performUpdate} className="btn btn-positive w3-left">SUBMIT</button>
            <button onClick={handleClose} className="btn btn-outline w3-right">Cancel</button>

        </Modal>
    )
}

export default ChangeProfileImageModal