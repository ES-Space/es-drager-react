'use client'

import { Drager } from '@es-space/es-drager-react'
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
        ES Drager provides a simple yet powerful way to add drag, rotate, and scale functionality to any React component.
        With built-in support for connections, alignment guides, and snapping, it's perfect for building:
      </p>

      <ul>
        <li>Diagram editors</li>
        <li>Visual builders</li>
        <li>Interactive interfaces</li>
        <li>Layout tools</li>
      </ul>

      <h2>Interactive Demo</h2>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            rotatable
            scalable
          >
            Basic
          </Drager>
          <Drager
            id="node-1"
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '200px' }}
            connectable
          >
            Connections
          </Drager>
          <Drager
            id="node-2"
            className="w-32 h-32 bg-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '400px' }}
            rotatable
            scalable
            connectable
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
      className="w-32 h-32 bg-blue-500"
      rotatable
      scalable
      connectable
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
          <a href="/docs/installation">Installation</a>
          {' '}
          guide to get started
        </li>
        <li>
          Learn about basic
          {' '}
          <a href="/docs/dragging">dragging</a>
          {' '}
          functionality
        </li>
        <li>
          Explore advanced features like
          {' '}
          <a href="/docs/connections">connections</a>
        </li>
      </ul>
    </div>
  )
}
