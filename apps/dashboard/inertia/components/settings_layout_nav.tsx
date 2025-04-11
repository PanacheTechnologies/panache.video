import useParams from '~/hooks/use_params'
import usePath from '~/hooks/use_path'
import { Link } from '@inertiajs/react'
import { cn } from '~/lib/utils'

export function SettingsLayoutNav() {
  const params = useParams()

  return (
    <nav className="grid gap-2 text-sm text-muted-foreground">
      <NavItem href={`/publications/${params.slug}/settings`} label="General" />
    </nav>
  )
}

function NavItem({ href, label }: { href: string; label: string }) {
  const path = usePath()

  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center gap-x-3 p-2 rounded-lg',
        path === href
          ? 'font-bold text-blue-800 bg-neutral-50 border border-neutral-100'
          : 'text-zinc-900'
      )}
    >
      <span className="group-hover:text-blue-800 transition-colors font-medium">{label}</span>
    </Link>
  )
}
