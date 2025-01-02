export interface DragerProps {
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
  onDragStart?: () => void
  onDragEnd?: () => void
  onDrag?: (position: { x: number, y: number }) => void
  onRotate?: (rotation: number) => void
  onScale?: (scale: number) => void
}
