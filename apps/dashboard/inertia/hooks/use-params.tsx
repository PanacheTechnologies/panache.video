import { usePageProps } from './use-page-props'

export default function useParams() {
  const props = usePageProps()

  return props.params
}
