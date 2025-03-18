'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Header } from '../components/Header'

const sidebar = [
  {
    title: 'Getting Started',
    links: [
      { href: '/docs', label: 'Introduction' },
      { href: '/docs/installation', label: 'Installation' },
      { href: '/docs/quick-start', label: 'Quick Start' },
    ],
  },
  {
    title: 'Features',
    links: [
      { href: '/docs/dragging', label: 'Dragging' },
      { href: '/docs/rotation', label: 'Rotation' },
      { href: '/docs/scaling', label: 'Scaling' },
      { href: '/docs/resize', label: 'Resize' },
      { href: '/docs/connections', label: 'Connections' },
    ],
  },
  {
    title: 'API',
    links: [
      { href: '/docs/props', label: 'Props' },
      { href: '/docs/events', label: 'Events' },
      { href: '/docs/types', label: 'Types' },
    ],
  },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>

      <div className="flex pt-14">
        {' '}
        {/* Add padding-top to account for fixed header */}
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-14 bottom-0 w-64 overflow-y-auto border-r bg-white">
          <div className="p-6 space-y-8">
            {sidebar.map(section => (
              <div key={section.title}>
                <h5 className="mb-3 font-medium text-sm text-gray-500">{section.title}</h5>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block text-sm ${
                          pathname === link.href
                            ? 'text-blue-600 font-medium'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Main content with margin for sidebar */}
        <div className="flex-1 ml-64">
          <div className="max-w-4xl mx-auto py-12 px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
