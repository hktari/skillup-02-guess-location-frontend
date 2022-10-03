import Modal from 'react-modal'
import React, { useRef } from 'react'
import PickImageComponent from '../Common/PickImageComponent'
import { ModalProps } from '../ComponentInterface'
import { useAuth } from '../context/AuthProvider'

interface ChangeProfileImageModalProps extends ModalProps {

}

const ChangeProfileImageModal = ({ onFinished, isOpen, handleClose }: ChangeProfileImageModalProps) => {
    const { user, updateProfileImage } = useAuth()
    const selectedImageBase64 = useRef<string>('')

    async function performUpdate() {
        try {
            console.log('performing profile image update...')
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
            shouldCloseOnOverlayClick={false}
            isOpen={isOpen}>
            <h1 className="header4">Profile <span className="text-positive">settings.</span></h1>
            <p className="body w3-padding-24 ">Change your profile photo</p>
            <PickImageComponent
                image={user?.imageUrl ?? ''}
                onImagePicked={img => {
                    selectedImageBase64.current = img
                }
                } />

            <div className="w3-margin-top"><br /></div>
            <div className="modal-footer w3-margin-top">
                <button onClick={performUpdate} className="btn btn-positive w3-left">SUBMIT</button>
                <button onClick={handleClose} className="btn btn-title-only w3-right">Cancel</button>
            </div>
        </Modal>
    )
}

export default ChangeProfileImageModal