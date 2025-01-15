'use client'

import { Drager } from '@es-space/es-drager-react'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export default function ConnectionsPage() {
  const handleConnect = () => {
    // eslint-disable-next-line no-console
    console.log('connect')
  }

  return (
    <div className="prose prose-blue max-w-none">
      <h1>Connections</h1>

      <p>
        ES Drager provides a powerful connection system that allows you to create visual relationships between elements using anchor points and bezier curves.
      </p>

      <h2>Basic Connections</h2>

      <p>
        To enable connections, set the
        {' '}
        <code>connectable</code>
        {' '}
        prop and provide a unique
        {' '}
        <code>id</code>
        :
      </p>

      <pre className="language-tsx">
        <code>
          {`<Drager
  id="node-1"
  connectable
  className="w-32 h-32 bg-blue-500"
>
  Source
</Drager>`}
        </code>
      </pre>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            id="source"
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '100px', top: '50px' }}
            connectable
          >
            Source
          </Drager>
          <Drager
            id="target"
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '300px', top: '50px' }}
            connectable
          >
            Target
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          Hover over the blue dots (anchor points) and drag to another anchor point to create a connection.
          The connection will be visualized as a bezier curve.
        </p>
      </div>

      <h2>Connection Events</h2>

      <p>
        Track connections using the
        {' '}
        <code>onConnect</code>
        {' '}
        event handler. This event provides details about the source and target nodes:
      </p>

      <pre className="language-tsx">
        <code>
          {`const handleConnect = (
  sourceId: string,    // ID of the source node
  sourceAnchor: string,// Position of source anchor ('top', 'right', 'bottom', 'left')
  targetId: string,    // ID of the target node
  targetAnchor: string // Position of target anchor
) => {
  console.log('Connected:', { sourceId, sourceAnchor, targetId, targetAnchor })
}`}
        </code>
      </pre>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            id="event-source"
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '100px', top: '50px' }}
            connectable
            onConnect={handleConnect}
          >
            Connect me
          </Drager>
          <Drager
            id="event-target"
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '300px', top: '50px' }}
            connectable
            onConnect={handleConnect}
          >
            To me
          </Drager>
        </InfiniteCanvas>
      </div>

      <h2>Connection Features</h2>

      <ul>
        <li>Four anchor points per node (top, right, bottom, left)</li>
        <li>Visual feedback during connection creation</li>
        <li>Automatic bezier curve path calculation</li>
        <li>Connection lines update automatically when nodes move</li>
        <li>Click on connection lines to select them</li>
        <li>Press Delete/Backspace to remove selected connections</li>
      </ul>

      <h2>Complex Example</h2>

      <p>
        Connections work seamlessly with rotation and scaling:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            id="complex-1"
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '100px', top: '50px' }}
            connectable
            rotatable
            scalable
          >
            Node 1
          </Drager>
          <Drager
            id="complex-2"
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '300px', top: '50px' }}
            connectable
            rotatable
            scalable
          >
            Node 2
          </Drager>
          <Drager
            id="complex-3"
            className="w-32 h-32 bg-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '500px', top: '50px' }}
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
          Try creating connections between nodes while rotating and scaling them. The connections will automatically update to maintain their positions.
        </p>
      </div>
    </div>
  )
}
