import usePageProps from './use_page_props.js'

export default function useQuery() {
  const props = usePageProps<{
    query: Record<string, string>
  }>()

  return props.query
}
