import React from 'react'
import useError from '~/hooks/use-error'
import clsx from 'clsx'

export type ErrorProps = {
  errorKey: string
} & React.ComponentProps<'p'>

export function Error({ className, errorKey, ...props }: ErrorProps) {
  const error = useError(errorKey)
  if (error === undefined) {
    return null
  }

  return (
    <p className={clsx('text-red-600 text-sm', className)} {...props}>
      {error}
    </p>
  )
}
