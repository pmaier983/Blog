import type React from "react"

import type { ButtonName } from "@repo/backend-core"

import { trpcReactQuery } from "~/utils/client"
import {
  getHighlightColor,
  IncrementingButton,
} from "~/components/IncrementingButton"
import { withQueryProvider } from "~/utils/withQueryProvider"
import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL } from "~/utils/consts"
import { ExternalLink } from "lucide-react"

const LINKS: { name: ButtonName; label: React.ReactNode; href: string }[] = [
  {
    name: "linkedin",
    label: (
      <div className="flex items-center gap-1">
        LinkedIn
        <ExternalLink size="0.85rem" />
      </div>
    ),
    href: LINKEDIN_URL,
  },
  {
    name: "github",
    label: (
      <div className="flex items-center gap-1">
        Github
        <ExternalLink size="0.85rem" />
      </div>
    ),
    href: GITHUB_URL,
  },
  {
    name: "twitter",
    label: (
      <div className="flex items-center gap-1">
        Twitter
        <ExternalLink size="0.85rem" />
      </div>
    ),
    href: TWITTER_URL,
  },
]

const BUTTON_NAMES = LINKS.map(({ name }) => name)

const ButtonGridCore = () => {
  const utils = trpcReactQuery.useUtils()

  const getButtonQuery = trpcReactQuery.getButtons.useQuery({
    names: LINKS.map(({ name }) => name),
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

  const linksWithCounts = LINKS.map(({ name, ...rest }) => {
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

  const onLinkClick = (linkName: ButtonName) => {
    incrementButtonMutation.mutate({
      name: linkName,
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    })
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {linksWithCounts.map((link) => (
        <IncrementingButton
          key={link.name}
          href={link.href}
          highlightColor={link.highlightColor}
          clickCount={link?.clickCount}
          onClick={() => onLinkClick(link.name)}
        >
          {link.label}
        </IncrementingButton>
      ))}
    </div>
  )
}

export const ButtonGrid = withQueryProvider(ButtonGridCore)
