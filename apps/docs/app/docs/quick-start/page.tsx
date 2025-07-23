'use client'

import { Drager } from '@es-space/es-drager-react'
import { useTranslation } from 'react-i18next'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export default function QuickStartPage() {
  const { t } = useTranslation()
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

      <pre className="language-tsx">
        <code>
          {`import { Drager } from '@es-space/es-drager-react'

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
}`}
        </code>
      </pre>

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

      <pre className="language-tsx">
        <code>
          {`<Drager
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
</Drager>`}
        </code>
      </pre>

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

      <pre className="language-tsx">
        <code>
          {`<Drager
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
</Drager>`}
        </code>
      </pre>

    </div>
  )
}
