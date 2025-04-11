import React from 'react'
import { GitHubIcon } from '../icons'
import { Button } from '~/components/button'

export function ContinueWithGitHub() {
  const [isLoading, setIsLoading] = React.useState(false)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setIsLoading(true)
    window.location.href = '/auth/github/redirect'
  }

  return (
    <Button className="w-full" variant="secondary" onClick={handleClick} loading={isLoading}>
      <GitHubIcon className="w-4 h-4" />
      <span>Continue with GitHub</span>
    </Button>
  )
}
