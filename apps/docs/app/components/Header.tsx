'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from './LanguageSwitch'
import ThemeSwitcher from './ThemeSwitcher'

interface NavItem {
  label: keyof typeof import('../i18n/locales/en-US').default['header']
  href: string
}

/**
 * Header component for the ES Drager documentation site
 * Displays the logo, title and navigation links
 */
export function Header() {
  const pathname = usePathname()
  const { t } = useTranslation()

  const navItems: NavItem[] = [
    { label: 'examples', href: '/' },
    { label: 'documentation', href: '/docs' },
    { label: 'github', href: 'https://github.com/ES-Space/es-drager-react' },
  ]

  return (
    <header className="sticky top-0 h-14 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50">
      <style jsx>
        {`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.3); }
          70% { transform: scale(1); }
        }
        .heartbeat-dot {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
      `}
      </style>
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="w-2 h-2 rounded-full bg-blue-500 heartbeat-dot" />
        <h1 className="text-sm font-medium text-black dark:text-white">{t('common.title')}</h1>
      </Link>

      <div className="flex-1 flex justify-center">
        <nav className="flex gap-4 text-sm">
          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors hover:text-black dark:hover:text-white ${
                (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
                  ? 'text-black dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {t(`header.${item.label}`)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <LanguageSwitch />
      </div>
    </header>
  )
}
