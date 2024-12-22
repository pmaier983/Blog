import type { ButtonName } from "@repo/backend-core"

import { trpcReactQuery } from "~/utils/client"
import {
  getHighlightColor,
  IncrementingButton,
} from "~/components/IncrementingButton"
import { withQueryProvider } from "~/utils/withQueryProvider"

const BUTTONS: { name: ButtonName; label: string }[] = [
  { name: "linkedin", label: "LinkedIn" },
  { name: "github", label: "GitHub" },
  { name: "twitter", label: "Twitter" },
]

const BUTTON_NAMES = BUTTONS.map(({ name }) => name)

const ButtonGridCore = () => {
  const utils = trpcReactQuery.useUtils()

  const getButtonQuery = trpcReactQuery.getButtons.useQuery({
    names: BUTTONS.map(({ name }) => name),
  })

  // If duplicated one more time, consider extracting to a custom hook
  const incrementButtonMutation = trpcReactQuery.incrementButton.useMutation({
    onMutate: async (variables) => {
      const { name } = variables

      const previousData = utils.getButtons.getData({ names: BUTTON_NAMES })

      utils.getButtons.setData({ names: BUTTON_NAMES }, (oldData) => {
        if (!oldData) return []
        return oldData.map((button) =>
          button.name === name
            ? { ...button, clickCount: (button.clickCount || 0) + 1 }
            : button,
        )
      })

      return { previousData }
    },
    onError: (error, _, context) => {
      console.error(error)

      // Roll back to the previous data
      if (context?.previousData) {
        utils.getButtons.setData({ names: BUTTON_NAMES }, context.previousData)
      }
    },
  })

  const maxClickCount =
    getButtonQuery.data?.reduce(
      (max, button) => Math.max(max, button.clickCount),
      0,
    ) ?? 0

  const minClickCount =
    getButtonQuery.data?.reduce(
      (min, button) => Math.min(min, button.clickCount),
      Infinity,
    ) ?? 0

  const buttonsWithCounts = BUTTONS.map(({ name, ...rest }) => {
    const possibleClickCount = getButtonQuery.data?.find(
      (possibleButton) => possibleButton.name === name,
    )?.clickCount

    const highlightColor =
      typeof possibleClickCount === "number"
        ? getHighlightColor({
            clickCount: possibleClickCount,
            minCount: minClickCount,
            maxCount: maxClickCount,
          })
        : "rgb(255, 255, 255)"

    return {
      name,
      clickCount: possibleClickCount,
      highlightColor: highlightColor,
      ...rest,
    }
  })

  // TODO:
  // - [ ] Add create button to the getButtons rpc

  const onButtonClick = (buttonName: ButtonName) => {
    incrementButtonMutation.mutate({
      name: buttonName,
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    })
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {buttonsWithCounts.map((button) => (
        <IncrementingButton
          key={button.name}
          highlightColor={button.highlightColor}
          clickCount={button?.clickCount}
          onClick={() => onButtonClick(button.name)}
        >
          {button.label}
        </IncrementingButton>
      ))}
    </div>
  )
}

export const ButtonGrid = withQueryProvider(ButtonGridCore)
