import Modal from 'react-modal'

import React from 'react'
import { ModalProps } from '../ComponentInterface'

export interface InfoModalProps extends ModalProps {
    title: string,
    message?: string
}

const InfoModal = ({ isOpen, handleClose, title, message }: InfoModalProps) => {
    function noMessage() {
        return !message
    }
    return (
        <Modal isOpen={isOpen}
            className="modal modal-info"
            overlayClassName="modal-overlay"
            onRequestClose={handleClose}
            shouldCloseOnOverlayClick={false}>
            <div className={`${noMessage() ? 'text-center' : ''}`}>
                <h1 className="header5">{title}</h1>
                <p className="body info-message" hidden={noMessage()}>{message}</p>
                <button
                    onClick={handleClose}
                    className={`btn btn-positive ${noMessage() ? '' : 'btn-wide'}`}>CLOSE</button>
            </div>
        </Modal>
    )
}

export default InfoModal