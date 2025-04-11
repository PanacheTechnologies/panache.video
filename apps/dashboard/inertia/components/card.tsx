import * as React from 'react'
import clsx from 'clsx'

type CardBaseProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardBaseProps) {
  return (
    <div
      className={clsx('rounded-md border border-neutral-300 bg-white shadow-sm', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardBaseProps) {
  return <div className={clsx('flex flex-col space-y-1.5 p-6', className)} {...props} />
}

export function CardTitle({ className, ...props }: CardBaseProps) {
  return (
    <div
      className={clsx('text-xl text-black font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: CardBaseProps) {
  return <div className={clsx('text-sm text-neutral-500', className)} {...props} />
}

export function CardContent({ className, ...props }: CardBaseProps) {
  return <div className={clsx('p-6 pt-0', className)} {...props} />
}

export function CardFooter({ className, ...props }: CardBaseProps) {
  return <div className={clsx('flex items-center p-6 pt-0', className)} {...props} />
}
