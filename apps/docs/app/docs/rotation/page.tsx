import { ClientOnly } from '../../components/ClientOnly'
import { RotationContent } from './RotationContent'

export default function RotationPage() {
  return (
    <ClientOnly>
      <RotationContent />
    </ClientOnly>
  )
}
