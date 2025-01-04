import { ClientOnly } from '../../components/ClientOnly'
import { DraggingContent } from './DraggingContent'

export default function DraggingPage() {
  return (
    <ClientOnly>
      <DraggingContent />
    </ClientOnly>
  )
}
