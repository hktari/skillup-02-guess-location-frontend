import React, { useState } from 'react'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import ReactModal from 'react-modal'

type Props = {
  isOpen: boolean
  handleClose: VoidFunction
  Footer?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const Dialog = ({ Footer, isOpen, handleClose, children }: Props) => {
  return (
    <ReactModal
      className="modal modal-delete-location"
      overlayClassName="modal-overlay"
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
    >
      {children}

      <div className="modal-footer">{Footer}</div>
    </ReactModal>
  )
}

export default Dialog
