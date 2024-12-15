export const BUTTON_NAME = {
  REACT: "REACT",
  ANGULAR: "ANGULAR",
  ASTRO: "ASTRO",
} as const

export type ButtonName = keyof typeof BUTTON_NAME
