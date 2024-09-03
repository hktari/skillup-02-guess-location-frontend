import React, { useState } from 'react'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import ReactModal from 'react-modal'

type Props = {
  isOpen: boolean
  handleClose: VoidFunction
  Header?: React.ReactNode
  Body?: React.ReactNode
  Footer?: React.ReactNode
}

const Dialog = ({ Header, Footer, isOpen, handleClose, Body }: Props) => {
  return (
    <ReactModal
      className="modal space-y-4"
      overlayClassName="modal-overlay"
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
    >
      <div className="modal-header text-center text-3xl md:text-start">
        {Header}
      </div>
      <div className="modal-body">{Body}</div>

      <div className="modal-footer flex w-full justify-between gap-2 md:justify-start">
        {Footer}
      </div>
    </ReactModal>
  )
}

export default Dialog
