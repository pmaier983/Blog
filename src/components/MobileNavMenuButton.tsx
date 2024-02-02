import { Icon } from "~/components/Icon"

export const MobileNavMenuButton = () => {
  return (
    <div className="sm:hidden">
      <button className="absolute bg-white top-2 right-2 rounded-md border-2 border-black p-2">
        <Icon icon="menu" />
        <span className="sr-only">menu</span>
      </button>
    </div>
  )
}
