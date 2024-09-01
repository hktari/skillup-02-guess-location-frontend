import React, { FormEvent, useEffect, useState } from 'react'
import Dialog from '../Common/Dialog'
import { useAuth } from '../context/AuthProvider'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from '../Common/FormInput'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'

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

  async function onSubmit({
    email,
    firstName,
    lastName,
  }: {
    email: string
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

  const { email = '', firstName = '', lastName = '' } = user || {}
  const methods = useForm({
    defaultValues: { email, firstName, lastName },
  })
  return (
    <Dialog
      title="Profile Settings"
      description="Change your information"
      handleClose={handleClose}
      open={isOpen}
    >
      <FormProvider {...methods}>
        <form
          className="space-y-8 text-start"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <FormInput type="email" disabled name="Email" title="Email" />

            <FormInput
              name="firstName"
              title="First Name"
              required
              type="text"
            />
            <FormInput name="lastName" title="Last Name" required type="text" />
          </div>

          <div className="space-y-2">
            <PrimaryButton
              type="button"
              block
              style={{ backgroundColor: '#233D4D', color: '#fff' }}
              onClick={handleChangePasswordInternal}
            >
              Change password
            </PrimaryButton>
            <PrimaryButton block type="button" onClick={onChangeProfileImage}>
              Change profile picture
            </PrimaryButton>
          </div>
          <div className="space-between flex">
            <div className="flex-grow">
              <PrimaryButton type="submit">SUBMIT</PrimaryButton>
            </div>
            <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
          </div>
        </form>
      </FormProvider>
    </Dialog>
  )
}

export default ProfileSettingsModal
