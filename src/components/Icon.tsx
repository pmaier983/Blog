import { type ComponentPropsWithRef } from "react"
import { ICONS, type Icon as IconType } from "~/consts"

export interface IconProps extends ComponentPropsWithRef<"svg"> {
  icon: IconType
  size?: ComponentPropsWithRef<"svg">["width"]
}

// Inspired by this article: https://benadam.me/thoughts/react-svg-sprites/
// TODO: decide if this is the best svg method, or another way would be better?
export const Icon = (props: IconProps) => (
  <svg
    height={props.size ?? 24}
    width={props.size ?? 24}
    strokeWidth={props.strokeWidth ?? "2"}
    {...props}
  >
    <use href={`/icons.svg#${ICONS[props.icon]}`} />
  </svg>
)
