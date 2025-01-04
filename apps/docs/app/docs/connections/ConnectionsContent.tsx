'use client'

import { Drager } from '@es-space/es-drager-react'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export function ConnectionsContent() {
  // 事件处理函数
  const handleConnect = (sourceId: string, sourceAnchor: string, targetId: string, targetAnchor: string) => {
    // eslint-disable-next-line no-console
    console.log('Connected:', { sourceId, sourceAnchor, targetId, targetAnchor })
  }

  return (
    <div className="prose prose-blue max-w-none">
      <h1>Connections</h1>

      <p>
        ES Drager supports creating connections between elements using anchor points.
      </p>

      <h2>Basic Connections</h2>

      <p>
        Enable connection points by setting the
        {' '}
        <code>connectable</code>
        {' '}
        prop:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            id="source"
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            connectable
          >
            Source
          </Drager>
          <Drager
            id="target"
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '200px' }}
            connectable
          >
            Target
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          Hover over the blue dots and drag to another dot to create a connection.
        </p>
      </div>

      <h2>Connection Events</h2>

      <p>
        Track connections using the
        {' '}
        <code>onConnect</code>
        {' '}
        event handler:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            id="event-source"
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            connectable
            onConnect={handleConnect}
          >
            Connect me
          </Drager>
          <Drager
            id="event-target"
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '200px' }}
            connectable
            onConnect={handleConnect}
          >
            To me
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          Open your browser's console to see connection events being logged.
        </p>
      </div>

      <h2>Complex Example</h2>

      <p>
        Connections work with all other features enabled:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            id="complex-1"
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            connectable
            rotatable
            scalable
          >
            Node 1
          </Drager>
          <Drager
            id="complex-2"
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '200px' }}
            connectable
            rotatable
            scalable
          >
            Node 2
          </Drager>
          <Drager
            id="complex-3"
            className="w-32 h-32 bg-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '400px' }}
            connectable
            rotatable
            scalable
          >
            Node 3
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          Try creating connections between nodes while rotating and scaling them.
        </p>
      </div>
    </div>
  )
}
