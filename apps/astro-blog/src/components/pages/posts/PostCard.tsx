import { ExternalLink } from "lucide-react"
import type { Post } from "~/utils/consts"

export const PostCard = ({ title, description, link }: Post) => (
  <div className="flex flex-col border p-4 rounded shadow bg-white overflow-hidden">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <p className="text-gray-600 mb-4">{description}</p>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline break-words whitespace-nowrap flex flex-row gap-1 items-center"
    >
      {link}
      <ExternalLink size="1rem" />
    </a>
  </div>
)
