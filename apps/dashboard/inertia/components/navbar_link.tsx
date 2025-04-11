export type NavbarLinkProps = {
  href: string
  icon?: React.ReactNode
}

export default function NavbarLink({
  children,
  href,
  icon,
}: React.PropsWithChildren<NavbarLinkProps>) {
  return (
    <a
      className="text-sm flex items-center space-x-1 font-medium leading-6 text-neutral-600 hover:text-neutral-900 transition-colors"
      href={href}
    >
      {icon}
      <span>{children}</span>
    </a>
  )
}
