import React from "react"
import { IconX } from "@tabler/icons-react"
import { twMerge } from "tailwind-merge"

interface Props {
  children: React.ReactNode
  className?: string
  title?: string
  onClose?(): void
}

export const Modal = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDialogElement>) => {
    return (
      <dialog
        ref={ref}
        className={twMerge(
          "rounded-xl backdrop:bg-black/20 backdrop:backdrop-blur-sm p-0 w-96",
          props.className
        )}
      >
        <header className="flex items-center w-full justify-between p-3.5 sticky top-0 border-b bg-white">
          <h3 className="text-2xl font-bold leading-none">{props.title}</h3>
          <button onClick={props.onClose}>
            <IconX />
          </button>
        </header>
        <section className="p-3.5">{props.children}</section>
        <footer className="p-3.5 sticky bottom-0 border-t"></footer>
      </dialog>
    )
  }
)
