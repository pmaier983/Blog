import { useState } from "react"
import { Icon } from "~/components/Icon"
import { NAVIGABLE_PAGES } from "~/consts"

export const MobileNavMenuButton = () => {
  const [isNavOverlayVisible, setNavOverlayVisibility] = useState(false)

  return (
    <div className="sm:hidden">
      <button
        onClick={() => {
          setNavOverlayVisibility(!isNavOverlayVisible)
        }}
        className="absolute bg-white top-2 right-2 rounded-md border-2 border-black p-2"
      >
        <Icon icon="menu" className="w-10 h-10" />
        <span className="sr-only">menu</span>
      </button>
      {isNavOverlayVisible && (
        <div className="fixed w-full h-full bg-white">
          <div className="flex flex-col items-center justify-center h-full">
            <button
              onClick={() => {
                setNavOverlayVisibility(!isNavOverlayVisible)
              }}
              className="absolute bg-white top-2 right-2 rounded-md border-2 border-black p-2"
            >
              <Icon icon="close" className="w-10 h-10" />
              <span className="sr-only">close</span>
            </button>
            <nav>
              <ul className="flex flex-col gap-9">
                {NAVIGABLE_PAGES.map((page) => (
                  <>
                    {/* How to get text size to scale with screen size perfectly? */}
                    <li className="text-6xl">
                      <a
                        href={page.href}
                        className="flex flex-row items-center gap-6"
                      >
                        <Icon icon={page.icon} className="w-20 h-20" />
                        {page.title}
                      </a>
                    </li>
                    <div className="h-[2px] bg-gray-300 last:hidden" />
                  </>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}