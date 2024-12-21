import { trpcReactQuery } from "~/client"
import { IncrementingButton } from "~/components/IncrementingButton"
import { withQueryProvider } from "~/withQueryProvider"

const ButtonGridCore = () => {
  const data = trpcReactQuery.getButton.useQuery({
    name: "linkedin",
  })

  return (
    <div>
      <IncrementingButton
        name="linkedin"
        clickCount={data.data?.clickCount ?? 0}
      >
        LinkedIn
      </IncrementingButton>
    </div>
  )
}

export const ButtonGrid = withQueryProvider(ButtonGridCore)
