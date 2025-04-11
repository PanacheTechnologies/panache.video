import * as React from 'react'
import Tab from './tab.js'
import useParams from '../hooks/use_params.js'
import AccountDropdown from './account_dropdown.js'
import PublicationsSelector from './publications_selector.js'
import { cn } from '~/lib/utils'
import { Logo } from './logo.js'
import { Head } from '@inertiajs/react'
import { Toaster } from './ui/toaster.js'

export interface EditorLayoutProps extends React.PropsWithChildren {
  title?: string | React.ReactNode
  description?: string
  actions?: React.ReactNode
}

const EditorLayout: React.FunctionComponent<EditorLayoutProps> = ({
  children,
  title,
  description,
  actions,
}) => {
  const params = useParams()

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Toaster />

      <main className="min-h-screen w-full border-t-10 border-blue-600">
        <div className="-top-16 z-20 border-b border-zinc-200 bg-white">
          <div className="mx-auto w-full max-w-5xl px-2.5">
            <div className="flex h-16 items-center justify-between px-2">
              <div className="flex items-center gap-x-2">
                <div className="max-w-fit">
                  <Logo className="size-9" />
                </div>
                <svg
                  fill="none"
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  className="hidden h-16 w-16 text-zinc-200 sm:block"
                >
                  <path d="M16.88 3.549L7.12 20.451"></path>
                </svg>
                <PublicationsSelector />
                <span className="px-3 py-1 border border-neutral-300 rounded-lg bg-[#f0eee6] text-neutral-700 font-medium text-sm ml-2">
                  Editor
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  className="flex items-center space-x-1 transition-all text-blue-900 font-medium hover:opacity-80 duration-75 active:scale-95"
                  href="https://panache.featurebase.app/en"
                  target="_blank"
                >
                  <span className="text-sm">Feedback</span>
                </a>
                <span>·</span>
                <a
                  className="flex items-center space-x-1 transition-all text-blue-900 font-medium hover:opacity-80 duration-75 active:scale-95"
                  href="https://panache.featurebase.app/en/help"
                  target="_blank"
                >
                  <span className="text-sm">Help Center</span>
                </a>
                <span>·</span>
                <div className="relative inline-block">
                  <AccountDropdown />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-zinc-200">
          <div className="mx-auto w-full max-w-5xl px-2.5 scrollbar-hide relative flex gap-x-2 overflow-x-auto transition-all">
            <Tab href={`/publications/${params.slug}`} label="Overview" />
            <Tab href={`/publications/${params.slug}/posts`} label="Posts" />
            <Tab href={`/publications/${params.slug}/audience`} label="Audience" />
            <Tab href={`/publications/${params.slug}/settings`} label="Settings" />
          </div>
        </div>
        {title || description || actions ? (
          <div className="border-b border-zinc-200 bg-neutral-50">
            <div className="mx-auto w-full max-w-5xl px-6 py-8">
              <div
                className={cn(
                  'flex items-center justify-between',
                  actions ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                {title ? (
                  <h1 className="order-1 text-2xl sm:text-3xl font-semibold text-black px-2 ">
                    {title}
                  </h1>
                ) : null}
                {description ? (
                  <h2 className="pt-2 text-sm text-zinc-600 font-normal">{description}</h2>
                ) : null}
                {actions ? <div className="flex items-center justify-end">{actions}</div> : null}
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex w-full items-center">
          <div className="mx-auto w-full max-w-5xl px-6 flex flex-col gap-y-3">{children}</div>
        </div>
      </main>
    </>
  )
}

export default EditorLayout
