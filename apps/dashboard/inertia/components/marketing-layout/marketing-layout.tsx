import { Footer } from './footer'
import { Header, type HeaderProps } from './header/header'
import type { PropsWithChildren } from 'react'
import { cn } from '~/lib/utils'
export type MarketingLayoutProps = {
  className?: string
} & PropsWithChildren &
  HeaderProps

export function MarketingLayout({ children, className, ...headerProps }: MarketingLayoutProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-between min-h-screen space-y-4 w-full max-w-5xl mx-auto p-4',
        className
      )}
    >
      <Header {...headerProps} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
