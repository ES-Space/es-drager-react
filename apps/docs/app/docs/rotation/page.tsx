'use client'

import { Drager } from '@es-space/es-drager-react'
import { useTranslation } from 'react-i18next'
import { CodeBlock } from '../../components/CodeBlock'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export default function RotationPage() {
  const { t } = useTranslation()

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
  rotatable
>
  Rotate me!
</Drager>`

  const initialRotationCode = `<Drager
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
  rotatable
  rotation={45}
>
  45° Rotation
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
  rotatable
  onRotate={(angle) => {
    console.log('Current angle:', angle)
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
  rotatable
  limit={{
    minX: 0,
    maxX: 272, // container width - element width
    minY: 0,
    maxY: 172  // container height - element height
  }}
>
  Drag & Rotate
</Drager>`

  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('rotation.title')}</h1>

      <p>{t('rotation.desc')}</p>

      <h2>{t('rotation.basic')}</h2>

      <p>{t('rotation.basicDesc')}</p>

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
          >
            Rotate me!
          </Drager>
        </InfiniteCanvas>
      </div>

      <CodeBlock code={basicUsageCode} />

      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        <p>{t('rotation.tip')}</p>
      </div>

      <h2>{t('rotation.initialRotation')}</h2>

      <p>
        You can set an initial rotation angle using the
        {' '}
        <code>rotation</code>
        {' '}
        prop (in degrees):
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
            rotation={45}
          >
            45° Rotation
          </Drager>
        </InfiniteCanvas>
      </div>

      <CodeBlock code={initialRotationCode} />

      <h2>{t('rotation.rotationEvents')}</h2>

      <p>
        Track rotation changes using the
        {' '}
        <code>onRotate</code>
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
            rotatable
            onRotate={(angle) => {
              // eslint-disable-next-line no-console
              console.log('Current angle:', angle)
            }}
          >
            Check console
          </Drager>
        </InfiniteCanvas>
      </div>

      <CodeBlock code={eventsCode} />

      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        <p>
          Open your browser's console to see the rotation angle being logged.
        </p>
      </div>

      <h2>{t('rotation.combinedWithDragging')}</h2>

      <p>
        Rotation works seamlessly with dragging and other features:
      </p>

      <div style={{ margin: '2rem 0', height: '400px', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <InfiniteCanvas>
          <div style={{
            position: 'relative',
            width: '400px',
            height: '300px',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
          }}
          >
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
              limit={{
                minX: 0,
                maxX: 272, // 400 - 128
                minY: 0,
                maxY: 172, // 300 - 128
              }}
            >
              Drag & Rotate
            </Drager>
          </div>
        </InfiniteCanvas>
      </div>

      <CodeBlock code={combinedCode} />
    </div>
  )
}
