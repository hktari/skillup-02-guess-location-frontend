import React, { useState } from 'react'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'

type Props = {
  open: boolean
  handleClose: VoidFunction
  title: string
  description?: string
  acceptText?: string
  cancelText?: string
} & React.HTMLAttributes<HTMLDivElement>

const Dialog = ({
  open,
  handleClose,
  title,
  description,
  acceptText = 'Accept',
  cancelText = 'Cancel',
  children,
}: Props) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" hidden={!open}>
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle"></span>
        <div className="inline-block transform overflow-hidden rounded-md bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-2xl font-medium text-gray-900">{title}</h3>
              {description && (
                <div className="mt-2">
                  <p className="text-sm leading-5 text-gray-500">
                    {description}
                  </p>
                </div>
              )}
              <div className="px-4 py-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog
