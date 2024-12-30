export interface DragerProps {
  children: React.ReactNode
  className?: string
  limit?: {
    minX?: number
    maxX?: number
    minY?: number
    maxY?: number
  }
  rotation?: number
  rotatable?: boolean
  scalable?: boolean // 新增
  minScale?: number // 新增
  maxScale?: number // 新增
  onDragStart?: () => void
  onDragEnd?: () => void
  onDrag?: (position: { x: number, y: number }) => void
  onRotate?: (rotation: number) => void
  onScale?: (scale: number) => void // 新增
}
