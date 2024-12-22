import React from "react"
import { motion, AnimatePresence } from "motion/react"

type RgbColor = `rgb(${number}, ${number}, ${number})`

interface IncrementingButtonProps {
  children: React.ReactNode
  clickCount: number | undefined
  highlightColor?: RgbColor
  onClick: () => void
  className?: string
}

export const IncrementingButton = ({
  children,
  clickCount,
  highlightColor,
  onClick,
  className,
}: IncrementingButtonProps) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.button
        className="flex flex-row gap-1 bg-transparent hover:text-gray-800 text-gray-500 font-semibold py-2 px-4 border-2 border-grey-500 hover:border-grey-700 rounded"
        onClick={onClick}
        // Apply animation when clickCount changes from null to a number
        animate={{
          backgroundColor:
            clickCount !== null ? highlightColor : "rgba(255, 255, 255, 0)",
          color: calculateIdealTextColor(highlightColor),
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        initial={false}
      >
        {children}
      </motion.button>
      <div className="flex items-center">
        <AnimatePresence>
          {typeof clickCount === "number" ? (
            <>
              <div className="relative inline-block pl-1 pr-1">
                <motion.span
                  key={clickCount} // Triggers re-render on count change
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block text-center"
                >
                  {clickCount}
                </motion.span>
              </div>
              <span> clicks</span>
            </>
          ) : (
            <span className="invisible"> clicks</span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

interface GetHighlightColorProps {
  clickCount: number
  minCount: number
  maxCount: number
}

export const getHighlightColor = ({
  clickCount,
  minCount,
  maxCount,
}: GetHighlightColorProps): `rgb(${number}, ${number}, ${number})` => {
  // Ensure clickCount is within the range
  const clampedClickCount = Math.max(minCount, Math.min(maxCount, clickCount))

  // Calculate the scaling factor (0 to 1)
  const scale = (clampedClickCount - minCount) / (maxCount - minCount)

  // Define light and dark green RGB values
  const lightGreen = { r: 144, g: 238, b: 144 } // Light green (e.g., #9be9a8)
  const darkGreen = { r: 0, g: 100, b: 0 } // Dark green (e.g., #216e39)

  // Interpolate between light and dark green
  const r = Math.round(lightGreen.r + (darkGreen.r - lightGreen.r) * scale)
  const g = Math.round(lightGreen.g + (darkGreen.g - lightGreen.g) * scale)
  const b = Math.round(lightGreen.b + (darkGreen.b - lightGreen.b) * scale)

  // Return the color in hexadecimal format
  return `rgb(${r}, ${g}, ${b})`
}

const calculateIdealTextColor = (rgbString?: RgbColor): "black" | "white" => {
  if (!rgbString) {
    return "black"
  }

  const rgbValues = rgbString.match(/\d+/g)?.map(Number)

  if (!rgbValues || rgbValues.length !== 3) {
    throw new Error("Invalid RGB color string")
  }

  // Calc brightness based off w3 guidelines https://www.w3.org/TR/AERT/#color-contrast
  const brightness = Math.round(
    (rgbValues[0]! * 299 + rgbValues[1]! * 587 + rgbValues[2]! * 114) / 1000,
  )

  return brightness > 125 ? "black" : "white"
}
