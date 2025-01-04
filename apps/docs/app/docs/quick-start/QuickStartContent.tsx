'use client'

import { Drager } from '@es-space/es-drager-react'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export function QuickStartContent() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>Quick Start</h1>

      <p>
        Get started with ES Drager in just a few minutes.
      </p>

      <h2>Basic Usage</h2>

      <p>
        Import the Drager component and use it to wrap any content you want to make draggable:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium">
            Drag me!
          </Drager>
          <Drager
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '200px' }}
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
    <Drager className="w-32 h-32 bg-blue-500">
      Drag me!
    </Drager>
  )
}`}
        </code>
      </pre>

      <h2>Adding Features</h2>

      <p>
        Enable rotation and scaling with simple props:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
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
  className="w-32 h-32 bg-blue-500"
  rotatable
  scalable
  minScale={0.5}
  maxScale={2}
>
  Try all features!
</Drager>`}
        </code>
      </pre>

      <h2>Adding Connections</h2>

      <p>
        Enable connection points to create node-based interfaces:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            id="node-1"
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            connectable
          >
            Node 1
          </Drager>
          <Drager
            id="node-2"
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '200px' }}
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
  className="w-32 h-32 bg-blue-500"
  connectable
  onConnect={(sourceId, sourceAnchor, targetId, targetAnchor) => {
    console.log('Connected:', { sourceId, sourceAnchor, targetId, targetAnchor })
  }}
>
  Node 1
</Drager>`}
        </code>
      </pre>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          Tips:
          {' '}
          <span className="font-medium">Middle mouse button</span>
          {' '}
          to pan canvas,
          {' '}
          <span className="font-medium">Ctrl + Scroll</span>
          {' '}
          to zoom
        </p>
      </div>
    </div>
  )
}
