'use client'

import { useTranslation } from 'react-i18next'
import { CodeBlock } from '../../components/CodeBlock'

export default function TypesPage() {
  const { t } = useTranslation()

  const dragerPropsCode = `interface DragerProps {
  // Basic props
  id?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties  // Use for dimensions (width, height, minWidth, etc.)
  selected?: boolean
  disabled?: boolean
  draggable?: boolean

  // Position props
  top?: number
  left?: number

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
  onClick?: () => void
  onBlur?: () => void
  onDragStart?: () => void
  onDrag?: (position: { x: number; y: number }) => void
  onDragEnd?: (position: { x: number; y: number }) => void
  onRotate?: (rotation: number) => void
  onScale?: (scale: number) => void
  onResize?: (size: { width: number; height: number }) => void
  onConnect?: (connection: Connection) => void
}`

  const connectionCode = `interface Connection {
  sourceId: string
  sourceAnchor: AnchorPosition
  targetId: string
  targetAnchor: AnchorPosition
}`

  const anchorPositionCode = `type AnchorPosition = 'top' | 'right' | 'bottom' | 'left'`

  const resizePositionCode = `type ResizePosition = 
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'`

  const exampleCode = `import { Drager } from '@es-space/es-drager-react'
import type { DragerProps, Connection } from '@es-space/es-drager-react'

// Using the component with TypeScript
function MyComponent() {
  const [selected, setSelected] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleConnect = (connection: Connection) => {
    console.log('Connected:', connection)
  }

  const handleResize = (size: { width: number; height: number }) => {
    console.log('New size:', size)
  }

  return (
    <Drager
      id="my-drager"
      selected={selected}
      disabled={disabled}
      style={{
        width: '200px',
        height: '150px',
        minWidth: '100px',
        minHeight: '100px'
      }}
      rotatable
      scalable
      resizable
      connectable
      showGuides
      limit={{ minX: 0, maxX: 500, minY: 0, maxY: 500 }}
      onClick={() => setSelected(true)}
      onBlur={() => {
        setSelected(false)
        setDisabled(false)
      }}
      onResize={handleResize}
      onConnect={handleConnect}
    >
      Content
    </Drager>
  )
}`

  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('types.title')}</h1>

      <h2>{t('types.dragerProps')}</h2>
      <p>{t('types.dragerPropsDesc')}</p>

      <CodeBlock code={dragerPropsCode} />

      <h2>{t('types.connection')}</h2>
      <p>{t('types.connectionDesc')}</p>

      <CodeBlock code={connectionCode} />

      <h2>{t('types.anchorPosition')}</h2>
      <p>{t('types.anchorPositionDesc')}</p>

      <CodeBlock code={anchorPositionCode} />

      <h2>{t('types.resizePosition')}</h2>
      <p>{t('types.resizePositionDesc')}</p>

      <CodeBlock code={resizePositionCode} />

      <h2>{t('types.example')}</h2>
      <p>{t('types.exampleDesc')}</p>

      <CodeBlock code={exampleCode} />
    </div>
  )
}
