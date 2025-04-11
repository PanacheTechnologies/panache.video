import { Link } from '@inertiajs/react'
import { PropsWithChildren } from 'react'
import { Logo } from '../logo'

export type AuthLayoutProps = {} & PropsWithChildren

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-orange-50/50 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex justify-center w-full">
          <Link className="hover:opacity-75 transition-opacity" href="/">
            <Logo />
          </Link>
        </div>
        {children}
        <p className="max-w-xs mx-auto text-center text-sm text-neutral-500">
          By clicking continue, you agree to our
          <br />{' '}
          <a
            href="/terms-of-service"
            className="underline underline-offset-4 text-blue-700 hover:text-blue-500 transition-colors"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="/privacy-policy"
            className="underline underline-offset-4 text-blue-700 hover:text-blue-500 transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
