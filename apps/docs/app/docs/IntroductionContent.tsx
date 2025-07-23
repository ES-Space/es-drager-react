'use client'

import { Drager } from '@es-space/es-drager-react'
import { useTranslation } from 'react-i18next'
import { BASE_PATH } from '../../env'
import { CodeBlock } from '../components/CodeBlock'
import { InfiniteCanvas } from '../components/InfiniteCanvas'

export function IntroductionContent() {
  const { t } = useTranslation()
  const quickExampleCode = `import { Drager } from '@es-space/es-drager-react'

function App() {
  return (
    <Drager
      style={{
        width: '128px',
        height: '128px',
        backgroundColor: '#3B82F6'
      }}
      rotatable
      scalable
      resizable
      connectable
      showGuides
      limit={{ minX: 0, maxX: 500, minY: 0, maxY: 500 }}
      onConnect={({ sourceId, sourceAnchor, targetId, targetAnchor }) => {
        console.log('Connected:', { sourceId, sourceAnchor, targetId, targetAnchor })
      }}
    >
      Try me!
    </Drager>
  )
}`

  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('introduction.title')}</h1>

      <p className="lead">
        {t('introduction.lead')}
      </p>

      <h2>{t('introduction.overview')}</h2>

      <p>
        {t('introduction.overviewDesc')}
      </p>

      <ul>
        <li>{t('introduction.usecase.diagram')}</li>
        <li>{t('introduction.usecase.visual')}</li>
        <li>{t('introduction.usecase.interactive')}</li>
        <li>{t('introduction.usecase.layout')}</li>
        <li>{t('introduction.usecase.flow')}</li>
        <li>{t('introduction.usecase.design')}</li>
      </ul>

      <h2>{t('introduction.demo')}</h2>

      <div style={{ margin: '2rem 0', height: '400px', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <InfiniteCanvas>
          <Drager
            style={{
              width: '128px',
              height: '128px',
              backgroundColor: '#3B82F6',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '500',
              left: '50px',
              top: '50px',
            }}
            rotatable
            scalable
            resizable
          >
            Basic
          </Drager>
          <Drager
            id="node-1"
            style={{
              width: '128px',
              height: '128px',
              backgroundColor: '#22C55E',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '500',
              left: '250px',
              top: '150px',
            }}
            connectable
          >
            Connections
          </Drager>
          <Drager
            id="node-2"
            style={{
              width: '128px',
              height: '128px',
              backgroundColor: '#A855F7',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '500',
              left: '450px',
              top: '250px',
            }}
            rotatable
            scalable
            resizable
            connectable
            showGuides
          >
            Try me!
          </Drager>
        </InfiniteCanvas>
      </div>

      <h2>{t('introduction.quickExample')}</h2>

      <CodeBlock code={quickExampleCode} />

      <h2>{t('introduction.nextSteps')}</h2>

      <ul>
        <li>
          {t('introduction.next.install1')}
          <a href={`${BASE_PATH}/docs/installation`}>{t('introduction.next.install2')}</a>
          {t('introduction.next.install3')}
        </li>
        <li>
          {t('introduction.next.drag1')}
          <a href={`${BASE_PATH}/docs/dragging`}>{t('introduction.next.drag2')}</a>
          {t('introduction.next.drag3')}
        </li>
        <li>
          {t('introduction.next.adv1')}
          <a href={`${BASE_PATH}/docs/connections`}>{t('introduction.next.adv2')}</a>
          {t('introduction.next.adv3')}
          <a href={`${BASE_PATH}/docs/props`}>{t('introduction.next.adv4')}</a>
        </li>
      </ul>
    </div>
  )
}
