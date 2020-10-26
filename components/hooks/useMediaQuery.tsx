import { useState, useCallback, useEffect } from "react"

/*
  input desired max-width and this will return a boolean indicating if
  the current page width is higher or lower
*/
export const useMediaQuery = (width: number): boolean => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`)
    media.addEventListener("change", updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true)
    }

    return () => media.removeEventListener("change", updateTarget)
  }, [updateTarget, width])

  return targetReached
}
