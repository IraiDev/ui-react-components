import { useLayoutEffect, useRef } from "react"

export function useDialog(initialOpen?: boolean) {
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

  useLayoutEffect(() => {
    if (!initialOpen || ref.current === null) return
    ref.current.showModal()

    return () => {
      ref.current?.close()
    }
  }, [ref, initialOpen])

  return [ref, handleOpen, handleClose] as const
}
