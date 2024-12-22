import { trpcReactQuery } from "~/utils/client"
import { CoolLink } from "~/components/CoolLink"
import { COOL_LINKS } from "~/utils/consts"
import { withQueryProvider } from "~/utils/withQueryProvider"

const BUTTON_NAMES = COOL_LINKS.map((link) => link.name)

const CoolLinksCore = () => {
  const utils = trpcReactQuery.useUtils()

  const buttonsQuery = trpcReactQuery.getButtons.useQuery({
    names: BUTTON_NAMES,
  })

  const linksWithClicks = COOL_LINKS.map((link) => {
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

export const CoolLinks = withQueryProvider(CoolLinksCore)
