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
      Footer={
        <div className="flex gap-2">
          <PrimaryButton onClick={(ev) => onChoicePickedInternal(ev, true)}>
            Accept
          </PrimaryButton>
          <SecondaryButton onClick={(ev) => onChoicePickedInternal(ev, false)}>
            Cancel
          </SecondaryButton>
        </div>
      }
      handleClose={handleClose}
      isOpen={isOpen}
    >
      <h1 className="text-3xl">Are you sure ?</h1>
      <p className="mt-2 text-lg">
        This location will be deleted. There is no undo of this action.
      </p>
    </Dialog>
  )
}

export default DeleteLocationModal
