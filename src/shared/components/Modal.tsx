import React, { createElement } from "react"
import { IconX } from "@tabler/icons-react"
import { twMerge } from "tailwind-merge"

interface Props {
  title?: string
  asForm?: boolean
  hidden?: boolean
  className?: string
  children: React.ReactNode
  onClose?(): void
  onSubmit?(e: SubmitEvent): void
}

export const Modal = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDialogElement>) => {
    const { asForm = false, onSubmit } = props
    if (props.hidden) return null
    return (
      <dialog
        ref={ref}
        className={twMerge(
          "rounded-xl backdrop:bg-black/20 backdrop:backdrop-blur p-0 w-72 scroll__app shadow-lg",
          props.className
        )}
      >
        {createElement(
          asForm ? "form" : "div",
          { onSubmit },
          <>
            <ModalHeader {...props} />
            {props.children}
          </>
        )}
      </dialog>
    )
  }
)

const ModalHeader = (props: Pick<Props, "title" | "onClose">) => {
  if (!Boolean(props.title)) return null
  return (
    <header className="flex items-center gap-3 justify-between p-3.5 sticky top-0 bg-white border-b border-gray-300">
      <h3 className="text-2xl font-bold leading-none">{props.title}</h3>
      <button onClick={props.onClose}>
        <IconX />
      </button>
    </header>
  )
}

export const ModalFooter = (props: Pick<Props, "children" | "className">) => {
  return (
    <footer
      className={twMerge(
        "sticky bottom-0 p-3.5 border-t border-gray-300",
        props.className
      )}
    >
      {props.children}
    </footer>
  )
}

export const ModalBody = (props: Pick<Props, "children" | "className">) => {
  return (
    <section className={twMerge("p-3.5", props.className)}>
      {props.children}
    </section>
  )
}
