import { Link } from '@inertiajs/react'
import { usePath } from '~/hooks/use-path'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export function NavLink({ href, children }: NavLinkProps) {
  const path = usePath()
  const isActive = path === href

  return (
    <Link
      className={`text-sm px-3 py-1.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 ${
        isActive
          ? 'text-neutral-700 bg-neutral-100'
          : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
      }`}
      href={href}
    >
      {children}
    </Link>
  )
}
