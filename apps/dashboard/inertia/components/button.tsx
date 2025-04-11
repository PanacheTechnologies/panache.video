import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import clsx from 'clsx'
import { Loader } from 'lucide-react'

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      danger: 'btn-danger',
      warning: 'btn-warning',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export function Button({ className, variant, loading, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(buttonVariants({ variant, className }))}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <Loader className="w-4 h-4 animate-spin" /> : children}
    </button>
  )
}
