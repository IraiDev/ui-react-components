import { twJoin, twMerge } from "tailwind-merge"
import { useFloating } from "../hooks"

interface Props {
  content: string
  children: React.ReactNode
  anchor?: Anchor
}

export const Tooltip = (props: Props) => {
  const { anchor = "bottom-left" } = props

  const { hovering, wrapperRef, containerRef, position, arrowSizes, arrow } =
    useFloating({
      anchor
    })

  return (
    <div ref={wrapperRef} className="inline-flex h-max group">
      {props.children}
      <span
        ref={containerRef}
        style={position}
        className={twMerge([
          "px-3 py-2 rounded-2xl text-xs font-semibold w-max max-w-[240px] hyphens-auto border shadow-lg",
          "bg-white text-black border-neutral-400",
          "z-50 fixed",
          "invisible opacity-0",
          "transition-all duration-300",
          hovering && "visible opacity-100 delay-500"
        ])}
      >
        <span
          style={arrowSizes}
          className={twJoin([
            "block border",
            "bg-white border-neutral-400",
            "rotate-45 absolute z-50",
            arrow
          ])}
        />
        {props.content}
      </span>
    </div>
  )
}
