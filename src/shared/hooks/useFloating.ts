import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { useWindowSize, useHover } from "@uidotdev/usehooks"

interface Props {
  anchor?: Anchor
  defaultOpen?: boolean
  controlled?: boolean
}

export function useFloating({
  anchor = "bottom-left",
  defaultOpen = false
}: Props) {
  const windowSize = useWindowSize()
  const [wrapperRef, hovering] = useHover()
  const containerRef = useRef<HTMLSpanElement | HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)
  const [{ x, y, currentAnchor }, setAnchor] = useState<AnchorState>({
    x: 0,
    y: 0,
    currentAnchor: anchor
  })

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const container = containerRef.current
    if (wrapper === null || container === null) return

    const { left, top, bottom, right, height } = wrapper.getBoundingClientRect() // wrapper rect
    const { width: containerWidth, height: containerHeigth } =
      container.getBoundingClientRect() // container rect

    const totalHeight = containerHeigth + arrowSizes * 2
    const totalWidth = containerWidth + arrowSizes * 2
    const windowHeight = windowSize.height
    const windowWidth = windowSize.width

    const position: Record<Anchor, AnchorState> = {
      "bottom-left": {
        x: left,
        y: bottom + height * arrowFactor,
        currentAnchor: "bottom-left"
      },
      "top-left": {
        x: left,
        y: top - height * arrowFactor - containerHeigth,
        currentAnchor: "top-left"
      },
      "bottom-right": {
        x: right - containerWidth,
        y: bottom + height * arrowFactor,
        currentAnchor: "bottom-right"
      },
      "top-right": {
        x: right - containerWidth,
        y: top - height * arrowFactor - containerHeigth,
        currentAnchor: "top-right"
      }
    }

    if (anchor === "top-left") {
      setAnchor(() => {
        if (left > totalWidth) {
          if (top > totalHeight) {
            return position["top-right"]
          }
          return position["bottom-right"]
        }

        if (totalHeight > top) {
          return position["bottom-left"]
        }

        return position["top-left"]
      })
      return
    }

    if (anchor === "top-right") {
      setAnchor(() => {
        if (windowWidth - right > totalWidth) {
          if (top > totalHeight) {
            return position["top-left"]
          }
          return position["bottom-left"]
        }

        if (totalHeight > top) {
          return position["bottom-right"]
        }

        return position["top-right"]
      })
      return
    }

    if (anchor === "bottom-right") {
      setAnchor(() => {
        if (windowWidth - right > totalWidth) {
          if (windowHeight - bottom > totalHeight) {
            return position["bottom-left"]
          }
          return position["top-left"]
        }

        if (totalHeight <= windowHeight - bottom) {
          return position["bottom-right"]
        }

        return position["top-right"]
      })
      return
    }

    if (anchor === "bottom-left") {
      setAnchor(() => {
        if (left > totalWidth) {
          if (windowHeight - bottom > totalHeight) {
            return position["bottom-right"]
          }
          return position["top-right"]
        }

        if (totalHeight <= windowHeight - bottom) {
          return position["bottom-left"]
        }

        return position["top-left"]
      })
      return
    }

    setAnchor(position[anchor])
  }, [wrapperRef, containerRef, windowSize, isOpen, anchor])

  return {
    hovering,
    isOpen,
    arrow: arrowPosition[currentAnchor],
    position: { left: x, top: y },
    arrowSizes: { width: arrowSizes, height: arrowSizes },
    arrowFactor,
    wrapperRef,
    containerRef,
    handleOpen,
    handleClose,
    handleToggle
  }
}

interface AnchorState {
  x: number
  y: number
  currentAnchor: Anchor
}

const arrowPosition: Record<Anchor, string> = {
  //   bottom: "-top-1.5 left-1/2 -translate-x-1/2 border-b-0 border-r-0",
  //   top: "-bottom-1.5 left-1/2 -translate-x-1/2 border-t-0 border-l-0",
  //   left: "top-1/2 -right-1.5 -translate-y-1/2 border-b-0 border-l-0",
  //   right: "top-1/2 -left-1.5 -translate-y-1/2 border-t-0 border-r-0",
  "bottom-left": "-top-1.5 left-5 border-b-0 border-r-0",
  "top-left": "-bottom-1.5 left-5 border-t-0 border-l-0",
  "bottom-right": "-top-1.5 right-5 border-b-0 border-r-0",
  "top-right": "-bottom-1.5 right-5 border-t-0 border-l-0"
}

const arrowFactor = 0.3,
  arrowSizes = 10
