'use client'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import enUS from './locales/en-US'
import zhCN from './locales/zh-CN'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      'en-US': {
        translation: enUS,
      },
      'zh-CN': {
        translation: zhCN,
      },
    },
    lng: 'en-US',
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
