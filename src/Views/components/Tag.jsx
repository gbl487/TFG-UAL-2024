import { TagIcon } from '@Icons/Icons'

export default function Chip({ tag }) {
  return (
    <div className="h-[1.9rem] bg-[#e5e7eb] flex items-center justify-center px-3 rounded-3xl text-xs font-light gap-x-1 hover:bg-asiseg-blue/50 transition-opacity ">
      <TagIcon />
      {tag}
    </div>
  )
}
