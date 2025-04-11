import { Link } from '@inertiajs/react'
import { NavLink } from './nav-link'
import clsx from 'clsx'
import { useUser } from '~/hooks/use-user'

export interface HeaderProps {
  showBottomBorder?: boolean
}

export function Header({ showBottomBorder = false }: HeaderProps) {
  const user = useUser()
  return (
    <div
      className={clsx(
        'w-full flex items-start sm:items-center justify-between gap-2 pb-4',
        showBottomBorder && 'border-b border-neutral-200'
      )}
    >
      <div className="w-full flex items-center gap-6">
        <h1 className="text-2xl italic font-serif">Panache.video</h1>
      </div>
      <nav className="w-full flex justify-center gap-4">
        <NavLink href="/">Product</NavLink>
        <NavLink href="/pricing">Pricing</NavLink>
      </nav>
      <div className="w-full flex flex-wrap justify-end items-center gap-4">
        {user ? (
          <Link className="btn btn-secondary" href="/publications">
            Go to dashboard →
          </Link>
        ) : (
          <>
            <Link className="btn btn-secondary" href="/auth/sign-in">
              Sign in
            </Link>
            <Link className="btn btn-primary" href="/auth/sign-up">
              Start for free →
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
