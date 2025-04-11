import { Link } from '@inertiajs/react'
import { IconArrowRight } from '@tabler/icons-react'
import Logo from '~/components/logo'
import { IconDiscord } from './icons'

export default function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-screen-lg overflow-hidden rounded-lg bg-neutral-50 p-6 text-center sm:p-20 sm:px-0">
      <svg
        className="pointer-events-none absolute inset-[unset] left-1/2 top-0 w-[1200px] -translate-x-1/2 text-neutral-300 [mask-image:linear-gradient(transparent,black_70%)]"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="grid-:Rh7mqnb:"
            x={0}
            y="-53.5"
            width={80}
            height={80}
            patternUnits="userSpaceOnUse"
          >
            <path d="M 80 0 L 0 0 0 80" fill="transparent" stroke="currentColor" strokeWidth={1} />
          </pattern>
        </defs>
        <rect fill="url(#grid-:Rh7mqnb:)" width="100%" height="100%" />
      </svg>
      <div className="absolute -left-1/4 top-[38%] h-[135%] w-[150%] opacity-10 blur-[120px] [transform:translate3d(0,0,0)]">
        <div className="size-full bg-[conic-gradient(at_50%_50%,_#efd56e_0deg,_#efd56e_117deg,_#EB5C0C_180deg,_#efd56e_360deg)] [mask-image:radial-gradient(closest-side,black_100%,transparent_100%)]" />
      </div>
      <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
        <Logo className="size-12 text-3xl" />
        <h1 className="font-serif text-5xl lg:text-6xl text-center leading-tighter mt-4">
          Email <span className="italic">once</span>.
          <br />
          Echo <span className="italic">forever</span>.
        </h1>
        <h2 className="text-center text-neutral-500 lg:text-lg mt-6">
          Panache is an open-source newsletter platform designed for creators.
        </h2>
      </div>

      <div className="relative mx-auto mt-6 flex max-w-fit space-x-4 animate-slide-up-fade [--offset:5px] [animation-delay:300ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
        <Link className="btn btn-primary" href="/auth">
          <span>Start for free</span>
          <IconArrowRight className="w-4 h-4" />
        </Link>
        <a className="btn btn-secondary" href="https://discord.gg/MnUDwwEjYU">
          <IconDiscord className="w-4 h-4" />
          <span>Join the community</span>
        </a>
      </div>
    </section>
  )
}
