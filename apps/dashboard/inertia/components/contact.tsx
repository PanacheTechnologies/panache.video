import { useState } from 'react'
import { MarketingLayout } from '~/components/marketing-layout/marketing-layout'
import { PricingCard } from '~/components/pricing-card'
import { TriangleAlert } from 'lucide-react'

interface SubscriberTier {
  limit: number
  price: number
}

const proTiers: SubscriberTier[] = [
  { limit: 1000, price: 50 },
  { limit: 5000, price: 75 },
  { limit: 10000, price: 100 },
  { limit: 25000, price: 175 },
  { limit: 50000, price: 250 },
]

export default function Pricing() {
  const [selectedTier, setSelectedTier] = useState<SubscriberTier>(proTiers[0])

  return (
    <MarketingLayout>
      <section className="flex flex-col items-center justify-center gap-4 max-w-md mx-auto">
        <p className="rounded-xl px-3 py-1 text-blue-800 font-medium border border-neutral-200 text-sm flex items-center gap-2">
          <TriangleAlert className="w-4 h-4" />
          Early Access
        </p>
        <h2 className="text-5xl text-center font-serif italic">Choose your plan.</h2>
        <h3 className="text-center text-neutral-500 text-lg">
          Start for free and scale as your newsletter grows.
        </h3>
        <div className="w-full max-w-xs">
          <select
            className="w-full h-10 rounded-lg border border-neutral-300 shadow-xs bg-background px-3 py-2 text-sm ring-offset-background transition focus:border-neutral-500 focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 focus:outline-0"
            value={selectedTier.limit}
            onChange={(e) => {
              const tier = proTiers.find((t) => t.limit === Number(e.target.value))
              if (tier) setSelectedTier(tier)
            }}
          >
            {proTiers.map((tier) => (
              <option key={tier.limit} value={tier.limit}>
                Up to {tier.limit.toLocaleString('en-US')} subscribers
              </option>
            ))}
          </select>
        </div>
      </section>
      <PricingTable selectedTier={selectedTier} />
    </MarketingLayout>
  )
}

function PricingTable({ selectedTier }: { selectedTier: SubscriberTier }) {
  return (
    <div className="mt-12 flex justify-center border-t border-neutral-200 -mx-2 bg-background">
      <div className="flex max-w-5xl w-full bg-background">
        <PricingCard
          title="Free"
          price="$0"
          ctaLabel="Start for free →"
          className="lg:border-r border-neutral-200"
          href="/auth/sign-up"
          features={[
            {
              text: 'Up to 1000 subscribers',
              included: true,
            },
            {
              text: 'Custom Domains',
              included: true,
            },
            {
              text: 'Ads and Sponsors',
              included: false,
            },
            {
              text: 'Paid Subscriptions',
              included: false,
            },
            {
              text: 'API Access',
              included: false,
            },
            {
              text: 'Email/Discord Support',
              included: false,
            },
          ]}
        />

        <PricingCard
          title="Pro"
          price={`$${selectedTier.price}`}
          ctaLabel="Get started →"
          className="lg:border-r border-neutral-200"
          ctaStyle="primary"
          href="/auth/sign-up"
          features={[
            {
              text: `Up to ${selectedTier.limit.toLocaleString('en-US')} subscribers`,
              included: true,
            },
            {
              text: 'Unlimited Domains',
              included: true,
            },
            {
              text: 'Ads and Sponsors',
              included: true,
            },
            {
              text: 'Paid Subscriptions',
              included: true,
            },
            {
              text: 'API Access',
              included: true,
            },
            {
              text: 'Email/Discord Support',
              included: true,
            },
          ]}
        />

        <PricingCard
          title="Enterprise"
          price="Custom"
          ctaLabel="Contact us →"
          href="/contact"
          features={[
            {
              text: 'Custom Subscriber Limits',
              included: true,
            },
            {
              text: 'Unlimited Domains',
              included: true,
            },
            {
              text: 'Ads and Sponsors',
              included: true,
            },
            {
              text: 'Paid Subscriptions',
              included: true,
            },
            {
              text: 'API Access',
              included: true,
            },
            {
              text: 'Email/Discord Support',
              included: true,
            },
          ]}
        />
      </div>
    </div>
  )
}
