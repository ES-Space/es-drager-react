'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export function CopyButton({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
      aria-label="Copy code"
    >
      {isCopied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}
