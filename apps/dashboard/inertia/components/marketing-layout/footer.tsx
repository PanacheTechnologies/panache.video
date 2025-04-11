import { Link } from '@inertiajs/react'
import { Logo } from '../logo'

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200">
      <div className="flex flex-wrap w-full justify-between pt-4">
        <div className="flex flex-wrap flex-col justify-between gap-4">
          <p className="text-sm text-neutral-500 max-w-xs">
            We are building Panache.video to make video processing a breeze.
          </p>
          <div className="flex flex-wrap gap-4">
            <Logo className="!text-xl !size-8" />
          </div>
        </div>
        <div className="flex flex-wrap flex-col gap-4">
          <div className="flex flex-wrap justify-end items-center gap-2">
            <Link
              className="text-neutral-500 hover:text-neutral-700 text-sm"
              href="/legal/privacy-policy"
            >
              Privacy Policy
            </Link>
            <span className="text-neutral-500"> / </span>
            <Link
              className="text-neutral-500 hover:text-neutral-700 text-sm"
              href="/legal/terms-of-service"
            >
              Terms of Service
            </Link>
          </div>
          <div className="flex flex-wrap justify-end">
            <div className="border border-neutral-200 rounded-lg px-2 py-1.5 text-sm text-neutral-900 flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-700 rounded-full"></div>
              <p>All systems operational.</p>
            </div>
          </div>
          <p className="text-sm text-neutral-500">
            © 2025 Panache Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
