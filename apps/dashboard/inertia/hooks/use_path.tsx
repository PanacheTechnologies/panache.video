import usePageProps from './use_page_props.js'

export default function usePath() {
  const props = usePageProps<{
    path: string
  }>()

  return props.path
}
