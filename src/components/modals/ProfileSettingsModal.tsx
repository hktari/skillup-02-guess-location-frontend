import React, { FormEvent, useEffect, useState } from 'react'
import Dialog from '../Common/Dialog'
import { useAuth } from '../context/AuthProvider'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from '../Common/FormInput'

interface ModalProps {
  isOpen: boolean
  handleClose: VoidFunction
}

export interface ProfileSettingsModalProps extends ModalProps {
  handleChangePassword: VoidFunction
  onChangeProfileImage: VoidFunction
}

const ProfileSettingsModal = ({
  isOpen,
  handleClose,
  handleChangePassword,
  onChangeProfileImage,
}: ProfileSettingsModalProps) => {
  const { user, updateProfile } = useAuth()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')

  useEffect(() => {
    setFirstName(user?.firstName ?? '')
    setLastName(user?.lastName ?? '')
  }, [user])

  async function onSubmit({
    firstName,
    lastName,
  }: {
    firstName: string
    lastName: string
  }) {
    try {
      await updateProfile(firstName, lastName)
      handleClose()
    } catch (error) {
      window.alert(error)
    }
  }

  function handleChangePasswordInternal(
    e: React.MouseEvent<HTMLButtonElement>,
  ) {
    e.preventDefault()
    handleChangePassword()
  }
  const methods = useForm({
    defaultValues: { email: user?.email, firstName, lastName },
  })
  return (
    <Dialog title="Profile Settings" handleClose={handleClose} open={isOpen}>
      <p className="body w3-padding-16">Change your information</p>
      <FormProvider {...methods}>
        <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput type="email" disabled name="Email" title="Email" />

          <div className="w3-row w3-padding-16">
            <FormInput
              name="firstName"
              title="First Name"
              required
              type="text"
            />
            <FormInput name="lastName" title="Last Name" required type="text" />
          </div>

          <button
            type="button"
            className="btn btn-alt w3-margin-top"
            style={{ backgroundColor: '#233D4D', color: '#fff' }}
            onClick={handleChangePasswordInternal}
          >
            Change password
          </button>
          <button
            type="button"
            className="btn btn-positive"
            onClick={onChangeProfileImage}
          >
            Change profile picture
          </button>
          <div className="modal-footer w3-margin-top">
            <button type="submit" className="btn btn-positive">
              SUBMIT
            </button>
            <button onClick={handleClose} className="btn btn-title-only">
              Cancel
            </button>
          </div>
        </form>
      </FormProvider>
    </Dialog>
  )
}

export default ProfileSettingsModal
