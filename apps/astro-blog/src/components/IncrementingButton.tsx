import React from "react"
import { motion, AnimatePresence } from "motion/react"

type RgbColor = `rgb(${number}, ${number}, ${number})`

interface IncrementingButtonProps {
  children: React.ReactNode
  clickCount: number | undefined
  highlightColor?: RgbColor
  href: string
  onClick: () => void
  className?: string
}

export const IncrementingButton = ({
  children,
  clickCount,
  highlightColor,
  href,
  onClick,
  className,
}: IncrementingButtonProps) => (
  <div className={`flex flex-col items-center ${className}`}>
    <motion.a
      href={href}
      target="_blank"
      className="flex flex-row gap-1 bg-transparent font-semibold m-[2px] p-1 border-2 border-gray-200 hover:underline hover:cursor-pointer rounded-[3px]"
      onClick={onClick}
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
    </motion.a>
    <div className="flex items-center">
      <AnimatePresence>
        {typeof clickCount === "number" ? (
          <>
            <div className="relative inline-block pl-1 pr-1">
              <motion.span
                key={clickCount}
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
