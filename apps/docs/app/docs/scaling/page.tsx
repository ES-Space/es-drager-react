'use client'

import { Drager } from '@es-space/es-drager-react'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export default function ScalingPage() {
  const handleScale = (scale: number) => {
    // eslint-disable-next-line no-console
    console.log('Current scale:', scale)
  }

  return (
    <div className="prose prose-blue max-w-none">
      <h1>Scaling</h1>

      <p>
        ES Drager supports scaling functionality through mouse wheel interaction.
      </p>

      <h2>Basic Scaling</h2>

      <p>
        Enable scaling by setting the
        {' '}
        <code>scalable</code>
        {' '}
        prop:
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
          >
            Scroll to scale
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
  scalable
>
  Scroll to scale
</Drager>`}
        </code>
      </pre>

      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        <p>
          Use your mouse wheel while hovering over the element to scale it.
        </p>
      </div>

      <h2>Scale Limits</h2>

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
  scalable
  minScale={0.5}
  maxScale={2}
>
  Limited scaling
</Drager>`}
        </code>
      </pre>

      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        <p>
          This element can only be scaled between 50% and 200% of its original size.
        </p>
      </div>

      <h2>Scale Events</h2>

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
  scalable
  onScale={(scale) => {
    console.log('Current scale:', scale)
  }}
>
  Check console
</Drager>`}
        </code>
      </pre>

      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        <p>
          Open your browser's console to see the scale value being logged.
        </p>
      </div>

      <h2>Combined Features</h2>

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
  scalable
  rotatable
  minScale={0.5}
  maxScale={2}
>
  Try all features
</Drager>`}
        </code>
      </pre>

      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
        <p>
          This element can be dragged, rotated, and scaled.
        </p>
      </div>
    </div>
  )
}
