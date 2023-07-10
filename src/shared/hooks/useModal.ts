import { useRef } from "react"

export function useModal() {
  const ref = useRef<HTMLDialogElement>(null)

  const handleOpen = () => {
    const dialog = ref.current
    if (dialog === null) return

    dialog.showModal()
  }

  const handleClose = () => {
    const dialog = ref.current
    if (dialog === null) return

    dialog.close()
  }

  return {
    ref,
    handleClose,
    handleOpen
  }
}
