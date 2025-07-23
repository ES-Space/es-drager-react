'use client'

import { MDXProvider } from '@mdx-js/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Header } from '../components/Header'
import { Pre } from '../components/Pre'

const components = {
  pre: Pre,
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useTranslation()
  const pathname = usePathname()
  const sidebar = [
    {
      title: t('docs.sidebar.gettingStarted'),
      links: [
        { href: '/docs', label: t('docs.sidebar.introduction') },
        { href: '/docs/installation', label: t('docs.sidebar.installation') },
        { href: '/docs/quick-start', label: t('docs.sidebar.quickStart') },
      ],
    },
    {
      title: t('docs.sidebar.features'),
      links: [
        { href: '/docs/dragging', label: t('docs.sidebar.dragging') },
        { href: '/docs/rotation', label: t('docs.sidebar.rotation') },
        { href: '/docs/scaling', label: t('docs.sidebar.scaling') },
        { href: '/docs/resize', label: t('docs.sidebar.resize') },
        { href: '/docs/connections', label: t('docs.sidebar.connections') },
      ],
    },
    {
      title: t('docs.sidebar.api'),
      links: [
        { href: '/docs/props', label: t('docs.sidebar.props') },
        { href: '/docs/events', label: t('docs.sidebar.events') },
        { href: '/docs/types', label: t('docs.sidebar.types') },
      ],
    },
  ]

  return (
    <MDXProvider components={components}>
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Fixed Header */}
        <Header />

        <div className="flex pt-14">
          {/* Fixed Sidebar */}
          <div className="fixed left-0 top-14 bottom-0 w-64 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <div className="p-6 space-y-8">
              {sidebar.map(section => (
                <div key={section.title}>
                  <h5 className="mb-3 font-medium text-sm text-gray-500 dark:text-gray-400">{section.title}</h5>
                  <ul className="space-y-2">
                    {section.links.map(link => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block text-sm transition-colors ${pathname === link.href
                            ? 'text-blue-600 dark:text-blue-400 font-medium'
                            : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
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
            <main className="max-w-4xl mx-auto py-12 px-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </MDXProvider>
  )
}
