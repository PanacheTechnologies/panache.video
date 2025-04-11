import { usePageProps } from './use-page-props'

export function usePath() {
  const { path } = usePageProps()

  return path
}
