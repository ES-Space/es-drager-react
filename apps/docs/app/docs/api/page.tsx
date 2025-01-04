import { ClientOnly } from '../../components/ClientOnly'
import { ApiContent } from './ApiContent'

export default function ApiPage() {
  return (
    <ClientOnly>
      <ApiContent />
    </ClientOnly>
  )
}
