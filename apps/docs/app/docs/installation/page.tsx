'use client'

import { useTranslation } from 'react-i18next'
import { CodeBlock } from '../../components/CodeBlock'

export default function InstallationPage() {
  const { t } = useTranslation()
  const peerDependenciesCode = `{
  "dependencies": {
    "react": ">=18.2.0",
    "react-dom": ">=18.2.0",
  }
}`

  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('installation.title')}</h1>

      <p>{t('installation.desc')}</p>

      <h2>{t('installation.npm')}</h2>
      <CodeBlock code="npm install @es-space/es-drager-react" />

      <h2>{t('installation.yarn')}</h2>
      <CodeBlock code="yarn add @es-space/es-drager-react" />

      <h2>{t('installation.pnpm')}</h2>
      <CodeBlock code="pnpm add @es-space/es-drager-react" />

      <h2>{t('installation.peer')}</h2>
      <p>{t('installation.peerDesc')}</p>

      <CodeBlock code={peerDependenciesCode} />
    </div>
  )
}
