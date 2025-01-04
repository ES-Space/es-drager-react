'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
}

/**
 * Header component for the ES Drager documentation site
 * Displays the logo, title and navigation links
 */
export function Header() {
  const pathname = usePathname()
  const navItems: NavItem[] = [
    { label: 'Examples', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'GitHub', href: 'https://github.com/ES-Space/es-drager-react' },
  ]

  return (
    <header className="h-14 border-b flex items-center px-4 bg-white">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <h1 className="text-sm font-medium">ES Drager</h1>
      </div>

      <div className="flex-1 flex justify-center">
        <nav className="flex gap-4 text-sm">
          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors hover:text-gray-900 ${
                (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
                  ? 'text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
