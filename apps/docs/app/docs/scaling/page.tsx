import { ClientOnly } from '../../components/ClientOnly'
import { ScalingContent } from './ScalingContent'

export default function ScalingPage() {
  return (
    <ClientOnly>
      <ScalingContent />
    </ClientOnly>
  )
}
