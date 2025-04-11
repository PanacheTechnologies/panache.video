import React from 'react'
import { GoogleIcon } from '../icons'
import { Button } from '~/components/button'

export function ContinueWithGoogle() {
  const [isLoading, setIsLoading] = React.useState(false)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setIsLoading(true)
    window.location.href = '/auth/google/redirect'
  }

  return (
    <Button className="w-full" variant="secondary" onClick={handleClick} loading={isLoading}>
      <GoogleIcon className="w-4 h-4" />
      <span>Continue with Google</span>
    </Button>
  )
}
