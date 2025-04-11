import { usePageProps } from '~/hooks/use-page-props'

export default function useError(id: string | undefined): string | undefined {
  const props = usePageProps()
  console.log(props)
  if (!props.errors) {
    return undefined
  }

  if (!id) {
    return undefined
  }

  if (!props.errors[id]) {
    return undefined
  }

  return props.errors[id]
}
