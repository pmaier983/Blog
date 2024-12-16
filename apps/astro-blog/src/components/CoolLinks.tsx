import { useEffect, useState } from "react"
import { trpcClient } from "~/client"
import { CoolLink } from "~/components/CoolLink"
import { COOL_LINKS } from "~/consts"

export const CoolLinks = () => {
  const [links, setLink] = useState(
    COOL_LINKS.map((link) => ({ ...link, clickCount: 0 })),
  )

  // I was going to use react-query, but implementing it in astro
  // led to constant instantiation of the query provider and trpc client
  // Something I had to always remember, so I'll just go old fashioned useEffect.
  useEffect(() => {
    ;(async () => {
      const buttons = await trpcClient.getButtons.query({
        names: COOL_LINKS.map((link) => link.name),
      })

      const linksWithClicks = COOL_LINKS.map((link) => {
        const button = buttons?.find((b) => b.name === link.name)
        return {
          ...link,
          clickCount: button?.clickCount ?? 0,
        }
      })

      console.log({ linksWithClicks })

      setLink(linksWithClicks)
    })()
  }, [])

  return (
    <>
      {links.map((props) => (
        <CoolLink
          key={props.name}
          {...props}
          setClickCount={(value: number) => {
            setLink((prev) =>
              prev.map((link) => {
                if (link.name === props.name) {
                  return { ...link, clickCount: value }
                }
                return link
              }),
            )
          }}
        />
      ))}
    </>
  )
}
