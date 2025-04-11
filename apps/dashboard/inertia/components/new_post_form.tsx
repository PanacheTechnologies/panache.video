import React from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from './ui/button'
import { IconCirclePlus } from '@tabler/icons-react'

interface NewPostFormProps {
  publicationDomain: string
}

export default function NewPostForm({ publicationDomain }: NewPostFormProps) {
  const { post, processing } = useForm({})

  const handleCreateDraft = () => {
    post(`/publications/${publicationDomain}/posts`)
  }

  return (
    <Button onClick={handleCreateDraft} loading={processing}>
      <IconCirclePlus className="w-4.5 h-4.5 -ml-1" />
      <span className="flex items-center gap-x-2">New Post</span>
    </Button>
  )
}
