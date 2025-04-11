import type { PropsWithChildren } from 'react'
import { MarketingLayout } from '../marketing-layout/marketing-layout'

export function DocumentationLayout({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return <MarketingLayout className={className}>{children}</MarketingLayout>
}
