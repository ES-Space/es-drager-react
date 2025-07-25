import type React from 'react'

export interface DragerProps {
  /** unique id for the element */
  id?: string
  /** children to be rendered inside the element */
  children: React.ReactNode
  /** class name to be applied to the element */
  className?: string
  /** style to be applied to the element */
  style?: React.CSSProperties
  /** whether the element is selected */
  selected?: boolean
  /** whether the element is disabled */
  disabled?: boolean
  /** whether the element is draggable */
  draggable?: boolean
  /** top position of the element */
  top?: number
  /** left position of the element */
  left?: number
  /** limit the movement of the element */
  limit?: {
    minX?: number
    maxX?: number
    minY?: number
    maxY?: number
  }
  /** rotation of the element */
  rotation?: number
  /** whether the element is skewable */
  skewable?: boolean
  /** X-axis skew angle */
  skewX?: number
  /** Y-axis skew angle */
  skewY?: number
  /** minimum skew angle */
  minSkew?: number
  /** maximum skew angle */
  maxSkew?: number
  /** whether the element is rotatable */
  rotatable?: boolean
  /** whether the element is scalable */
  scalable?: boolean
  /** whether the element is resizable */
  resizable?: boolean
  /** minimum scale of the element */
  minScale?: number
  /** maximum scale of the element */
  maxScale?: number
  /** whether to show guide lines */
  showGuides?: boolean
  /** threshold for snapping */
  snapThreshold?: number
  /** whether to snap to elements */
  snapToElements?: boolean
  /** whether to connectable */
  connectable?: boolean
  /** callback when element loses focus */
  onBlur?: () => void
  /** callback when element is clicked */
  onClick?: () => void
  /** callback when dragging starts */
  onDragStart?: () => void
  /** callback when dragging ends */
  onDragEnd?: (position: { x: number, y: number }) => void
  /** callback when dragging */
  onDrag?: (position: { x: number, y: number }) => void
  /** callback when rotating */
  onRotate?: (rotation: number) => void
  /** callback when scaling */
  onScale?: (scale: number) => void
  /** callback when connecting */
  onConnect?: (connection: Connection) => void
  /** callback when resizing */
  onResize?: (size: { width: number, height: number }) => void
  /** callback when skewing */
  onSkew?: (skew: { x: number, y: number }) => void
}

/** anchor position */
export type AnchorPosition = 'top' | 'right' | 'bottom' | 'left'

/** connection */
export interface Connection {
  /** source id */
  sourceId: string
  /** source anchor */
  sourceAnchor: AnchorPosition
  /** target id */
  targetId: string
  /** target anchor */
  targetAnchor: AnchorPosition
}

/** anchor props */
export interface AnchorProps {
  position: AnchorPosition
  onDragStart: (position: AnchorPosition) => void
  threshold?: number
  // Whether to enter the range
  isInRange?: boolean
}

export type ResizePosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'

export interface ResizeHandleProps {
  position: ResizePosition
  onMouseDown: (e: React.MouseEvent) => void
  rotation?: number
}

export type SkewPosition = 'skew-x' | 'skew-y'

export interface SkewHandleProps {
  onMouseDown: (e: React.MouseEvent) => void
  rotation?: number
}
