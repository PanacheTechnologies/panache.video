import Publication from '#models/publication'
import usePageProps from './use_page_props'

export function usePublications() {
  const { publications, currentPublication } = usePageProps<{
    publications: Publication[]
    currentPublication: Publication | null
  }>()

  return {
    publications,
    currentPublication,
  }
}
