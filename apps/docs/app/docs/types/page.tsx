import { ClientOnly } from '../../components/ClientOnly'
import { TypesContent } from './TypesContent'

export default function TypesPage() {
  return (
    <ClientOnly>
      <TypesContent />
    </ClientOnly>
  )
}
