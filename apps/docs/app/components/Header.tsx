'use client'

export function Header() {
  return (
    <header className="h-14 border-b flex items-center px-4 bg-white">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <h1 className="text-sm font-medium">ES Drager</h1>
      </div>

      <div className="flex-1 flex justify-center">
        <nav className="flex gap-4 text-sm">
          <a href="#" className="text-gray-900">Examples</a>
          <a href="#" className="text-gray-500">Documentation</a>
          <a href="#" className="text-gray-500">GitHub</a>
        </nav>
      </div>
    </header>
  )
}
