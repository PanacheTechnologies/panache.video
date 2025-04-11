import clsx from 'clsx'
import * as React from 'react'

export function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      className={clsx(
        'flex h-10 w-full rounded-sm border border-neutral-300 shadow-xs bg-background read-only:text-neutral-700 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none transition read-only:!ring-0 read-only:!border-neutral-300 focus:border-neutral-500 focus:ring-4 focus:ring-neutral-200 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}
