import usePageProps from './use_page_props.js'

export default function useParams() {
  const props = usePageProps<{
    params: Record<string, string>
  }>()

  return props.params
}
