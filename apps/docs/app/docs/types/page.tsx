'use client'

export default function TypesPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>Type Definitions</h1>

      <h2>DragerProps</h2>
      <p>
        The main props interface for the Drager component.
      </p>

      <pre>
        <code className="language-typescript">
          {`interface DragerProps {
  // Basic props
  id?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties

  // Feature flags
  rotatable?: boolean
  scalable?: boolean
  resizable?: boolean
  connectable?: boolean
  showGuides?: boolean
  snapToElements?: boolean

  // Constraints
  limit?: {
    minX?: number
    maxX?: number
    minY?: number
    maxY?: number
  }
  minScale?: number
  maxScale?: number
  snapThreshold?: number
  rotation?: number

  // Event handlers
  onDragStart?: () => void
  onDrag?: (position: { x: number; y: number }) => void
  onDragEnd?: () => void
  onRotate?: (angle: number) => void
  onScale?: (scale: number) => void
  onConnect?: (connection: Connection) => void
}`}
        </code>
      </pre>

      <h2>Connection</h2>
      <p>
        Represents a connection between two Drager elements.
      </p>

      <pre>
        <code className="language-typescript">
          {`interface Connection {
  sourceId: string
  sourceAnchor: AnchorPosition
  targetId: string
  targetAnchor: AnchorPosition
}`}
        </code>
      </pre>

      <h2>AnchorPosition</h2>
      <p>
        Valid positions for connection anchors.
      </p>

      <pre>
        <code className="language-typescript">
          {`type AnchorPosition = 'top' | 'right' | 'bottom' | 'left'`}
        </code>
      </pre>

      <h2>ResizePosition</h2>
      <p>
        Valid positions for resize handles.
      </p>

      <pre>
        <code className="language-typescript">
          {`type ResizePosition = 'top' | 'right' | 'bottom' | 'left' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'`}
        </code>
      </pre>

      <h2>Usage Example</h2>
      <p>
        Here's how to use these types in your TypeScript code:
      </p>

      <pre>
        <code className="language-typescript">
          {`import { Drager } from '@es-space/es-drager-react'
import type { DragerProps, Connection, AnchorPosition } from '@es-space/es-drager-react'

// Using the component with TypeScript
function MyComponent() {
  const handleConnect = (connection: Connection) => {
    const { sourceId, sourceAnchor, targetId, targetAnchor } = connection
    // Handle connection
  }

  return (
    <Drager
      id="my-drager"
      rotatable
      scalable
      resizable
      connectable
      showGuides
      limit={{ minX: 0, maxX: 500, minY: 0, maxY: 500 }}
      onConnect={handleConnect}
    >
      Content
    </Drager>
  )
}`}
        </code>
      </pre>
    </div>
  )
}
