import { useState } from "react"
import { trpcReact } from "~/client"

interface IncrementingButtonProps {
  name: string
  clickCount: number
}

export const IncrementingButton = ({
  name,
  clickCount,
}: IncrementingButtonProps) => {
  const [timesClicked, setTimesClicked] = useState(clickCount)

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-transparent hover:text-gray-800 text-gray-500 font-semibold py-2 px-4 border-2 border-grey-500 hover:border-grey-700 rounded"
        onClick={async () => {
          // "Optimistically" Update the client as well!
          setTimesClicked(timesClicked + 1)
          trpcReact.incrementButton
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
        Click me to increment a counter!
      </button>
      Clicked {timesClicked} times
    </div>
  )
}
