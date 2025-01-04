import { ClientOnly } from '../../components/ClientOnly'
import { PropsContent } from './PropsContent'

export default function PropsPage() {
  return (
    <ClientOnly>
      <PropsContent />
    </ClientOnly>
  )
}
