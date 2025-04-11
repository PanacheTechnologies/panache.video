import clsx from 'clsx'
import * as React from 'react'

interface TextareaProps extends React.ComponentProps<'textarea'> {
  rows?: number
}

export function Textarea({ className, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={clsx(
        'flex w-full rounded-sm border border-neutral-300 shadow-xs bg-background',
        'read-only:text-neutral-700 px-3 py-2 text-sm ring-offset-background',
        'placeholder:text-muted-foreground focus-visible:outline-none transition',
        'read-only:!ring-0 read-only:!border-neutral-300',
        'focus:border-neutral-500 focus:ring-4 focus:ring-neutral-200',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-none', // Remove this if you want to allow resizing
        className
      )}
      {...props}
    />
  )
}
