'use client'

import { Drager } from '@es-space/es-drager-react'
import { useTranslation } from 'react-i18next'
import { CodeBlock } from '../../components/CodeBlock'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export default function QuickStartPage() {
  const { t } = useTranslation()

  const basicUsageCode = `import { Drager } from '@es-space/es-drager-react'

function App() {
  return (
    <Drager
      style={{
        width: '128px',
        height: '128px',
        backgroundColor: '#3B82F6'
      }}
    >
      Drag me!
    </Drager>
  )
}`

  const featuresCode = `<Drager
  style={{
    width: '128px',
    height: '128px',
    backgroundColor: '#3B82F6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
  rotatable
  scalable
  minScale={0.5}
  maxScale={2}
>
  Try all features!
</Drager>`

  const connectionsCode = `<Drager
  id="node-1"
  style={{
    width: '128px',
    height: '128px',
    backgroundColor: '#3B82F6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
  connectable
  onConnect={(connection) => {
    console.log('Connected:', connection)
  }}
>
  Node 1
</Drager>`

  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('quickStart.title')}</h1>

      <p>
        {t('quickStart.desc')}
      </p>

      <h2>{t('quickStart.basicUsage')}</h2>

      <p>
        {t('quickStart.basicUsageDesc')}
      </p>

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
            }}
          >
            Drag me!
          </Drager>
          <Drager
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
              left: '200px',
            }}
          >
            Me too!
          </Drager>
        </InfiniteCanvas>
      </div>

      <CodeBlock code={basicUsageCode} />

      <h2>{t('quickStart.addingFeatures')}</h2>

      <p>
        {t('quickStart.addingFeaturesDesc')}
      </p>

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
            }}
            rotatable
            scalable
            minScale={0.5}
            maxScale={2}
          >
            Try all features!
          </Drager>
        </InfiniteCanvas>
      </div>

      <CodeBlock code={featuresCode} />

      <h2>{t('quickStart.addingConnections')}</h2>

      <p>
        {t('quickStart.addingConnectionsDesc')}
      </p>

      <div style={{ margin: '2rem 0', height: '400px', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <InfiniteCanvas>
          <Drager
            id="node-1"
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
            }}
            connectable
          >
            Node 1
          </Drager>
          <Drager
            id="node-2"
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
              left: '200px',
            }}
            connectable
          >
            Node 2
          </Drager>
        </InfiniteCanvas>
      </div>

      <CodeBlock code={connectionsCode} />

    </div>
  )
}
