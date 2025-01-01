import { trpcReactQuery } from "~/utils/client"
import { CoolLink } from "~/components/CoolLink"
import { withQueryProvider } from "~/utils/withQueryProvider"
import type { CoolLink as CoolLinkType } from "~/utils/consts"

interface CoolLinksProps {
  links: CoolLinkType[]
}

const CoolLinksCore = ({ links }: CoolLinksProps) => {
  const utils = trpcReactQuery.useUtils()

  const buttonNames = links.map((link) => link.name)

  const buttonsQuery = trpcReactQuery.getButtons.useQuery({
    names: buttonNames,
  })

  const linksWithClicks = links.map((link) => {
    const button = buttonsQuery.data?.find((b) => b.name === link.name)
    return {
      ...link,
      clickCount: button?.clickCount ?? 0,
    }
  })

  // If duplicated one more time, consider extracting to a custom hook
  const incrementButtonMutation = trpcReactQuery.incrementButton.useMutation({
    onMutate: async (variables) => {
      const { name } = variables

      const previousData = utils.getButtons.getData({ names: buttonNames })

      utils.getButtons.setData({ names: buttonNames }, (oldData) => {
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
        utils.getButtons.setData({ names: buttonNames }, context.previousData)
      }
    },
  })

  return (
    <>
      {linksWithClicks.map((props) => (
        <CoolLink
          key={props.name}
          {...props}
          onClick={() => {
            incrementButtonMutation.mutate({
              name: props.name,
              userAgent: navigator.userAgent,
              language: navigator.language,
              screenResolution: `${window.screen.width}x${window.screen.height}`,
            })
          }}
        />
      ))}
    </>
  )
}

const CoolLinks = withQueryProvider(CoolLinksCore)

export { CoolLinks }
