export interface DragerProps {
  id?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  limit?: {
    minX?: number
    maxX?: number
    minY?: number
    maxY?: number
  }
  rotation?: number
  rotatable?: boolean
  scalable?: boolean
  minScale?: number
  maxScale?: number
  showGuides?: boolean
  snap?: boolean
  snapThreshold?: number
  snapToElements?: boolean
  connectable?: boolean
  onDragStart?: () => void
  onDragEnd?: () => void
  onDrag?: (position: { x: number, y: number }) => void
  onRotate?: (rotation: number) => void
  onScale?: (scale: number) => void
  onConnect?: (sourceId: string, sourceAnchor: string, targetId: string, targetAnchor: string) => void
}

export type AnchorPosition = 'top' | 'right' | 'bottom' | 'left'

export interface Connection {
  sourceId: string
  sourceAnchor: string
  targetId: string
  targetAnchor: string
}
