'use client'

import { Drager } from '@es-space/es-drager-react'
import { useTranslation } from 'react-i18next'
import { CodeBlock } from '../../components/CodeBlock'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export default function ScalingPage() {
  const { t } = useTranslation()
  const handleScale = (scale: number) => {
    // eslint-disable-next-line no-console
    console.log('Current scale:', scale)
  }

  const basicUsageCode = `<Drager
  style={{
    width: '128px',
    height: '128px',
    backgroundColor: '#3B82F6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  }}
  scalable
>
  Scroll to scale
</Drager>`

  const limitsCode = `<Drager
  style={{
    width: '128px',
    height: '128px',
    backgroundColor: '#3B82F6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  }}
  scalable
  minScale={0.5}
  maxScale={2}
>
  Limited scaling
</Drager>`

  const eventsCode = `<Drager
  style={{
    width: '128px',
    height: '128px',
    backgroundColor: '#3B82F6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  }}
  scalable
  onScale={(scale) => {
    console.log('Current scale:', scale)
  }}
>
  Check console
</Drager>`

  const combinedCode = `<Drager
  style={{
    width: '128px',
    height: '128px',
    backgroundColor: '#3B82F6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  }}
  scalable
  rotatable
  minScale={0.5}
  maxScale={2}
>
  Try all features
</Drager>`

  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('scaling.title')}</h1>

      <p>{t('scaling.desc')}</p>

      <h2>{t('scaling.basic')}</h2>

      <p>{t('scaling.basicDesc')}</p>

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
            scalable
          >
            Scroll to scale
          </Drager>
        </InfiniteCanvas>
      </div>

      <CodeBlock code={basicUsageCode} />

      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        <p>{t('scaling.tip')}</p>
      </div>

      <h2>{t('scaling.scaleLimits')}</h2>

      <p>
        You can control the minimum and maximum scale values using the
        {' '}
        <code>minScale</code>
        {' '}
        and
        {' '}
        <code>maxScale</code>
        {' '}
        props:
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
            scalable
            minScale={0.5}
            maxScale={2}
          >
            Limited scaling
          </Drager>
        </InfiniteCanvas>
      </div>

      <CodeBlock code={limitsCode} />

      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        <p>
          This element can only be scaled between 50% and 200% of its original size.
        </p>
      </div>

      <h2>{t('scaling.scaleEvents')}</h2>

      <p>
        Track scale changes using the
        {' '}
        <code>onScale</code>
        {' '}
        event handler:
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
            scalable
            onScale={handleScale}
          >
            Check console
          </Drager>
        </InfiniteCanvas>
      </div>

      <CodeBlock code={eventsCode} />

      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        <p>
          Open your browser's console to see the scale value being logged.
        </p>
      </div>

      <h2>{t('scaling.combinedFeatures')}</h2>

      <p>
        Scaling works seamlessly with dragging and rotation:
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
            scalable
            rotatable
            minScale={0.5}
            maxScale={2}
          >
            Try all features
          </Drager>
        </InfiniteCanvas>
      </div>

      <CodeBlock code={combinedCode} />

      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        <p>
          This element can be dragged, rotated, and scaled.
        </p>
      </div>
    </div>
  )
}
