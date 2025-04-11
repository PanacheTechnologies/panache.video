import { usePage } from '@inertiajs/react'
import type { SharedProps } from '@adonisjs/inertia/types'

export function usePageProps() {
  const { props } = usePage()

  return props as unknown as SharedProps
}
