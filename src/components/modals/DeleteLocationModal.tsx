import React from 'react'
import Modal from 'react-modal'
import { LocationImage } from '../../services/interface'
import { ModalProps } from '../ComponentInterface'

interface DeleteLocationModalProps extends ModalProps {
    onChoicePicked: (areYouSure: boolean) => void,
}

const DeleteLocationModal = ({ isOpen, onChoicePicked, handleClose }: DeleteLocationModalProps) => {

    function onChoicePickedInternal(ev: React.MouseEvent<HTMLButtonElement>, areYouSure: boolean) {
        ev.stopPropagation()
        onChoicePicked(areYouSure)
    }

    return (
        <Modal
            className="modal modal-delete-location"
            overlayClassName="modal-overlay"
            onRequestClose={handleClose}
            shouldCloseOnOverlayClick={false}
            isOpen={isOpen}>
            <h1 className='header4'>Are you sure ?</h1>
            <p className="body">This location will be deleted. There is no undo of this action.</p>
            <div className="w3-padding"></div>
            <div className="modal-footer">
                <button
                    onClick={(ev) => onChoicePickedInternal(ev, true)}
                    className="btn btn-positive">SUBMIT</button>
                <button
                    onClick={(ev) => onChoicePickedInternal(ev, false)}
                    className="btn btn-title-only">Cancel</button>
            </div>
        </Modal>)
}

export default DeleteLocationModal