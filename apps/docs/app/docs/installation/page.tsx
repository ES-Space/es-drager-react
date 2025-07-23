'use client'

import { useTranslation } from 'react-i18next'

export default function InstallationPage() {
  const { t } = useTranslation()
  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('installation.title')}</h1>

      <p>{t('installation.desc')}</p>

      <h2>{t('installation.npm')}</h2>
      <pre className="language-bash">
        <code>npm install @es-space/es-drager-react</code>
      </pre>

      <h2>{t('installation.yarn')}</h2>
      <pre className="language-bash">
        <code>yarn add @es-space/es-drager-react</code>
      </pre>

      <h2>{t('installation.pnpm')}</h2>
      <pre className="language-bash">
        <code>pnpm add @es-space/es-drager-react</code>
      </pre>

      <h2>{t('installation.peer')}</h2>
      <p>{t('installation.peerDesc')}</p>

      <pre className="language-json">
        <code>
          {`{
  "dependencies": {
    "react": ">=18.2.0",
    "react-dom": ">=18.2.0",
  }
}`}
        </code>
      </pre>
    </div>
  )
}
