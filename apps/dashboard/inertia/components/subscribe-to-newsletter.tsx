import React, { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Error } from '~/components/ui/error'
import { CircleCheck } from 'lucide-react'
import { Alert, AlertTitle } from './ui/alert'

interface SubscribeToNewsletterProps {
  className?: string
  publicationId?: string
  publicationSlug?: string
}

export default function SubscribeToNewsletter({
  className,
  publicationId,
  publicationSlug,
}: SubscribeToNewsletterProps) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const form = useForm({
    email: '',
  })
  const [loaded, setLoaded] = useState(false)

  // Generate a unique key for this publication
  const storageKey = `newsletter_subscribed_${publicationId || publicationSlug || 'default'}`

  useEffect(() => {
    setLoaded(true)
  }, [])

  // Check localStorage on component mount
  useEffect(() => {
    const subscriptionStatus = localStorage.getItem(storageKey)
    if (subscriptionStatus === 'true') {
      setIsSubscribed(true)
    }
  }, [storageKey])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post(`/p/${publicationSlug}/subscribe`, {
      preserveState: true,
      onSuccess: () => {
        form.reset('email')
        // Save subscription status to localStorage
        localStorage.setItem(storageKey, 'true')
        setIsSubscribed(true)
      },
    })
  }

  if (!loaded) {
    return null
  }

  if (isSubscribed) {
    return (
      <div className={className}>
        <Alert className="flex gap-2" variant="success">
          <CircleCheck className="size-5 flex-shrink-0 stroke-blue-700" />
          <AlertTitle className="mt-1 text-sm">You're subscribed to this newsletter!</AlertTitle>
        </Alert>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm text-neutral-500 text-center">
          Subscribe to get future posts via email.
        </h3>

        {form.hasErrors && !form.processing && (
          <Alert variant="destructive">
            <AlertTitle>There was an error with your submission.</AlertTitle>
          </Alert>
        )}

        <div className="max-w-md w-full mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex">
              <Input
                type="email"
                name="email"
                placeholder="Type your email address..."
                className="flex-1 rounded-r-none"
                required
                value={form.data.email}
                onChange={(e) => form.setData('email', e.target.value)}
                disabled={form.processing}
              />
              <Button className="h-10 rounded-l-none" type="submit" loading={form.processing}>
                Subscribe
              </Button>
            </div>
            <Error errorKey="email" />

            <p className="text-xs text-neutral-500 text-center">
              No spam. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
