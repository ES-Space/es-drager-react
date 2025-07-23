'use client'

import { ChevronDown, Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en-US', label: 'English' },
  { code: 'zh-CN', label: '中文' },
  // for future use
  // { code: 'ja-JP', label: '日本語' },
  // { code: 'ko-KR', label: '한국어' },
]

export default function LanguageSwitch() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
      >
        <Globe size={16} strokeWidth={1.5} />
        <span className="text-sm">{currentLanguage.label}</span>
        <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-1 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-800 min-w-[100px]">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                lang.code === i18n.language
                  ? 'text-black dark:text-white font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
