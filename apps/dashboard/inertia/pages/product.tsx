import { MarketingLayout } from '~/components/marketing-layout/marketing-layout'
import { TriangleAlert } from 'lucide-react'
import { Head, Link } from '@inertiajs/react'
import { GitHubIcon } from '~/components/icons'

export default function Product() {
  return (
    <MarketingLayout>
      <Head>
        <title>Product</title>
        <meta
          name="description"
          content="An open-source newsletter platform, designed for creators."
        />

        <meta property="og:title" content="Panache" />
        <meta
          property="og:description"
          content="An open-source newsletter platform, designed for creators."
        />
      </Head>

      <section className="flex flex-col items-center justify-center gap-4 max-w-md mx-auto">
        <p className="rounded-xl px-3 py-1 text-blue-600 font-medium border border-neutral-200 text-sm flex items-center gap-2">
          <TriangleAlert className="w-4 h-4" />
          Early Access
        </p>
        <h2 className="text-5xl text-center font-serif italic">Video for developers.</h2>
        <h3 className="text-center text-neutral-500 text-lg">
          A simple REST API for video processing.
        </h3>
        <div className="w-full flex flex-wrap justify-center items-center gap-4">
          <Link className="btn btn-primary" href="/auth/sign-up">
            Start for free →
          </Link>
          <a
            className="btn btn-secondary"
            href="https://github.com/panachetechnologies/panache.video"
          >
            Star on GitHub <GitHubIcon className="h-4 w-4" />
          </a>
        </div>
      </section>
    </MarketingLayout>
  )
}
