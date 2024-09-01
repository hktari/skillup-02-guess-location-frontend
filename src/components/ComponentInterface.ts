interface ModalResult {
  message?: string
  errors?: string[]
}

interface ModalProps {
  isOpen: boolean
  onFinished?: (result: ModalResult) => void
  handleClose: VoidFunction
}

export type { ModalResult, ModalProps }
