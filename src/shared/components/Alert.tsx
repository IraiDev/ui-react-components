import React from "react"
import { twJoin, twMerge } from "tailwind-merge"

interface Props {
  title?: string
  children: React.ReactNode
  className?: string
  onClose?(): void
  handleConfirm?(): void
}

export const Alert = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDialogElement>) => {
    const { title = "" } = props
    return (
      <dialog
        ref={ref}
        className={twJoin(
          "p-0 min-w-[290px] max-w-md divide-y divide-gray-300 rounded-xl shadow-lg overflow-hidden -top-[82%]",
          "backdrop:bg-black/20 backdrop:backdrop-blur"
        )}
      >
        <header hidden={title === ""} className="p-2">
          <h3 className="font-semibold">{title}</h3>
        </header>
        <section
          className={twMerge(
            "px-3 py-2 text-gray-600 text-sm leading-5 hyphens-auto break-words",
            props.className
          )}
        >
          {props.children}
        </section>
        <footer className="flex justify-center divide-x divide-gray-300">
          <button
            onClick={props.onClose}
            className="w-full text-center hover:bg-red-500 py-1.5 font-semibold hover:text-white transition-colors duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={props.handleConfirm}
            className="w-full text-center hover:bg-blue-500 py-1.5 font-semibold hover:text-white transition-colors duration-300"
          >
            Confirmar
          </button>
        </footer>
      </dialog>
    )
  }
)
