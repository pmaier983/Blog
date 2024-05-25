// We want this component to be rendered on the client side only, so we set prerender to false
export const prerender = false

const BUTTON_NAME = "test"

// TODO: Unify this between the turbo apps
const API_PORT = 8080

export interface IncrementingButtonProps {
  // Currently this should always be === Astro.url.hostname
  // this should in essence be the same as window.location.hostname?
  currentHostname: string
}

export const IncrementingButton = ({
  currentHostname,
}: IncrementingButtonProps) => {
  return (
    <button
      className="bg-green-600 h-10 p-2 rounded-md"
      onClick={async () => {
        console.log({ currentHostname })
        // TODO: how to use https instead of http here?
        await fetch(
          `http://${currentHostname}:${API_PORT}/api/v1/buttons/${BUTTON_NAME}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: BUTTON_NAME,
              userAgent: navigator.userAgent,
              language: navigator.language,
              screenResolution: `${window.screen.width}x${window.screen.height}`,
            }),
          }
        )
      }}
    >
      Click me to increment a counter!
    </button>
  )
}
