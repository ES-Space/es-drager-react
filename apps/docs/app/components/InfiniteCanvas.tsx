'use client'

interface InfiniteCanvasProps {
  children: React.ReactNode
}

export function InfiniteCanvas({ children }: InfiniteCanvasProps) {
  return (
    <div
      className="w-full h-full bg-gray-50 overflow-hidden p-10 relative"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #ddd 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }}
    >
      {children}
    </div>
  )
}
