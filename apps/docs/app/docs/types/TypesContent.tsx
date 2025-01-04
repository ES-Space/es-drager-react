'use client'

export function TypesContent() {
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

  // Event handlers
  onDragStart?: () => void
  onDrag?: (position: { x: number; y: number }) => void
  onDragEnd?: () => void
  onRotate?: (angle: number) => void
  onScale?: (scale: number) => void
  onConnect?: (
    sourceId: string,
    sourceAnchor: string,
    targetId: string,
    targetAnchor: string
  ) => void
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
  sourceAnchor: string
  targetId: string
  targetAnchor: string
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
  const handleConnect = (
    sourceId: string,
    sourceAnchor: AnchorPosition,
    targetId: string,
    targetAnchor: AnchorPosition
  ) => {
    // Handle connection
  }

  return (
    <Drager
      id="my-drager"
      rotatable
      scalable
      connectable
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
