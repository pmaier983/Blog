import type { ButtonName } from "@repo/backend-core"
import { useState } from "react"
import { trpcClient } from "~/client"

interface IncrementingButtonProps {
  name: ButtonName
  children: React.ReactNode
  clickCount: number
  className: string
}

export const IncrementingButton = ({
  name,
  children,
  clickCount,
  className,
}: IncrementingButtonProps) => {
  const [timesClicked, setTimesClicked] = useState(clickCount)

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        className="flex flex-row gap-1 bg-transparent hover:text-gray-800 text-gray-500 font-semibold py-2 px-4 border-2 border-grey-500 hover:border-grey-700 rounded"
        onClick={async () => {
          // "Optimistically" Update the client as well!
          setTimesClicked(timesClicked + 1)
          trpcClient.incrementButton
            .mutate({
              name,
              userAgent: navigator.userAgent,
              language: navigator.language,
              screenResolution: `${window.screen.width}x${window.screen.height}`,
            })
            .catch(() => {
              // If the request fails, revert the client-side update
              setTimesClicked(timesClicked)
            })
        }}
      >
        {children}
      </button>
      Clicked {timesClicked} times
    </div>
  )
}
