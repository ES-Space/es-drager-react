import { ClientOnly } from '../../components/ClientOnly'
import { ConnectionsContent } from './ConnectionsContent'

export default function ConnectionsPage() {
  return (
    <ClientOnly>
      <ConnectionsContent />
    </ClientOnly>
  )
}
