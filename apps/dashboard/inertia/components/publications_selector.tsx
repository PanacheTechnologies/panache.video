import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { usePublications } from '../hooks/use_publications'
import { IconCirclePlus } from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const PublicationsSelector = () => {
  const { publications, currentPublication } = usePublications()
  const [currentPublicationSlug, setCurrentPublicationSlug] = React.useState(
    currentPublication?.slug || ''
  )

  return (
    <Select
      value={currentPublicationSlug}
      onValueChange={(value) => {
        setCurrentPublicationSlug(value)
        if (value === 'create') {
          window.location.href = `/publications/create`

          return
        }
        window.location.href = `/publications/${value}`
      }}
      onOpenChange={(open) => {
        if (!open) {
          setCurrentPublicationSlug(currentPublication?.slug || '')
        }
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="" />
      </SelectTrigger>

      <SelectContent>
        {publications.map((publication) => (
          <SelectItem value={publication.slug} key={publication.slug} className="cursor-pointer">
            <div className="flex items-center space-x-2">
              <Avatar className="w-7 h-7 rounded-full">
                <AvatarImage src={`https://avatar.vercel.sh/${publication.title}`} />
                <AvatarFallback>{publication.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-3 sm:flex">
                <span className="inline-block max-w-[100px] truncate text-sm font-medium sm:max-w-[200px]">
                  {publication.title}
                </span>
              </div>
            </div>
          </SelectItem>
        ))}
        <SelectItem value="create" className="cursor-pointer py-2.5">
          <div className="flex items-center space-x-2">
            <IconCirclePlus className="ml-1 h-5 w-5 rounded-full shadow-lg mr-3" />
            <span>Create New Publication</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default PublicationsSelector
