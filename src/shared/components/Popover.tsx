import { useFloating } from "../hooks"

interface Props {
  RenderButton: (handleOpen: () => void) => React.ReactNode
}

export const Popover = (props: Props) => {
  const { wrapperRef, containerRef, isOpen, position, handleToggle } =
    useFloating({
      anchor: "bottom-left",
      defaultOpen: true
    })
  return (
    <div ref={wrapperRef} className="inline-flex h-max">
      {props.RenderButton(handleToggle)}
      {isOpen && (
        <span className="fixed bg-white" style={position} ref={containerRef}>
          este es el popover
        </span>
      )}
    </div>
  )
}
