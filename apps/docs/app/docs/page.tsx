import { ClientOnly } from '../components/ClientOnly'
import { IntroductionContent } from './IntroductionContent'

export default function DocsPage() {
  return (
    <ClientOnly>
      <IntroductionContent />
    </ClientOnly>
  )
}
