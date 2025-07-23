'use client'

import { CopyButton } from './CopyButton'

export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative">
      <pre className="p-4 bg-gray-900 text-gray-300 rounded-lg overflow-x-auto">
        <code>{code}</code>
      </pre>
      <CopyButton code={code} />
    </div>
  )
}
