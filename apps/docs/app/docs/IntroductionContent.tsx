'use client'

import { Drager } from '@es-space/es-drager-react'
import { BASE_PATH } from '../../env'
import { InfiniteCanvas } from '../components/InfiniteCanvas'

export function IntroductionContent() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>ES Drager</h1>

      <p className="lead">
        A lightweight React component for creating draggable, rotatable and scalable elements with connection capabilities.
      </p>

      <h2>Overview</h2>

      <p>
        ES Drager provides a simple yet powerful way to add drag, rotate, scale, and resize functionality to any React component.
        With built-in support for connections, alignment guides, position constraints, and snapping, it's perfect for building:
      </p>

      <ul>
        <li>Diagram editors</li>
        <li>Visual builders</li>
        <li>Interactive interfaces</li>
        <li>Layout tools</li>
        <li>Flow charts</li>
        <li>Design tools</li>
      </ul>

      <h2>Interactive Demo</h2>

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

      <h2>Quick Example</h2>

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
}`}
        </code>
      </pre>

      <h2>Next Steps</h2>

      <ul>
        <li>
          Check out the
          {' '}
          <a href={`${BASE_PATH}/docs/installation`}>Installation</a>
          {' '}
          guide to get started
        </li>
        <li>
          Learn about basic
          {' '}
          <a href={`${BASE_PATH}/docs/dragging`}>dragging</a>
          {' '}
          functionality
        </li>
        <li>
          Explore advanced features like
          {' '}
          <a href={`${BASE_PATH}/docs/connections`}>connections</a>
          {' '}
          and
          {' '}
          <a href={`${BASE_PATH}/docs/props`}>position constraints</a>
        </li>
      </ul>
    </div>
  )
}
