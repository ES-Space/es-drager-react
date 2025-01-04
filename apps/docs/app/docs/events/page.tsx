import { ClientOnly } from '../../components/ClientOnly'
import { EventsContent } from './EventsContent'

export default function EventsPage() {
  return (
    <ClientOnly>
      <EventsContent />
    </ClientOnly>
  )
}
