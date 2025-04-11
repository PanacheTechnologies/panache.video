import { Check, X } from 'lucide-react'
import clsx from 'clsx'

interface PricingFeature {
  text: string
  included: boolean
  addon?: boolean
}

interface PricingCardProps {
  title: string
  price: string
  description?: string
  ctaLabel: string
  ctaStyle?: 'primary' | 'secondary'
  features: PricingFeature[]
  className?: string
  hideOnMobile?: boolean
  href?: string
  badge?: React.ReactNode
}

export function PricingCard({
  title,
  price,
  description,
  ctaLabel,
  ctaStyle = 'secondary',
  features,
  className = '',
  hideOnMobile = false,
  href,
  badge,
}: PricingCardProps) {
  return (
    <div className={`relative flex-1 p-6 ${hideOnMobile ? 'hidden lg:block' : ''} ${className}`}>
      {badge}
      <div>
        <h3 className="text-xl font-medium mb-4">{title}</h3>
        <div className="mb-6 flex gap-2">
          <div className="text-2xl font-medium">{price}</div>
          {title !== 'Enterprise' && <div className="text-sm text-neutral-500">per month</div>}
        </div>
        {description && <p className="text-sm text-neutral-500 mb-6">{description}</p>}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              {feature.included ? (
                <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
              ) : (
                <X className="h-5 w-5 text-neutral-400 flex-shrink-0" />
              )}
              <span className="text-neutral-700">
                {feature.text}
                {feature.addon && <span className="text-neutral-500 ml-1">with Add-on</span>}
              </span>
            </div>
          ))}
        </div>
        <a
          className={clsx('w-full btn', ctaStyle === 'primary' ? 'btn-primary' : 'btn-secondary')}
          href={href}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}
