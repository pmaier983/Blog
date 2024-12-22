import { motion } from "motion/react"

export const CoolLink = ({
  title,
  links,
  clickCount,
  onClick,
}: {
  title: string
  links: string[]
  clickCount: number
  onClick: () => void
}) => (
  <div className="flex flex-col border p-4 rounded shadow bg-white w-full overflow-hidden">
    <span className="inline">
      <h2 className="text-lg font-semibold mb-2 inline">{title}</h2>
    </span>
    <ul className="list-disc pl-5 space-y-2">
      {links.map((link) => (
        <li key={link}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-words"
            onClick={onClick}
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
    <div className="self-end flex-1 place-content-end">
      {typeof clickCount === "number" && clickCount > 0 && (
        <motion.span
          className="hover:cursor-help"
          title="Link clicks"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          ({clickCount})
        </motion.span>
      )}
      &nbsp;
    </div>
  </div>
)
