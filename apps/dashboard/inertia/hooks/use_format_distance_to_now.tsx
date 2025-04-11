import { formatDistanceToNow as format } from 'date-fns'
import { useLocale } from './use_translate'
import { fr } from 'date-fns/locale'
import { toZonedTime } from 'date-fns-tz'

export function useFormatDistanceToNow() {
  const locale = useLocale()

  return (date: string) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const timeAgo = format(toZonedTime(new Date(date), timezone), {
      addSuffix: true,
      locale: locale === 'fr' ? fr : undefined,
    })

    return timeAgo
  }
}
