import React from 'react'
import { useForm } from '@inertiajs/react'
import { Card, CardHeader } from '../card'
import { Button } from '../button'
import { Input } from '../input'
import { Label } from '../label'
import { Error } from '../error'
import { ArrowRightIcon } from 'lucide-react'

export default function CreatePublicationForm() {
  const form = useForm({
    title: '',
    slug: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/publications')
  }

  return (
    <Card>
      <CardHeader>
        <form onSubmit={handleSubmit} id="publication-form">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Publication Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="The Sand Hill Road Journal"
                required
                value={form.data.title}
                onChange={(e) => form.setData('title', e.target.value)}
              />
              <Error errorKey="title" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">Publication Slug</Label>

              <div className="flex">
                <span className="flex font-medium items-center border-r-0 px-3 h-10 text-neutral-600 rounded-sm rounded-r-none border border-neutral-300 bg-background text-sm">
                  https://panache.so/p/
                </span>
                <Input
                  id="slug"
                  name="slug"
                  type="text"
                  className="rounded-l-none"
                  placeholder="sandhillroadjournal"
                  required
                  value={form.data.slug}
                  onChange={(e) => {
                    form.setData('slug', e.target.value.replaceAll(' ', '-').toLowerCase())
                  }}
                />
              </div>

              <Error errorKey="slug" />
            </div>
          </div>
        </form>
        <Button
          type="submit"
          className="!w-full mt-4"
          form="publication-form"
          loading={form.processing}
        >
          <span>Continue</span>
          <ArrowRightIcon className="size-4" />
        </Button>
      </CardHeader>
    </Card>
  )
}
