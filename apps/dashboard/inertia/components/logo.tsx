import clsx from 'clsx'

export function Logo({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'flex font-serif italic text-2xl aspect-square size-10 items-center justify-center rounded-md bg-blue-600 text-white',
        className
      )}
      {...props}
    >
      P
    </div>
  )
}
