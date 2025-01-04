'use client'

import { ClientOnly } from '../../components/ClientOnly'
import { QuickStartContent } from './QuickStartContent'

export default function QuickStartPage() {
  return (
    <ClientOnly>
      <QuickStartContent />
    </ClientOnly>
  )
}
