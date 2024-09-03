import React from 'react'
import Modal from 'react-modal'
import { LocationImage } from '../../services/interface'
import { ModalProps } from '../ComponentInterface'
import Dialog from '../Common/Dialog'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'

interface DeleteLocationModalProps extends ModalProps {
  onChoicePicked: (areYouSure: boolean) => void
}

const DeleteLocationModal = ({
  isOpen,
  onChoicePicked,
  handleClose,
}: DeleteLocationModalProps) => {
  function onChoicePickedInternal(
    ev: React.MouseEvent<HTMLButtonElement>,
    areYouSure: boolean,
  ) {
    ev.stopPropagation()
    onChoicePicked(areYouSure)
  }

  return (
    <Dialog
      Header={<h1 className="">Please confirm</h1>}
      Footer={
        <>
          <PrimaryButton onClick={(ev) => onChoicePickedInternal(ev, true)}>
            Accept
          </PrimaryButton>
          <SecondaryButton onClick={(ev) => onChoicePickedInternal(ev, false)}>
            Cancel
          </SecondaryButton>
        </>
      }
      Body={
        <p className="">
          This location will be deleted. There is no undo of this action.
        </p>
      }
      handleClose={handleClose}
      isOpen={isOpen}
    ></Dialog>
  )
}

export default DeleteLocationModal
