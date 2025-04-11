import { cn } from '~/lib/utils'
import React from 'react'

export default function Logo({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex font-serif italic text-2xl aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground',
        className
      )}
      {...props}
    >
      P
    </div>
  )
}
