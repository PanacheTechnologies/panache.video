import { usePageProps } from './use-page-props'

export function useUser() {
  const { user } = usePageProps()

  return user
}
