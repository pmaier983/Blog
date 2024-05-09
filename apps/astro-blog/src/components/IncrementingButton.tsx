// We want this component to be rendered on the client side only, so we set prerender to false
export const prerender = false

const BUTTON_NAME = "test"

export const IncrementingButton = () => {
  return (
    <button
      className="bg-green-600 h-10 p-2 rounded-md"
      onClick={async () => {
        await fetch(
          `${import.meta.env.PUBLIC_API_URL}/api/v1/buttons/${BUTTON_NAME}`,
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
