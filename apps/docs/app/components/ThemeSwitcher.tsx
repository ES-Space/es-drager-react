'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  )
}
