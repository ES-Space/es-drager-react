'use client'

import { Drager } from '@es-space/es-drager-react'
import { useTranslation } from 'react-i18next'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export default function DraggingPage() {
  const { t } = useTranslation()
  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('dragging.title')}</h1>

      <p>
        {t('dragging.desc')}
      </p>

      <h2>{t('dragging.basic')}</h2>

      <p>
        {t('dragging.basicDesc')}
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
            Drag me too!
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
    justifyContent: 'center',
    color: 'white'
  }}
>
  Drag me!
</Drager>`}
        </code>
      </pre>

      <h2>{t('dragging.movementConstraints')}</h2>

      <p>
        {t('dragging.movementConstraintsDesc')}
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
            <div style={{
              position: 'absolute',
              top: '-24px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '14px',
              color: '#6b7280',
            }}
            >
              {t('dragging.constrainedArea')}
            </div>
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
              limit={{
                minX: 0,
                maxX: 272, // 400 - 128
                minY: 0,
                maxY: 172, // 300 - 128
              }}
            >
              {t('dragging.limitedMove')}
            </Drager>
          </div>
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
    justifyContent: 'center',
    color: 'white'
  }}
  limit={{
    minX: 0,
    maxX: 272, // container width - element width
    minY: 0,
    maxY: 172  // container height - element height
  }}
>
  Limited move
</Drager>`}
        </code>
      </pre>

      <h2>{t('dragging.dragEvents')}</h2>

      <p>
        {t('dragging.dragEventsDesc')}
      </p>

      <ul>
        <li>
          <code>onDragStart</code>
          {' '}
          -
          {' '}
          {t('dragging.onDragStartDesc')}
        </li>
        <li>
          <code>onDrag</code>
          {' '}
          -
          {' '}
          {t('dragging.onDragDesc')}
        </li>
        <li>
          <code>onDragEnd</code>
          {' '}
          -
          {' '}
          {t('dragging.onDragEndDesc')}
        </li>
      </ul>

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
            onDragStart={() => {
              // eslint-disable-next-line no-console
              console.log('Started dragging')
            }}
            onDrag={(pos) => {
              // eslint-disable-next-line no-console
              console.log('Current position:', pos)
            }}
            onDragEnd={() => {
              // eslint-disable-next-line no-console
              console.log('Finished dragging')
            }}
          >
            {t('dragging.checkConsole')}
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
    justifyContent: 'center',
    color: 'white'
  }}
  onDragStart={() => {
    console.log('Started dragging')
  }}
  onDrag={(pos) => {
    console.log('Current position:', pos)
  }}
  onDragEnd={() => {
    console.log('Finished dragging')
  }}
>
  Check console
</Drager>`}
        </code>
      </pre>

      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        <p>
          {t('dragging.openConsoleDesc')}
        </p>
      </div>
    </div>
  )
}
