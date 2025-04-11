import { Link } from '@inertiajs/react'
import { IconArrowRight } from '@tabler/icons-react'
import { ProductNavMenu } from './product_nav_menu'
import useUser from '~/hooks/use_user'

export default function Header() {
  const user = useUser()
  return (
    <header className="bg-white border-b border-neutral-100 relative">
      <div className="relative mx-auto max-w-4xl py-6 px-8 sm:px-0 text-justify">
        <div className="flex flex-wrap gap-4 items-center justify-between text-neutral-500">
          <div className="w-full sm:w-fit h-fit">
            <Link className="text-2xl font-serif italic text-black" href="/">
              Panache.video
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <ProductNavMenu />
          </div>

          <Link className="btn btn-primary" href={user ? '/publications' : '/auth'}>
            <span>Get started</span>
            <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
